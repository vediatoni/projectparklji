/**
 * Defined in: <documented.js>.
 */
declare function shaderCallBack(): void;

/**
 * Creates an instance of the CopperLicht 3D engine by loading the scene from a CopperCube file.
 * @param elementIdOfCanvas - The id of the canvas in your html document.
 * @param filetoLoad - a filename such as 'test.ccbjs' or 'test.ccbz' which will be loaded, displayed and animated by the 3d engine. .ccbjs and .ccbz files can be created using the CopperCube editor, it is free to use for 14 days.
 * @param loadingScreenText - optional parameter specifying a loadingScreen text. Setting this to a text like "Loading" will cause a loading screen with this text to appear while the file is being loaded.
 * @param noWebGLText - optional parameter specifying a text to show when there is no webgl.
 * @param fullpage - optional parameter, set to true to expand canvas automatically to the full browser size.
 * @param pointerLockForFPSCameras - optional parameter, set to true to automatically use pointer lock for FPS cameras
 * @param loadingScreenBackgroundColor - optional paramater, set background color while loading
 * @returns {CL3D.CopperLicht} the instance of the CopperLicht engine
 */
declare function startCopperLichtFromFile(elementIdOfCanvas: string, filetoLoad: string, loadingScreenText?: string, noWebGLText?: string, fullpage?: boolean, pointerLockForFPSCameras?: boolean, loadingScreenBackgroundColor?: string): CL3D.CopperLicht;

declare namespace CL3D {
    /**
     * Low tolerance value deciding which floating point values are considered equal.
     */
    var TOLERANCE: number;

    var UseShadowCascade: boolean;

    class CopperLicht {
        public OnAfterDrawAll: any;
        public OnAnimate: any;
        public OnBeforeDrawAll: any;
        public OnLoadingComplete: any;
        public OnMouseDown: any;
        public OnMouseUp: any;

        /**
         * The main class of the CopperLicht engine, representing the 3D engine itself.
         * @param elementIdOfCanvas - id of the canvas element embedded in the html, used to draw 3d graphics.
         * @param showInfoTexts - if set to true, this shows loading indicators and error texts. If set to false no text is shown and you have to do this yourself.
         * @param fps - frames per second to draw. Uses a default of 60 if set to null.
         * @param showFPSCounter - set to true to show a frames per second counter
         * @param loadingScreenText - optional parameter specifying a loadingScreen text. Setting this to a text like "Loading" will cause a loading screen with this text to appear while the file is being loaded.
         * @param noWebGLText - optional parameter specifying a text to show when there is no webgl.
         * @param fullpage - optional parameter, set to true to expand canvas automatically to the full browser size.
         * @param pointerLockForFPSCameras - optional parameter, set to true to automatically use pointer lock for FPS cameras
         * @param loadingScreenBackgroundColor - optional paramater, set background color while loading
         */
        constructor(elementIdOfCanvas: string, showInfoTexts: boolean, fps: number, showFPSCounter: boolean, loadingScreenText?: string, noWebGLText?: string, fullpage?: boolean, pointerLockForFPSCameras?: boolean, loadingScreenBackgroundColor?: string)

        /**
         * getScene - return a reference to the currently active Scene.
         */
        public getScene(): CL3D.Scene

        /**
        * When CopperLicht is created, it will register the document.onkeyup event with this function. 
        * If you need to handle it yourself, you should call this function with the event parameter so 
        * that all animators still work correctly.
        * @param evt - keyboard event
        */
        public handleKeyUp(evt: KeyboardEvent): void;

        /**
         * When CopperLicht is created, it will register the document.onkeydown event with this function. 
         * If you need to handle it yourself, you should call this function with the event parameter so 
         * that all animators still work correctly.
         * @param evt - keyboard event
         */
        public handleKeyDown(evt: KeyboardEvent): void;
    }

    class Scene {
        public static REDRAW_EVERY_FRAME: any;
        /**
         * getSceneNodeFromName - Returns the first SceneNode in this scene with the specified name.
         * @param name - name of the SceneNode. See SceneNode.getName().
         */
        public getSceneNodeFromName<T>(name: string): T;

        /**
         * setRedrawMode - Specifies when the scene should be redrawn.
         */
        public setRedrawMode(mode: any): void;

        /**
         * getRootSceneNode - Returns the root SceneNode, the root of the whole scene graph.
         */
        public getRootSceneNode(): CL3D.SceneNode;
    }

