
#ifndef PLAYERLIST_H_
#define PLAYERLIST_H_

#include <iostream>
#include <vector>
#include "Player.h"

class PlayerList
{
    private:
        std::vector<Player*> _playerList;

    public:

        void Add(Player *pl);
        void Remove(std::string id);
        int GetPlayerCount();
        std::string PlayerListToString();
        Player* GetFromPlayerListByID(std::string id);
};

#endif 