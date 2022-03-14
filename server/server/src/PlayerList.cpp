#include <iostream>
#include "PlayerList.h"

void PlayerList::Add(Player *pl)
{
    _playerList.push_back(pl);
}

void PlayerList::Remove(std::string id)
{
    for (size_t i = 0; i < _playerList.size(); i++)
    {
        if (_playerList[i]->ID() == id)
        {
            _playerList.erase(_playerList.begin() + i);
        }
    }
}

std::string PlayerList::PlayerListToString()
{
    std::string res = "";
    for (size_t i = 0; i < _playerList.size(); i++)
    {
        res.append(_playerList[i]->ToString());
    }

    return res;
}

Player* PlayerList::GetFromPlayerListByID(std::string id)
{
    for (size_t i = 0; i < _playerList.size(); i++)
    {
        if (id == _playerList[i]->ID())
        {
            return _playerList[i];
        }
    }

    return NULL;
}

int PlayerList::GetPlayerCount(){
    return _playerList.size();
}

