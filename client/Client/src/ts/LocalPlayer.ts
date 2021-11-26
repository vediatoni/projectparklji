/// <reference path="../dts/copperlicht.d.ts" />

import { scene, engine } from "../main";
import { HumanAnimations, HumanSpeeds } from "./Animations"

var keysDown: Array<any> = new Array<any>();

export class LocalPlayer {
    

    private _animation: HumanAnimations;
    public set animation(v: HumanAnimations) {
        this._animation = v;
    }

    public get isMoving(): boolean {
        return keysDown[65] || keysDown[83] || keysDown[68] || keysDown[87] || keysDown[32] ;
    }

    private _prevString: string;
    public get prevString(): string{
        return this._prevString;
    }
    public set prevString(v:string){
        this._prevString = v;
    }

    private _cameraSceneNode: CL3D.CameraSceneNode;
    public get cameraSceneNode(): CL3D.CameraSceneNode {
        return this._cameraSceneNode;
    }

    private _cameraAnimator: CL3D.AnimatorCameraFPS;
    public get cameraAnimator(): CL3D.AnimatorCameraFPS {
        return this._cameraAnimator;
    }

    private _id: string;
    public get id(): string {
        return this._id;
    }
    public set id(v: string) {
        this._id = v;
    }

    public set speed(v: HumanSpeeds){
        this._cameraAnimator.MoveSpeed = v
    }

    constructor() {
        this._cameraSceneNode = scene.getSceneNodeFromName<CL3D.CameraSceneNode>("localPlayer");;
        this._cameraAnimator = this._cameraSceneNode.getAnimators<CL3D.AnimatorCameraFPS>()[0];
        this.speed = HumanSpeeds.Walk; 
        this._animation = HumanAnimations.Idle;

        document.onkeyup = this._onKeyUp.bind(this);
        document.onkeydown = this._onKeyDown.bind(this);
    }

    public toString(): string {
        let pos: CL3D.Vect3d = this.cameraSceneNode.Pos;
        return pos.X.toFixed(5) + "+" + pos.Y.toFixed(5) + "+" + pos.Z.toFixed(5) + "+" + this.id + "+" + this._animation + "+" + this._cameraSceneNode.Rot.Y.toFixed(5) + ";";
    }

    public update(): void{
        this._updateControls();        
    }

    private _onKeyUp(event: KeyboardEvent): void {
        keysDown[event.keyCode] = false;
        this._updateControls();
        engine.handleKeyUp(event);
    }

    private _onKeyDown(event: KeyboardEvent): void {
        keysDown[event.keyCode] = true;
        this._updateControls();
        engine.handleKeyDown(event);
    }

    private _updateControls(): void {
        let movement = keysDown[65] || keysDown[83] || keysDown[68] || keysDown[87];
        let sprint = keysDown[16];   

        if (movement) {
            if(sprint){
                this.speed = HumanSpeeds.Run;
                if(this.animation != HumanAnimations.Sprint){
                    this.animation = HumanAnimations.Sprint;
                }            
            }
            else{
                this.speed = HumanSpeeds.Walk;
                if(this.animation != HumanAnimations.Walk){
                    this.animation = HumanAnimations.Walk;
                }        
            }
        }

        if (!movement && this._animation != HumanAnimations.Idle) {
            this.animation = HumanAnimations.Idle;
        }
    }
}

