/// <reference path="dts/copperlicht.d.ts" />

import { NetworkManager } from "./ts/NetworkManager";
import { LocalPlayer } from "./ts/LocalPlayer";
import { Packet } from "./ts/Packet";
import { PacketTypesSender } from "./ts/PacketTypes";

const SERVER_CONFIG = {
    ip: "192.168.1.8",
    port: 3000
};


export var engine: CL3D.CopperLicht = startCopperLichtFromFile('3darea', '/level1.ccbz', 'Loading $PROGRESS$...<br/><br/>', 'Error: This browser does not support WebGL (or it is disabled)', true, true, "#000000");
export var networkManager: NetworkManager;
export var localPlayer: LocalPlayer;
export var scene: CL3D.Scene;

engine.OnLoadingComplete = () => {
    networkManager = new NetworkManager(SERVER_CONFIG.ip, SERVER_CONFIG.port);
    scene = engine.getScene();

    if (scene) {
        scene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);
        localPlayer = new LocalPlayer();

        setInterval(() => {
            localPlayer.update();

            let tmp = localPlayer.toString();
            if (localPlayer.prevString != tmp) {

                if (networkManager.CONNECTED) {
                    console.log("HEY");
                    networkManager.SOCKET.send(Packet.create(PacketTypesSender.UpdateUser, tmp));
                    localPlayer.prevString = tmp;
                }
            }

        }, 1000 / 30)

        setInterval(() => {
            if (networkManager.CONNECTED && !localPlayer.isMoving)
                networkManager.SOCKET.send(Packet.create(PacketTypesSender.UpdateUser, localPlayer.toString()));
        }, 1000 / 4)
    }
}

window.addEventListener("beforeunload", function (e) {
    networkManager.SOCKET.send(Packet.create(PacketTypesSender.CloseClient, localPlayer.id));
    networkManager.SOCKET.close();
}, false);

