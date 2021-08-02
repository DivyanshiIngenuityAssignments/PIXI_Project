import {
  Application, Container, BitmapText,
} from 'pixi.js';

import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';
import {
  Card, cardFrames, CARD_WIDTH, CARD_HEIGHT,
} from './Card';
import { shuffleArray } from './utils';

export class Game {
    private stage: Container;

    private readonly app: Application;

    private readonly game: Container;

    private readonly start: Container;

    private readonly gameOver: Container;

    private firstSelection: Card | undefined;

    private secondSelection: Card|undefined;

    private isInitialized = false;

    constructor(app:Application) {
      this.app = app;
      this.stage = app.stage;
      this.start = new Container();
      this.game = new Container();
      this.gameOver = new Container();
      this.stage.addChild(this.game, this.start,this.gameOver);
      this.game.visible = false;

      preLoader(assets, () => {
        this.isInitialized = true;
        this.createStartText();
        this.createCount();
        this.createCards();
        this.placeCards();
      });
      console.warn(this.app);
    }

    private createCount(): void {
       //this.game(heading);
       
      }
    private createStartText(): void {
      const title = new BitmapText('Memory Game', {
        fontName: 'Desyrel',
        fontSize: 120,
        align: 'center',
      });
      title.anchor.set(0.5);
      title.x = this.app.view.width / 2;
      title.y = title.height;
      const heading = new BitmapText("You'll have 3 Chances", {
        fontName: 'Desyrel',
        fontSize: 50,
        align: 'center',
      });
      heading.anchor.set(0.5);
      heading.x = this.app.view.width / 2;
      heading.y = heading.height;
      const start = new BitmapText('Start Game', {
        fontName: 'Desyrel',
        fontSize: 70,
        align: 'center',
      });
      start.anchor.set(0.5);
      start.position.set(this.app.view.width / 2, this.app.view.height / 2);
      start.buttonMode = true;
      start.interactive = true;
      start.on('pointerup', () => {
        this.start.visible = false;
        this.game.visible = true;
        this.stage.removeChild(this.start);
      });
      this.start.addChild(title,heading,start);
    }
    private createGameOver(): void {
      const won = new BitmapText('You Won.....', {
        fontName: 'Desyrel',
        fontSize: 120,
        align: 'center',
      });
     
      won.anchor.set(0.5);
      won.x = this.app.view.width / 2;
      won.y = won.height;

      const win = new BitmapText('CONGRATS', {
        fontName: 'Desyrel',
        fontSize: 50,
        align: 'center',
      });

      win.position.set(this.app.view.width / 2, this.app.view.height / 2);

      this.start.visible = false;
      this.game.visible = false;
      this.gameOver.visible=true;
      //this.stage.removeChild(this.game);

      this.gameOver.addChild(won,win);

    }
    count = 0;
    private next(): void {
      this.firstSelection = undefined;
      this.secondSelection = undefined;
      this.cardEnabled(true);
    }

    private checkResult(): void {
      if (this.firstSelection && this.secondSelection) {
        if (this.firstSelection.name === this.secondSelection.name) {
          gsap.to([this.firstSelection, this.secondSelection],
            {
              width: 160,
              height: 160,
              alpha: 0,
              duration: 0.75,
              onComplete: () => {
                this.game.removeChild(this.firstSelection as Card);
                this.game.removeChild(this.secondSelection as Card);
                this.count++;
                console.log(this.count);
              if(this.count==24)
              {
                 this.createGameOver();

              }
              this.next();
                this.next();
              },
            });
        } else {
          gsap.fromTo([this.firstSelection, this.secondSelection],
            { rotation: 0.5 },
            {
              rotation: 0,
              ease: 'elastic',
              duration: 0.5,
              onComplete: () => {
                (this.firstSelection as Card).back.visible = true;
                (this.secondSelection as Card).back.visible = true;
                this.next();
              },
            });
        }
      }
    }

    private createCards(): void {
      const heading = new BitmapText("You'll have 3 Chances", {
        fontName: 'Desyrel',
        fontSize: 50,
        align: 'center',
      });
      heading.anchor.set(0.5);
      heading.x = this.app.view.width / 2;
      heading.y = heading.height;
      //this.game.addChild(heading);
      shuffleArray(cardFrames).forEach((cardFrame) => {
        const card = new Card('back', { id: 'front', frame: cardFrame });
        card.on('pointerup', () => {
          card.interactive = false;
          gsap.to(card.back, {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
              card.back.visible = false;
              card.back.alpha = 1;
            },
          });
          if (this.firstSelection) {
            this.secondSelection = card;
            this.cardEnabled(false);
            setTimeout(this.checkResult.bind(this), 1000);
          } else {
            this.firstSelection = card;
          }
        });
        this.game.addChild(card);
      });
    }

    private cardEnabled(value:boolean) {
      this.game.children.forEach((child) => {
        // eslint-disable-next-line no-param-reassign
        child.interactive = value;
      });
    }

    private placeCards(): void {
      let count = 0;
      const PADDING = 20;
      const OFFSET = 200;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          const card = this.game.getChildAt(count);
          card.x = c * (CARD_WIDTH + PADDING) + OFFSET;
          card.y = r * (CARD_HEIGHT + PADDING) + OFFSET;
          count++;
        }
      }
    }

    public update(delta:number):void {
      if (this.isInitialized) {
        // console.warn(delta);
        // eslint-disable-next-line no-unused-expressions
        delta;
      }
    }
}
