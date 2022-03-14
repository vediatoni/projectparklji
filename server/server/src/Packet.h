#include "Helper.h"
#include <vector>
#include "PlayerList.h"
#include "PacketTypes.h"

namespace Packet
{

    /**
    * Handles the received packet
    * @param message 
    * @returns response to server
    */
    std::string Handle(std::string message, std::string wsAddress, PlayerList *PLAYER_LIST, std::vector<std::string> *newOrCloseUserPacket, std::vector<std::string> *updatePackets);
    
    
    /**
    * Creates a specific format of a packet that is readable to server
    * @param packetType
    * @param message
    * @returns formated packet in string
    */
    std::string Create(PacketTypes::Sender packetType, std::string message);



    /**
    * Extract the message from raw packet received from the server
    * @param message
    * @returns extracted message that server sent
    */
    std::string Extract(std::string message);
};
