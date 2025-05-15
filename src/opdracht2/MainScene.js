import { Scene, Key } from "phaser";


export class MainScene extends Scene {

    constructor() {
        super("MainScene");
    }


    preload() {

        // Load the bird sprite
        this.load.image('bird', 'assets/bird.png');
    }

    create() {

        // Display the bird on the screen
        this.bird = this.physics.add.sprite(100, 245, 'bird');

        // Add gravity to the bird to make it fall
        this.bird.body.setGravityY(1000);

        // Call the 'jump' function when the spacekey is hit
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(this.jumpKey.isDown){
            this.jump();
        }

        // If the bird is out of the world (too high or too low), call the 'restartGame' function
        const y = this.bird.body.y;
        if (y > 500 || y < 0) {
            this.restartGame();
        }
    }

    // Make the bird jump
    jump() {
        // Add a vertical velocity to the bird
        this.bird.body.setVelocityY(-350);
    }

    // Restart the game
    restartGame() {
        // Start the 'main' state, which restarts the game
        this.scene.restart();
    }

}