    /**
     * A scene node is a node in the hierarchical scene graph. Every scene node may have children, which are also scene 
     * nodes. Children move relative to their parent's position. If the parent of a node is not visible, its children 
     * won't be visible either. In this way, it is for example easily possible to attach a light to a moving car, 
     * or to place a walking character on a moving platform on a moving ship.
     * <br/> <br/>
     * Concrete implementations are for example: {@link CL3D.CameraSceneNode}, {@link CL3D.BillboardSceneNode}, {@link CL3D.PathSceneNode}, {@link CL3D.MeshSceneNode}, {@link CL3D.SkyBoxSceneNode}.
     * @constructor
     * @class The base class for scene nodes, a node in the hierarchical 3d scene rendering graph.
     */
    abstract class SceneNode {
        /**
         * Defines the id of the scene node, completely freely usable by the user.
         * @type Number
         * @public
         */
        public Id: number;

        /**
         * Defines the name of the scene node, completely freely usable by the user.
         * @type String
         * @public
         */
        public Name: String;

        /**
         * Position of the scene node, relative to its parent.
         * If you want the position in world coordinates, use {@link getAbsolutePosition}().
         * If you change this value, be sure to call {@link updateAbsolutePosition}() afterwards to make the change be reflected immediately.
         * @type Vect3d
         * @public
         */
        public Pos: CL3D.Vect3d;

        /**
         * Rotation of the scene node, relative to its parent, in degrees.
         * Note that this is the relative rotation of the node. If you want the absolute rotation, use {@link getAbsoluteTransformation}().getRotation()
         * If you change this value, be sure to call {@link updateAbsolutePosition}() afterwards to make the change be reflected immediately.
         * @type Vect3d
         * @public
         */
        public Rot: CL3D.Vect3d;

        /**
         * Scale of the scene node, relative to its parent, in degrees. Default is (1,1,1)
         * This is the scale of this node relative to its parent. If you want the absolute scale, use {@link getAbsoluteTransformation}().getScale()
         * If you change this value, be sure to call {@link updateAbsolutePosition}() afterwards to make the change be reflected immediately. 
         * @type Vect3d
         * @public
         */
        public Scale: CL3D.Vect3d;

        /**
         * An optional {@link TriangleSelector}, giving access to the collision geometry of this scene node.
         * @type TriangleSelector
         * @public
         */
        public Selector: CL3D.TriangleSelector;

        /**
         * Defines whether the node should be visible (if all of its parents are visible). 
         * This is only an option set by the user, but has nothing to do with geometry culling.
         * @type Boolean
         * @public
         */
        public Visible: boolean;

        /** 
         * Returns the parent scene node of this scene node.
         * @public
         * @returns {CL3D.SceneNode}
         */
        public getParent(): CL3D.SceneNode;

        /** 
         * Returns an array with all child scene nodes of this node
         * @public
         * @returns {Array<CL3D.SceneNode>}
         */
        public getChildren(): Array<CL3D.SceneNode>

        /**
         * Creates a clone of this scene node and its children.
         * @param {CL3D.SceneNode} newparent The new parent of the cloned scene node.
         * @returns {CL3D.SceneNode} the cloned version of this scene node
         * @public
         */
        public createClone<T>(newparent: CL3D.SceneNode, oldNodeId?: number, newNodeId?: number): T;

        /** 
         * Adds a child to this scene node. 
         * If the scene node already has a parent it is first removed from the other parent.
         * @public
         * @param {CL3D.SceneNode} n the child scene node to add.
         */
        public addChild(n: CL3D.SceneNode): void;

        /** 
         * Removes a child from this scene node. 
         * @public
         * @param {CL3D.SceneNode} n the child scene node to add.
         */
        public removeChild(n: CL3D.SceneNode): void;

        /**
         * Get the axis aligned, not transformed bounding box of this node.
         * This means that if this node is an animated 3d character, moving in a room, the bounding box will 
         * always be around the origin. To get the box in real world coordinates, just transform it with the matrix 
         * you receive with {@link getAbsoluteTransformation}() or simply use {@link getTransformedBoundingBox}(), which does the same.
         * @public
         * @returns {CL3D.Box3d} Bounding box of this scene node.
         */
        public getBoundingBox(): CL3D.Box3d;

        /** 
         * Returns the material based on the zero based index i. 
         * To get the amount of materials used by this scene node, use {@link getMaterialCount}().
         * This function is needed for inserting the node into the scene hierarchy at an optimal position for 
         * minimizing renderstate changes, but can also be used to directly modify the material of a scene node.
         * @returns {CL3D.Material} the material with the specified index or null.
         * @public
         */
        public getMaterial(): CL3D.Material;

