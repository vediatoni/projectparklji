#include <iostream>
#include "PlayerList.h"

namespace Packet
{

struct PacketHandlers
{
    static std::string HelloServer(std::string wsAddress, PlayerList* PLAYER_LIST)
    {
        std::string response = PLAYER_LIST->PlayerListToString();
        response.append("/");

        Player *new_player = new Player(wsAddress);
        PLAYER_LIST->Add(new_player);
        response.append(new_player->ID());

        return response;
    }

    static std::string CloseClient(std::string msg,PlayerList* PLAYER_LIST)
    { 
        PLAYER_LIST->Remove(msg);
        return msg;
    }
};

}
