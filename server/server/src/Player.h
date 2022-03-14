
#ifndef PLAYER_H_
#define PLAYER_H
#include <string>

class Player
{
    private:
        float _x;
        float _y;
        float _z;
        int _animation;
        float _rotation;
        std::string _id;
        int _height;

    public:
        Player(std::string id);
        void Update(float x, float y, float z, int animation, float rotation);
        std::string ToString();
        std::string ID();    
};

#endif
