import { PacketTypesSender, PacketTypesReceiver } from "./PacketTypes";
import { PacketHandlers } from "./PacketHandlers";

export module Packet {

    /**
    * Handles the received packet
    * @param message 
    * @returns response to server
    */
    export function handle(message: string): string {
        let msg_id = parseInt(message.substr(0, message.indexOf(":")));
        console.log(message);
        switch (msg_id) {
            case PacketTypesReceiver.HelloUser:
                PacketHandlers.helloUser(_extract(message));
                return "none";

            case PacketTypesReceiver.NewUser:
                PacketHandlers.newUser(_extract(message));
                return "none";

            case PacketTypesReceiver.Update:
                PacketHandlers.update(_extract(message));
                return "none";

            case PacketTypesReceiver.RemoveUser:
                PacketHandlers.removeUser(_extract(message));
                return "none";
        }
    };


    /**
    * Creates a specific format of a packet that is readable to server
    * @param packetType
    * @param message
    * @returns formated packet in string
    */
    export function create(packetType: PacketTypesSender, message: string): string {
        let msgString = packetType + ":" + message;
        return msgString;
    };


    /**
    * Extract the message from raw packet received from the server
    * @param message
    * @returns extracted message that server sent
    */
    export function _extract(message: string): string {
        let idLength = message.substr(0, message.indexOf(":")).length;
        return message.substr(idLength + 1, message.length - idLength + 1);
    };
}