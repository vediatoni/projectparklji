import { RemotePlayer } from "./RemotePlayer";
var _list: Array<RemotePlayer> = new Array<RemotePlayer>();

export module PlayerList {
    export function add(rp: RemotePlayer): void {
        _list.push(rp);

    }

    export function length(): number {
        return _list.length;
    }

    export function remove(id: string): void {
        for (let index = 0; index < _list.length; index++) {
            var element = _list[index];

            if (element.id == id) {
                element.remove();
                _list.splice(index, 1);
                element = null;
            }
        }
    }

    export function getFromPlayerListByID(id:string): any{
        for (let index = 0; index < _list.length; index++) {
            var element = _list[index];

            if (element.id == id) {
                return element;
            }
        }
    }
}