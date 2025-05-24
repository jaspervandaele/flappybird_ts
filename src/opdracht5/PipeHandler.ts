import { GameObjects, Physics, Types } from 'phaser';
type Group = Physics.Arcade.Group;

export class PipeHandler {

    pipes: Group;

    constructor(pipes: Group){
        this.pipes = pipes;
    }


    addRowOfPipes() {
      // Pick where the hole will be
      var hole = Math.floor(Math.random() * 5) + 1;

      // Add the 6 pipes
      for (var i = 0; i < 8; i++)
          if (i != hole && i != hole + 1) {
              /* this.score += 1;
              this.labelScore.text = this.score; */
              this.addOnePipe(400, i * 60 + 10);
          }
    }

    addOnePipe(x: number, y: number) {
      // Get the first dead pipe of our group
      const pipe = this.pipes.get(x, y);
    
      if(!pipe){
        return null;
      }

      pipe.setActive(true);
      pipe.setVisible(true);

        // Reset fysica eigenschappen
      pipe.body.setVelocityX(-200);
      pipe.body.setAllowGravity(false);

        // Zet automatische vernietiging buiten het scherm aan
      pipe.setCollideWorldBounds(false);
      pipe.body.onWorldBounds = true;
      pipe.checkWorldBounds = true;
    }

    killInvisiblePipes() {
      this.pipes.children.iterate( (child) => {
        const pipe  = child as Phaser.GameObjects.Sprite;
        if (pipe.active && pipe.x + pipe.width < 0) {
          pipe.setActive(false);
        }
        return true;
      });
    }
}