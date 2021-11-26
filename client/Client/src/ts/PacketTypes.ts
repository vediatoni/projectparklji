export enum PacketTypesSender {
    HelloServer,
    UpdateUser,
    CloseClient,
    Attack
}

export enum PacketTypesReceiver {
    HelloUser,
    NewUser,
    Update,
    RemoveUser
}