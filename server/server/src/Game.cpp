#include "Game.h"
#include "Packet.h"

void Game::Update()
{
    usleep(1000/30 * 1000);
    _UpdateExistingUsers();
    _UpdatePosition();   
}

Game::Game(int _MAX_PLAYERS, std::string _ID)
{
    MAX_PLAYERS = _MAX_PLAYERS;
    TIMER = 0;
    STATE = GameStates::Break;
    ID = _ID;

    struct PerSocketData
    {
    };

    app = new uWS::TemplatedApp<false>(uWS::App()
            .get("/test", [](auto *res, auto *req) {
                        res->end("Hello");
            })

            .ws<PerSocketData>("/"+ID, {
                .compression = uWS::SHARED_COMPRESSOR, 
                .maxPayloadLength = 16 * 1024 * 1024, 
                .idleTimeout = 0, 
                .maxBackpressure = 1 * 1024 * 1024,
                .open = [](auto *ws, auto *req) { 
                    ws->subscribe("broadcast"); 
                    std::cout << "New connection" << std::endl; 
                },
                .message = [&](auto *ws, std::string_view message, uWS::OpCode opCode) {
                    std::stringstream ss;
                    ss << ws;                                       
                    std::string smsg = std::string(message);
                    std::string res_msg = std::string(Packet::Handle(smsg,ss.str(), &PLAYER_LIST, &newOrCloseUserPacket, &updatePackets));                             
                    if(res_msg != ""){
                        ws->send(res_msg, uWS::OpCode::TEXT); } 
                    },
                .drain = [](auto *ws) {},
                .ping = [](auto *ws) {},
                .pong = [](auto *ws) {},
                .close = [&](auto *ws, int code, std::string_view message) {                   
                    std::stringstream ss;
                    ss << ws; 
                    PLAYER_LIST.Remove(ss.str()); 
                    std::string pkResponse = Packet::Create(PacketTypes::Sender::RemoveUser,ss.str());
                    ws->publish("broadcast",pkResponse);
                }
            })
            .listen(_PORT_, [&](auto *token) {
                if (token)
                {
                    std::cout << "Listening on port " << _PORT_ << std::endl;
                }
            }));

    std::string c = "updateLoop";
    uWS::Loop::get()->addPostHandler(&c, [&](uWS::Loop *a) {
        Update();
    });

    app->run();
}

void Game::_UpdateExistingUsers()
{
    if (!newOrCloseUserPacket.empty())
    {
        for (size_t i = 0; i < newOrCloseUserPacket.size(); i++)
        {
            app->publish("broadcast", newOrCloseUserPacket[i], uWS::OpCode::TEXT);
        }

        newOrCloseUserPacket.clear();
    }
}

void Game::_UpdatePosition()
{
    if (!updatePackets.empty())
    {
        for (size_t i = 0; i < updatePackets.size(); i++)
        {
            std::string s = updatePackets[i];
            std::string g = s.substr(0, s.find(';'));
            std::vector<std::string> splitString = Helper::Split(g, '+');

            Player *pl = PLAYER_LIST.GetFromPlayerListByID(splitString[3]);
            if (pl != NULL)
            {

                float x = std::stof(splitString[0]);
                float y = std::stof(splitString[1]);
                float z = std::stof(splitString[2]);
                int animation = std::stof(splitString[4]);
                float rotation = std::stof(splitString[5]);

                pl->Update(x, y, z, animation, rotation);
            }
        }
        // Get all data and publish it
        std::cout << PLAYER_LIST.PlayerListToString() << std::endl;
        std::string pkResponse = Packet::Create(PacketTypes::Sender::Update, PLAYER_LIST.PlayerListToString());
        app->publish("broadcast", pkResponse, uWS::OpCode::TEXT);
        updatePackets.clear();
    }
}