        /** 
         * Returns if the scene node and all its parents are actually visible.
         * For a quicker way, simply check the Visible property of this class. This method
         * Checks the flags for this node and all its parents and maybe a bit slower.
         * @returns {boolean} if the scene node and all its parents are visible
         * @public
         */
        public isActuallyVisible(): boolean;

        /**
         * Gets the absolute position of the node in world coordinates. 
         * If you want the position of the node relative to its parent, use {@link Pos} instead, this is much faster as well.
         * Note: If local changes to the position, scale or rotation have been made to this scene node in this frame,
         * call {@link updateAbsolutePosition}() to ensure this position is up to date.
         * @public	
         * @returns {CL3D.Vect3d} the absolute position
         */
        public getAbsolutePosition(): CL3D.Vect3d;

        /** 
         * Get amount of materials used by this scene node.
         * @returns {Number} the amount of materials.
         * @public
         */
        public getMaterialCount(): number;

        /** 
         * OnAnimate() is called just before rendering the whole scene. 
         * Nodes may calculate or store animations here, and may do other useful things, 
         * depending on what they are. Also, OnAnimate() should be called for all child scene nodes here.
         * This method will be called once per frame, independent of whether the scene node is visible or not.
         * @param {CL3D.Scene} scene the current scene 
         * @param {Number} current time in milliseconds
         * @public
         */
        public OnAnimate(scene: CL3D.Scene, timeMs: Number): any

        /**
         * Returns the absolute transformation matrix of the node, also known as world matrix. 
         * Note: If local changes to the position, scale or rotation have been made to this scene node in this frame,
         * call {@link updateAbsolutePosition}() to ensure this transformation is up to date.
         * @public	
         * @returns {CL3D.Matrix4} the absolute matrix
         */
        public getAbsoluteTransformation(): CL3D.Matrix4;

        /**
         * Updates the absolute position based on the relative and the parents position. 
         * Note: This does not recursively update the parents absolute positions, so if you have a deeper hierarchy you might
         * want to update the parents first.
         * @public
        */
        public updateAbsolutePosition(): void;

        /** 
         * Returns the type string of the scene node.
         * For example 'camera' if this is a camera, or 'mesh' if it is a mesh scene node.
         * @public
         * @returns {String} type name of the scene node.
         */
        public getType(): String;

        /**
         * Returns an array of {@link Animator}s which are animating this scene node.
         * @public
         * @returns {Array} Bounding box of this scene node.
         */
        public getAnimators<T>(): Array<T>;

        /** 
         * Adds a scene node animator to the list of animators manipulating this scene node.
         * @param {CL3D.Animator} a the new CL3D.Animator to add.
         * @public
         */
        public addAnimator(a: CL3D.Animator): void;

        /**
         * Returns the bounding box of this scene node, transformed with the absolute transformation of this scene node.
         * @returns {CL3D.Box3d} The axis aligned, transformed and animated absolute bounding box of this node.
         * @public
         */
        public getTransformedBoundingBox(): CL3D.Box3d;

        /** 
         * Returns the relative transformation of the scene node. 
         * The relative transformation is stored internally as 3 vectors: translation, rotation and scale.
         * To get the relative transformation matrix, it is calculated from these values.
         * @public
         * @returns {CL3D.Matrix4} the relative transformation
         */
        public getRelativeTransformation(): CL3D.Matrix4;

        /**
         * Removes an animator from this scene node.
         * @public
         * @param {CL3D.Animator} a the new CL3D.Animator to remove.
         */
        public removeAnimator(a: CL3D.Animator): void

        /**
         * Returns the first {@link Animator} attached to this scene node with the specified type.
         * @param type is a string with the type returned by {@link Animator}.getType(). A possible value 
         * is for example 'camerafps'. See the concreate animator implementations for type strings.
         * @public
         * @returns {CL3D.Animator} The animator if found, or null if not.
         */
        public getAnimatorOfType(type: any): CL3D.Animator;

        /**
         * This method is called just before the rendering process of the whole scene. 
         * Nodes may register themselves in the rendering pipeline during this call, precalculate 
         * the geometry which should be renderered, and prevent their children from being able to register 
         * themselves if they are clipped by simply not calling their OnRegisterSceneNode method. If you are implementing 
         * your own scene node, you should overwrite this method with an implementation code looking like this:
         * @example
         * if (this.Visible)
         * {
         *  // register for rendering
         *  scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
         *
         *  // call base class to register childs (if needed)
         *	CL3D.SceneN"ode.prototype.OnRegisterSceneNode.call(this, scene); 
        * }
        * @param {CL3D.Scene} scene the current scene 
        * @public
        */
        public OnRegisterSceneNode(scene: CL3D.Scene): void;

