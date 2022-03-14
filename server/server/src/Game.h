

#ifndef GAME_H_
#define GAME_H_

#include "PlayerList.h"
#include "GameStates.h"
#include "App.h"

class Game
{
private:
    PlayerList PLAYER_LIST;
    int MAX_PLAYERS;
    int TIMER;
    GameStates STATE;
    std::string ID;
    uWS::TemplatedApp<false> *app;
    std::vector<std::string> newOrCloseUserPacket;
    std::vector<std::string> updatePackets;
    const int _PORT_ = 3000;

    void _UpdateExistingUsers();
    void _UpdatePosition();

public:
    Game(int _MAX_PLAYERS, std::string _ID);
    void Update();
};

#endif