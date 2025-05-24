import { Scene, Key } from "phaser";
import { PipeHandler } from "./PipeHandler";


export class MainScene extends Scene {

    constructor() {
        super("MainScene");
    }


    preload() {
        // Load the bird & pipe images
        this.load.image('bird', 'assets/yellowbird-midflap.png');
        this.load.image('pipe', 'assets/pipe.png');
    }

    create() {

        // Display the bird on the screen
        this.bird = this.physics.add.sprite(100, 245, 'bird');

        // Add gravity to the bird to make it fall
        this.bird.body.setGravityY(1000);

        // Call the 'jump' function when the spacekey is hit
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.pipes = this.physics.add.group({
            defaultKey: 'pipe',
            maxSize: 20
        });
        
        this.pipeHandler = new PipeHandler(this.pipes);
        this.time.addEvent({
            callback : this.addRowOfPipes,
            args: [this.pipeHandler],
            loop: true,
            delay: 1500
        });

    }

    addRowOfPipes(pipeHandler){
        pipeHandler.addRowOfPipes();
    }

    update() {
        if(this.jumpKey.isDown){
            this.jump();
        }

        // If the bird overlap any pipes, call 'restartGame'
        this.physics.overlap(this.bird, this.pipes, this.restartGame, null, this);

        // If the bird is out of the world ( too low), call the 'restartGame' function
        const y = this.bird.body.y;
        if (y < 0 || y > 500) {
            this.restartGame();
        }

        this.pipeHandler.killInvisiblePipes();
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