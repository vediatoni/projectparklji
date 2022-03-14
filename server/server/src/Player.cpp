#include <iostream>

#include "Player.h"

Player::Player(std::string id)
{
    _height = 2;
    _id = id;
    _x = 0;
    _y = 0;
    _z = 0;
    _animation = 0;
    _rotation = 0;
}

void Player::Update(float x, float y, float z, int animation, float rotation)
{
    _x = x;
    _y = y;
    _z = z;
    _animation = animation;
    _rotation = rotation;
}

std::string Player::ToString()
{
    std::string x = std::to_string(_x);
    std::string y = std::to_string(_y);
    std::string z = std::to_string(_z);
    std::string animation = std::to_string(_animation);
    std::string rotation = std::to_string(_rotation);

    return std::string(x + '+' + y + '+' + z + '+' + _id + '+' + animation + '+' + rotation + ';');
}

std::string Player::ID()
{
    return _id;
}
