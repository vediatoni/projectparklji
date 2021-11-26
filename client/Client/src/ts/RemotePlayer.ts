///<reference path="../dts/copperlicht.d.ts" />

import {scene} from "../main";
import {humanAnimations} from "./Animations";

export class RemotePlayer {
    private _animation: number;
    private _id: string;

    private _mesh: CL3D.AnimatedMeshSceneNode;

    public get id(): string {
        return this._id;
    }

    constructor(x: number, y: number, z: number, id: string, animation: number, rotation: number) {
        this._id = id;
        this._animation = animation;
        this._mesh = scene.getSceneNodeFromName<CL3D.AnimatedMeshSceneNode>("remotePlayer").createClone(scene.getRootSceneNode());    
        this._mesh.Visible = true;
        this._mesh.Pos.set(x,y,z);
        this._mesh.setMinimalUpdateDelay(0);
        this._mesh.setLoopMode(true);
    }
    

    /**
     * Updates remote players' animation and position
     */
    public update(x: number, y: number, z: number, animation: number, rotation: number) {
        console.log({"newAnimation":animation, "prevAnim":this._animation});
        if(this._animation != animation){
            this._animation = animation
            this._mesh.setAnimation(humanAnimations[this._animation]);
        }

        var _y = Math.floor(y-16.002);
        this._mesh.Pos.set(x,_y,z);
        this._mesh.Rot.set(0,rotation,0);
    }

    public remove() {
        //TODO: remove mesh
        this._mesh.getParent().removeChild(this._mesh);
        this._mesh = null;
    }
}