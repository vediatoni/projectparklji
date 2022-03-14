#include "Packet.h"
#include "PacketHandlers.h"
#include <iostream>

std::string Packet::Handle(std::string message, std::string wsAddress, PlayerList *PLAYER_LIST, std::vector<std::string> *newOrCloseUserPacket, std::vector<std::string> *updatePackets)
{

    std::string_view id = message.substr(0, message.find(':'));
    int id_int = Helper::SWToINT(id);
    std::string extractedMsg = Extract(message);
    std::string res = "";

    switch (id_int)
    {
    case PacketTypes::Receiver::HelloServer:
    {
        std::string pResponse = PacketHandlers::HelloServer(wsAddress, PLAYER_LIST);
        res = Create(PacketTypes::Sender::HelloUser, pResponse);

        std::string st = PLAYER_LIST->GetFromPlayerListByID(wsAddress)->ToString();
        newOrCloseUserPacket->push_back(Create(PacketTypes::Sender::NewUser, st));
    };
    break;
    case PacketTypes::Receiver::UpdateUser:
    {
        updatePackets->push_back(extractedMsg);
    };
    break;
    case PacketTypes::Receiver::CloseClient:
    {
        std::string bc = Create(PacketTypes::Sender::RemoveUser, PacketHandlers::CloseClient(wsAddress, PLAYER_LIST));
        newOrCloseUserPacket->push_back(bc);
    };
    break;
    }

    return res;
}

std::string Packet::Create(PacketTypes::Sender packetType, std::string message)
{
    return std::to_string(packetType) + std::string(":") + std::string(message);
}

std::string Packet::Extract(std::string message)
{
    int idLength = message.substr(0, message.find(":")).length();
    return message.substr(idLength + 1, message.length() - idLength + 1);
}