        constructor();
    }

    /**
     * 3d vector class with lots of operators and methods. Usually used to store 3d positions and directions.
     * @class 3d vector class with lots of operators and methods
     * @public
     * @constructor
     * @param {Number} x x coordinate, can be null.
     * @param {Number} y y coordinate, can be null.
     * @param {Number} z z coordinate, can be null.
     */
    class Vect3d {
        /**
         * X coordinate of the vector
         * @public
         * @type Number
         */
        public X: number;

        /**
         * Y coordinate of the vector
         * @public
         * @type Number 
         */
        public Y: number;

        /**
         * Z coordinate of the vector
         * @public
         * @type Number
         */
        public Z: number;

        constructor(x: number, y: number, z: number);

        /**
         * Sets all 3 coordinates to new values
         * @public
         */
        public set(x: number, y: number, z: number): any;

        /**
         * Creates a copy of this vector and returns it
         * @public
         * @type Vect3d
         */
        public clone(): CL3D.Vect3d

        /**
         * Copies the content of this vector to another vector
         * @public
         * @param {CL3D.Vect3d} tgt Target vector
         */
        public copyTo(tgt: CL3D.Vect3d): void

        /**
         * Substracts another vector from this vector and returns a new vector
         * param other {CL3D.Vect3d} other vector
         * @public
         * @returns {CL3D.Vect3d} new vector with the result
         */
        public substract(other: CL3D.Vect3d): CL3D.Vect3d;

        /**
         * Substracts another vector from this vector, modifying this vector
         * param other {CL3D.Vect3d} other vector
         * @public
         */
        public substractFromThis(other: CL3D.Vect3d): void

        /**
         * Adds another vector to this vector and returns a new vector
         * param other {CL3D.Vect3d} other vector
         * @public
         * @returns {CL3D.Vect3d} new vector with the result
         */
        public add(other: CL3D.Vect3d): CL3D.Vect3d;

        /**
         * Adds another vector to this vector, modifying this vector
         * param other {CL3D.Vect3d} other vector
         * @public
         */
        public addToThis(other: CL3D.Vect3d): void;

        /**
         * Normalizes this vector, setting it to a length of 1, modifying this vector
         * @public
         */
        public normalize(): void;

        /**
         * Creates a new vector which is the normalized version of this vector (set to a length of 1)
         * @returns {CL3D.Vect3d} Returns a new vector with the result
         * @public
         */
        public getNormalized(): CL3D.Vect3d;

        /**
         * Sets the lengthh of this vector to the specified value
         * @public
         */
        public setLength(n: number): void;

        public toString(): string;
    }

    class TriangleSelector {
        constructor();
    }

    /**
     * The scene is usually rendered from the currently active camera. Some cameras have an {@link CL3D.Animator} attached to
     * them which controlls the position and look target of the camera, for example a {@link CL3D.AnimatorCameraFPS}. You can 
     * get access to this animator using camera.getAnimatorOfType('camerafps');. 
     * @class Scene Node which is a (controlable) camera.
     * @constructor
     * @extends CL3D.SceneNode
     * @public
     */
    class CameraSceneNode extends SceneNode {
        constructor();
    }

    /**
     * An animator animates a scene node. It can animate position, rotation, material, and so on. 
     * A scene node animator is able to animate a {@link SceneNode} in a very simple way: It may change its position,
     * rotation, scale and/or material. There are lots of animators to choose from. You can create scene node animators 
     * and attach them to a scene node using {@link SceneNode.addAnimator()}.<br/>
     * Note that this class is only the base class of all Animators, it doesn't do anything itself. See
     * {@link AnimatorCameraFPS} for a concrete Animator example.
     * @class An animator can be attached to a scene node and animates it.
     * @constructor
     * @public
     */
    class Animator {
        constructor();
    }

