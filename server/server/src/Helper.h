#include <iostream>
#include <sstream>
#include <vector>
namespace Helper
{

static int SWToINT(std::string_view string)
{
    return std::stoi(std::string(string));
};

static std::vector<std::string> Split(std::string str,char delimited){
    std::vector<std::string> sp;
    std::istringstream ss(str);
    std::string token;

    while(std::getline(ss, token, '+')) { 
        sp.push_back(token);
    }

    return sp;
} 

} // namespace Helper