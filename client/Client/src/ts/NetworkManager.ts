import { PacketTypesSender } from "./PacketTypes";
import { Packet } from "./Packet";
import { localPlayer } from "../main";

export class NetworkManager {
    private _ip: String;
    private _port: Number;
    private _socket: WebSocket;


    public CONNECTED: boolean = false;

    /**
    * Returns WebSocket
    */
    public get SOCKET(): WebSocket {
        return this._socket;
    }

    /**
    * Returns server and port that socket is connected to (example 127.0.0.1:3000)
    */
    public get SERVER_IP(): string {
        return this._ip + ":" + this._port;
    }

    private get _WS_CONNECTION(): string {
        return "ws://" + this.SERVER_IP + "/Habadaba"
    }

    /**
    * Initializes socket connection with given data
    * @param ip
    * @param port
    */
    constructor(ip: string, port: Number) {
        this._ip = ip;
        this._port = port;

        this._initConnection();
    }

    private _initConnection(): void {
        this._socket = new WebSocket(this._WS_CONNECTION);

        this._socket.onopen = this._onOpen.bind(this);
        this._socket.onmessage = this._onMessage.bind(this);
        this._socket.onclose = this._onClose.bind(this);
        this._socket.onerror = this._onError.bind(this);
    }

    private _onOpen(this: NetworkManager, e: Event): void {
        this.SOCKET.send(Packet.create(PacketTypesSender.HelloServer, "Hello"));
        this.CONNECTED = true;
    }

    private _onMessage(this: NetworkManager, e: MessageEvent) {
        let msg: string = Packet.handle(e.data);
        // if(msg != "none"){
        //     this.SOCKET.send(msg);
        // }
    }

    private _onClose(this: NetworkManager, e: CloseEvent) {
        if (e.wasClean) {
            this.SOCKET.send(Packet.create(PacketTypesSender.CloseClient, localPlayer.id))
            console.log("[close] Connection closed cleanly")
        }
        else {
            console.log("[close] Connection closed abruptly")
        }
    }

    private _onError(this: NetworkManager, e: ErrorEvent) {
        console.log("[error] " + e.message)
    }
}