    /**
     * Special scene node animator for first person shooter cameras. 
     * This scene node animator can be attached to a {@link CL3D.CameraSceneNode} to make it act like a first person shooter.
     * By pressing the cursor keys or WASD, the camera will move and by having the mouse button pressed while moving, the camera
     * will look around.
     * @constructor
     * @public
     * @extends CL3D.Animator
     * @class Special scene node animator for first person shooter cameras. 
     * @param {CL3D.CameraSceneNode} cam an instance of a {@link CL3D.CameraSceneNode} this animator will be attached to. Can be null if the camera is not yet known.
     * @param {CL3D.CopperLicht} engine An instance of the {@link CopperLicht} 3d engine, for receiving the mouse and keyboard input.
     */
    class AnimatorCameraFPS extends Animator {
        public Camera: CL3D.CameraSceneNode;
        public CursorControl: CL3D.CopperLicht;
        public JumpSpeed: number;
        public MaxVerticalAngle: number;
        public MayMove: boolean;
        public MayZoom: boolean;
        public MoveSpeed: number;
        public NoVerticalMovement: boolean;
        public RotateSpeed: number;

        constructor(cam: CL3D.CameraSceneNode, engine: CL3D.CopperLicht);
    }

    /**
     * Class which holds the geometry of an object.
     * A Mesh is nothing more than a collection of some {@link CL3D.MeshBuffer}s. 
     * A mesh is usually used in a {@link CL3D.MeshSceneNode} in order to be rendered.
     * @constructor
     * @public
     * @class Class which holds the geometry of an object
     */
    class Mesh {
        constructor();

        public Name: string;
        /** 
         * Adds a {@link MeshBuffer} to a mesh.
         * @public
         * @param m - MeshBuffer to add
         */
        public AddMeshBuffer(m: CL3D.MeshBuffer): void;

        /** 
         * Returns an Array of all {@link MeshBuffer}s in this mesh. 
         * @public
         * @returns {Array} array of {@link MeshBuffer}s
         */
        public GetMeshBuffers(): Array<CL3D.MeshBuffer>;

        /** 
         * Returns the amount of polygons in the mesh
         * @public
         * @returns {Number} number of polygons in this mesh
         */
        public GetPolyCount(): number;

        /**
         * Creates a clone of this mesh, a copy
         * @public
         */
        public createClone(): CL3D.Mesh;
    }

    /**
     * A buffer containing a set of geometry with one material, usually part of a {@link Mesh}. 
     * @class A buffer containing a set of geometry with one material. 
     * @constructor
     * @public
     *
     */
    class MeshBuffer {
        constructor();
    }

    class MeshSceneNode extends SceneNode {
        constructor();
    }

    class AnimatedMeshSceneNode extends SceneNode {
        /**
         * Returns the amount of named animations in the animated mesh.
         * @public
         * @returns {Integer} Amount of named animations.
         */
        public getNamedAnimationCount(): number;

        /**
         * Returns information about a named animation in the animated mesh by index
         * @public
         * @param {Integer} idx index of the animation. Must be a value >=0 and <getNamedAnimationCount().
         * @returns {Object} returns an object with info about the animation or null if there is no such animation. The object
         * will have the members .Name for the animation name, .Begin for the begin frame, .End for the end frame and
         * .FPS for the frames per second.
         */
        public getNamedAnimationInfo(idx: number): Object;

        /**
         * Sets the animation to a new one by name.
         * @public
         * @returns {Boolean} True if successful, false if not
         */
        public setAnimation(name: string): boolean;

        /**
         * Returns the currently displayed frame number.
         * @public
         */
        public getFrameNr(): Number;

        /**
         * Sets the minimal update delay. The animated mesh is only updated every few milliseconds, in order to increase
         * performance. The default value is 60 milli seconds (= 16 frames per second). Set it to 0 to enable instant updates.
         * @public
         * @param {number} delayMs
         */
        public setMinimalUpdateDelay(delayMs: number): void;


        /**
         * Sets the speed of the animation
         * @public
         * @param {Float} speed a floating point value specifying the frames per second to display
         */
        public setAnimationSpeed(speed: number): void;

        /**
         * Sets if the animation should be playbed back looped
         * @public
         * @param {Boolean} loop true to loop, false if not
         */
        public setLoopMode(loop: boolean): void;

        /**
         * Sets the begin and end frame for a looped animation
         * @public
         * @param {Integer} begin start frame of the loop
         * @param {Integer} end end frame of the loop
         */
        public setFrameLoop(begin: number, end: number): boolean

        /**
         * Sets the current frame to display
         * @public
         * @param {Float} frame current frame to display
         */
        public setCurrentFrame(frame: number): void

        constructor();
    }

    class Box3d {
        public MaxEdge: CL3D.Vect3d;
        public MinEdge: CL3D.Vect3d;
        constructor();
    }

    class Material {
        constructor();
    }

    class Matrix4 {
        constructor();
    }
}

