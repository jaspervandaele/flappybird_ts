import { Scene } from "phaser";


export class MainScene extends Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        // This function will be executed at the beginning
        // That's where we load the game's assets
    }

    create() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        //this.scene.start();
    }

    update() {
        // This function is called 60 times per second
        // It contains the game's logic
    }

}