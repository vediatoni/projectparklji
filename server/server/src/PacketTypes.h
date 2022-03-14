

struct PacketTypes
{
enum Sender
{
    HelloUser,
    NewUser,
    Update,
    RemoveUser
};

enum Receiver
{
    HelloServer,
    UpdateUser,
    CloseClient
};

};

