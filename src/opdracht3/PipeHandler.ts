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

        // Verwijder zodra het uit beeld is
      pipe.body.world.on('worldbounds', (body) => {
        console.log('left the world: ', body);
        if (body.gameObject === pipe) {
              console.log('will remove pipe from group', pipe, this.pipes);
              /* pipe.setActive(false);
                pipe.setVisible(false); */
                this.pipes.remove(pipe);

            }
      });
    }

    killInvisiblePipes() {
      this.pipes.children.iterate( (pipe: Phaser.GameObjects.GameObject) => {
        console.log('pipe is of type', typeof pipe);
        if (pipe.active && pipe.body && pipe.body?.position.x + 50 < 0) {
          console.log('pipe left the world: ', pipe);
          pipe.setActive(false);
          /* pipe.setVisible(false);
          pipe.body.stop(); */
        }
        return true;
      });
    }
}