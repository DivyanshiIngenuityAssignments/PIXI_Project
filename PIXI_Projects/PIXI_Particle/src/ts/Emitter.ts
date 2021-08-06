import { ParticleContainer } from 'pixi.js';
import particles = require('pixi-particles');
//import { getSmily } from './Textures';

export class Emitter extends ParticleContainer {
  private pEmitter: particles.Emitter;

  constructor(maxCount: number, props?:any) {
    super(maxCount, props);
    this.pEmitter = new particles.Emitter(this,
     // [getSmily(), getSmily(), getSmily()],
     ["assets/img/coin2.png",],//"assets/img/coin3.png"],
     /* {
        alpha: {
          start: 0.62,
          end: 0,
        },
        scale: {
          start: 0.125,
          end: 0.5,
        },
        color: {
          start: 'fff191',
          end: 'ff622c',
        },
        speed: {
          start: 500,
          end: 500,
        },
        startRotation: {
          min: 265,
          max: 275,
        },
        rotationSpeed: {
          min: 50,
          max: 50,
        },
        lifetime: {
          min: 0.1,
          max: 0.75,
        },
        blendMode: 'normal',
        frequency: 0.001,
        emitterLifetime: 0,
        maxParticles: 1000,
        pos: {
          x: 0,
          y: 0,
        },
        addAtBack: false,
        spawnType: 'circle',
        spawnCircle: {
          x: 0,
          y: 0,
          r: 10,
        },
      });*/

      {
        alpha: {
          start: 1,
          end: 0.80
        },
        scale: {
          start: 0.5,
          end: 1,
          minimumScaleMultiplier:0.5
        },
        color: {
          start: "e7f22d",//"ffffff",
          end: "e7f22d"
        },
        speed: {
          start: 900,
          end: 1000
        },
        acceleration: {
          x:0,
          y: 2000
        },
        startRotation: {
          min: 160,
          max: 400
        },
        rotationSpeed: {
          min: 0,
          max: 0
        },
        lifetime: {
          min: 0.25,
          max: 0.5
        },
        blendMode: "normal",
        frequency: 0.001,
        emitterLifetime: 0,
        maxParticles: 500,
        pos: {
          x: 0,
          y: 0
        },
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
          x: 0,
          y: 0,
          r: 0
        }
      });
  }

  public start(): void {
    this.pEmitter.emit = true;
  }

  public update(delta: number): void {
    this.pEmitter.update(delta * 0.001);
  }
}
