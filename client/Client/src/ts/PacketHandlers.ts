import { localPlayer, scene } from "../main";
import { PlayerList } from "./PlayerList";
import { RemotePlayer } from "./RemotePlayer";

export module PacketHandlers {

    export function helloUser(message: string): any {
        var a: string[] = message.split('/');
        var id: string = a[1];
        var players: string[] = a[0].split(';');
        localPlayer.id = id;

        players.forEach(pl => {
            if (pl != "") {
                let props: string[] = pl.split('+');
                let x: number = parseFloat(props[0]);
                let y: number = parseFloat(props[1]);
                let z: number = parseFloat(props[2]);
                let id: string = props[3];
                let animation: number = parseFloat(props[4]);
                let rotation: number = parseFloat(props[5]);

                let rp: RemotePlayer = new RemotePlayer(x, y, z, id, animation, rotation);
                PlayerList.add(rp);
            }
        });
    }

    /**
    * newUser - initializes new user that connected to the game based with data received from the server
    * @param message 
    */
    export function newUser(message: string): any {
        message = message.split(';')[0];
        let props: string[] = message.split('+');
        let id: string = props[3];

        if (id != localPlayer.id) {

            let x: number = parseFloat(props[0]);
            let y: number = parseFloat(props[1]);
            let z: number = parseFloat(props[2]);
            let animation: number = parseFloat(props[4]);
            let rotation: number = parseFloat(props[5]);

            let rp: RemotePlayer = new RemotePlayer(x, y, z, id, animation, rotation);
            PlayerList.add(rp);
        }
    }

    /**
    * update - synchronizes clients world with server world
    * @param message 
    */
    export function update(message: string): any {
        var players: string[] = message.split(';');
        players.forEach(pl => {
            if (pl != "") {
                var props: string[] = pl.split('+');
                var id: string = props[3];
                if (id != localPlayer.id) {
                    var x: number = parseFloat(props[0]);
                    var y: number = parseFloat(props[1]);
                    var z: number = parseFloat(props[2]);
                    var animation: number = parseFloat(props[4]);
                    var rotation: number = parseFloat(props[5]);
                    console.log(animation);
                    var rp: RemotePlayer = PlayerList.getFromPlayerListByID(id);

                    if (rp)
                        rp.update(x, y, z, animation, rotation);
                }
            }
        });

    }

    export function removeUser(id: string): any {
        PlayerList.remove(id);
    }
}