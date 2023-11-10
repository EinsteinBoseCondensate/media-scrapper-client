import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Figure, defaultFigure } from 'src/app/shared/models/components/tetris/figure.model';
import { Figures } from 'src/app/shared/models/components/tetris/figures.model';
import { SanitizeCurrentIndexesArgument } from 'src/app/shared/models/components/tetris/sanitize.current-index.argument';
import { tetrisAudios } from 'src/audios';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.gameStarted = false;
  }
  private cells: any[] = [];

  ngOnInit(): void {
    document.querySelectorAll('.game-cell').forEach(item => this.cells.push(item));
  }

  private keys = Object.freeze({
    left: 'ArrowLeft',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    enter: 'Enter'

  });

  private audios = tetrisAudios;

  private currentFigure: Figure = defaultFigure();

  private getStickSanitizedCurrentIndexes = (argument: SanitizeCurrentIndexesArgument) => {
    let result = this.currentFigure.currentIndexes;
    if (argument.module === 9) {
      if (result.includes(argument.rotationOrigin - 20))
        result = result.map(index => index - 2)
      else if (result.includes(argument.rotationOrigin + 20))
        result = result.map(index => index - 1)
    } else if (argument.module === 0) {
      if (result.includes(argument.rotationOrigin + 20))
        result = result.map(index => index + 2)
      else if (result.includes(argument.rotationOrigin - 20))
        result = result.map(index => index + 1)
    }
    return result;
  }

  private getPyramidSanitizedCurrentIndexes = (argument: SanitizeCurrentIndexesArgument) => {
    let result = this.currentFigure.currentIndexes;
    if (argument.module === 9) {
      if (result.includes(argument.rotationOrigin + 10) && argument.rotationOrigin % 10 === 9)
        result = result.map(index => index - 1)
    } else if (argument.module === 0) {
      if (result.includes(argument.rotationOrigin + 10) && argument.rotationOrigin % 10 === 0)
        result = result.map(index => index + 1)
    }
    return result;
  }

  private getSSanitizedCurrentIndexes = (argument: SanitizeCurrentIndexesArgument) => {
    let result = this.currentFigure.currentIndexes;
    if (argument.module === 9) {
      if (result.includes(argument.rotationOrigin + 10) && argument.rotationOrigin % 10 === 9)
        result = result.map(index => index - 1)
    } else if (argument.module === 0) {
      if (result.includes(argument.rotationOrigin - 10) && argument.rotationOrigin % 10 === 0)
        result = result.map(index => index + 1)
    }
    return result;
  }

  private getS2SanitizedCurrentIndexes = (argument: SanitizeCurrentIndexesArgument) => {
    let result = this.currentFigure.currentIndexes;
    if (argument.module === 9) {
      if (result.includes(argument.rotationOrigin - 10) && argument.rotationOrigin % 10 === 9)
        result = result.map(index => index - 1)
    } else if (argument.module === 0) {
      if (result.includes(argument.rotationOrigin + 10) && argument.rotationOrigin % 10 === 0)
        result = result.map(index => index + 1)
    }
    return result;
  }

  private getLSanitizedCurrentIndexes = (argument: SanitizeCurrentIndexesArgument) => {
    let result = this.currentFigure.currentIndexes;
    if (argument.rotationOrigin % 10 === 9) {
      result = result.map(index => index - 1)
    } else if (argument.rotationOrigin % 10 === 0) {
      result = result.map(index => index + 1)
    }
    return result;
  }

  private getL2SanitizedCurrentIndexes = (argument: SanitizeCurrentIndexesArgument) => {
    let result = this.currentFigure.currentIndexes;
    if (argument.rotationOrigin % 10 === 9) {
      result = result.map(index => index - 1)
    } else if (argument.rotationOrigin % 10 === 0) {
      result = result.map(index => index + 1)
    }
    return result;
  }

  private gameFigures: Figures = {
    Stick: {
      initialIndexes: [4, 14, 24, 34],
      currentIndexes: [],
      placed: false,
      class: 'stick',
      miniatureClass: 'mini-stick',
      sanitizeIndexesForRotation: this.getStickSanitizedCurrentIndexes
    },
    L: {
      initialIndexes: [4, 14, 24, 25],
      currentIndexes: [],
      placed: false,
      class: 'l',
      miniatureClass: 'mini-l',
      sanitizeIndexesForRotation: this.getLSanitizedCurrentIndexes
    },
    L2: {
      initialIndexes: [4, 14, 24, 23],
      currentIndexes: [],
      placed: false,
      class: 'l2',
      miniatureClass: 'mini-l2',
      sanitizeIndexesForRotation: this.getL2SanitizedCurrentIndexes
    },
    S: {
      initialIndexes: [4, 14, 5, 13],
      currentIndexes: [],
      placed: false,
      class: 's',
      miniatureClass: 'mini-s',
      sanitizeIndexesForRotation: this.getSSanitizedCurrentIndexes
    },
    S2: {
      initialIndexes: [4, 14, 3, 15],
      currentIndexes: [],
      placed: false,
      class: 's2',
      miniatureClass: 'mini-s2',
      sanitizeIndexesForRotation: this.getS2SanitizedCurrentIndexes
    },
    Square: {
      initialIndexes: [4, 5, 14, 15],
      currentIndexes: [],
      placed: false,
      class: 'square',
      miniatureClass: 'mini-square',
      sanitizeIndexesForRotation: arg => []
    },
    Pyramid: {
      initialIndexes: [15, 14, 13, 4],
      currentIndexes: [],
      placed: false,
      class: 'pyramid',
      miniatureClass: 'mini-pyramid',
      sanitizeIndexesForRotation: this.getPyramidSanitizedCurrentIndexes
    },
  };

  private instantGameFigures: Figure[] = [];
  @ViewChild('nextFigure')
  private nextFigure!: ElementRef;
  @ViewChild('nextNextFigure')
  private nextNextFigure!: ElementRef;
  @ViewChild('startOverlay')
  private startOverlay!: ElementRef;
  @ViewChild('endGameOverlay')
  private endGameOverlay!: ElementRef;
  private rowsToCompleteInitialIndexes: number[] = [];
  private gameStarted: boolean = false;
  private gamePaused: boolean = false;
  private currentFigureRowNumber: number = 0;
  private needNextFigure = false;
  public score = 0;
  public currentLevel = 1;
  private scoreBreakPoints = [50, 100, 150, 250, 350, 400, 550, 700, 850];
  private placedCellClassName = 'placed';
  private completedCellClassName = 'completed'
  private figureKeys = Object.keys(this.gameFigures);

  private getNewFigure = () => {
    const newFigure = this.instantGameFigures[0];
    this.instantGameFigures.splice(0, 1);
    this.instantGameFigures.push(this.getFigure());
    this.nextFigure.nativeElement.classList.value = `next-piece ${this.instantGameFigures[0].miniatureClass}`;
    this.nextNextFigure.nativeElement.classList.value = `next-next-piece ${this.instantGameFigures[1].miniatureClass}`;
    return newFigure;
  }

  private getFigure = (): Figure => {
    const figureKey = this.figureKeys[Math.floor(Math.random() * 7)];
    const figure = { ...(this.gameFigures as any)[figureKey] };
    figure.currentIndexes = [...figure.initialIndexes];
    return figure;
  }

  private updateStats = () => {
    if (this.score >= this.scoreBreakPoints[this.currentLevel - 1]) {
      this.currentLevel++;
    }
  }

  private rotateFigure = () => {

    if (this.currentFigure.placed || this.currentFigure.class === 'square')
      return;

    let currentIndexesCopy = [...this.currentFigure.currentIndexes];
    this.currentFigure.currentIndexes.forEach(index => {
      this.cells[index].classList.value = 'game-cell';
    });
    let rotationOrigin = this.currentFigure.currentIndexes[1];
    const modulesOfCurrentIndexes = this.currentFigure.currentIndexes.map(index => index % 10);
    const extremeModules = modulesOfCurrentIndexes.filter(item => item == 9 || item == 0)
      .filter((v, i, s) => i === s.indexOf(v));
    if (extremeModules.length === 1) {
      let sanitizedCurrentIndexes = this.currentFigure.currentIndexes;

      sanitizedCurrentIndexes = this.currentFigure.sanitizeIndexesForRotation({ module: extremeModules[0], rotationOrigin })

      if (sanitizedCurrentIndexes.filter(index => index > 199 || this.cells[index].classList.contains(this.placedCellClassName)).length)
        return;

      rotationOrigin = sanitizedCurrentIndexes[1];
      this.currentFigure.currentIndexes = sanitizedCurrentIndexes;

    }
    let newIndexes = [
      this.getRotatedIndex(this.currentFigure.currentIndexes[0], rotationOrigin),
      rotationOrigin,
      this.getRotatedIndex(this.currentFigure.currentIndexes[2], rotationOrigin),
      this.getRotatedIndex(this.currentFigure.currentIndexes[3], rotationOrigin)
    ];

    if (newIndexes.filter(index => index > 199 || this.cells[index].classList.contains(this.placedCellClassName)).length) {
      currentIndexesCopy.forEach(index => {
        this.cells[index].classList.add(this.currentFigure.class);
      });
      return;
    }

    this.currentFigure.currentIndexes = newIndexes;
    this.currentFigure.currentIndexes.forEach(index => {
      this.cells[index].classList.add(this.currentFigure.class);
    });
    this.audios.rotateFigure.pause();
    this.audios.rotateFigure.currentTime = 0;
    this.audios.rotateFigure.play();
  }

  private getRotatedIndex = (indexToRotate: number, originIndex: number) => {
    const firstRowIndexOfOrigin = Math.floor(originIndex / 10) * 10;
    if (indexToRotate >= firstRowIndexOfOrigin && indexToRotate < firstRowIndexOfOrigin + 10) {

      return originIndex - (originIndex - indexToRotate) * 10;

    }

    const upFromOriginIndex = originIndex - 10;
    const previousRowIndexOfOrigin = firstRowIndexOfOrigin - 10;
    if (indexToRotate >= previousRowIndexOfOrigin && indexToRotate < previousRowIndexOfOrigin + 10) {

      return originIndex - 10 * (upFromOriginIndex - indexToRotate) + 1;
    }

    const upFromUpOriginIndex = originIndex - 20;
    const previousUpRowIndexOfOrigin = firstRowIndexOfOrigin - 20;
    if (indexToRotate >= previousUpRowIndexOfOrigin && indexToRotate < previousUpRowIndexOfOrigin + 10) {

      return originIndex - 10 * (upFromUpOriginIndex - indexToRotate) + 2;
    }

    const downFromOriginIndex = originIndex + 10;
    const nextRowIndexOfOrigin = firstRowIndexOfOrigin + 10;
    if (indexToRotate >= nextRowIndexOfOrigin && indexToRotate < nextRowIndexOfOrigin + 10) {

      return originIndex - 10 * (downFromOriginIndex - indexToRotate) - 1;
    }

    const downFromDownOriginIndex = originIndex + 20;
    const nextDownRowIndexOfOrigin = firstRowIndexOfOrigin + 20;
    if (indexToRotate >= nextDownRowIndexOfOrigin && indexToRotate < nextDownRowIndexOfOrigin + 10) {

      return originIndex - 10 * (downFromDownOriginIndex - indexToRotate) - 2;
    }
    return indexToRotate;
  }

  private initialize = () => {
    this.gameStarted = true;
    const startOverlayClassList = this.startOverlay.nativeElement.classList;
    console.log(this.startOverlay)
    startOverlayClassList.contains('hidden') ? undefined : startOverlayClassList.add('hidden');
    const endOverlayClassList = this.endGameOverlay.nativeElement.classList;
    !endOverlayClassList.contains('hidden') ? endOverlayClassList.add('hidden') : undefined;
    this.cells?.forEach(cell => cell.classList.value = 'game-cell');

    while (this.instantGameFigures.length)
      this.instantGameFigures.splice(0, 1);

    for (var i = 0; i < 2; i++)
      this.instantGameFigures.push(this.getFigure());

    this.score = 0;
    this.currentLevel = 1;
    this.populateNextFigureOrGameOver();
    this.rowsToCompleteInitialIndexes = [];
    this.audios.linesCompleted.volume = 0.3;
    this.audios.placeFigure.volume = 0.3;
    this.audios.rotateFigure.volume = 0.3;
  };

  private moveFigureDown = (manual = false) => {
    const nextFilledCellsIndexes = this.currentFigure.currentIndexes.map(index => index + 10);
    this.currentFigure.currentIndexes.forEach(index => this.cells[index].classList.remove(this.currentFigure.class))
    nextFilledCellsIndexes.forEach(index => {
      const cellClassList = this.cells[index].classList;
      cellClassList.contains(this.currentFigure.class) ? undefined : cellClassList.add(this.currentFigure.class);
    });
    this.currentFigure.currentIndexes = nextFilledCellsIndexes;

    if (manual) {
      this.audios.rotateFigure.pause();
      this.audios.rotateFigure.currentTime = 0;
      this.audios.rotateFigure.play();
    }
  }

  private moveFigureLeft = () => {

    if (this.currentFigure.placed)
      return;

    if (this.currentFigure.currentIndexes.filter(index => index % 10 === 0).length)
      return;

    if (this.currentFigure.currentIndexes.filter(index => this.cells[index - 1].classList.contains(this.placedCellClassName)).length)
      return;

    const nextFilledCellsIndexes = this.currentFigure.currentIndexes.map(index => index - 1);
    this.currentFigure.currentIndexes.forEach(index => this.cells[index].classList.remove(this.currentFigure.class))
    nextFilledCellsIndexes.forEach(index => {
      const cellClassList = this.cells[index].classList;
      cellClassList.contains(this.currentFigure.class) ? undefined : cellClassList.add(this.currentFigure.class);
    });
    this.currentFigure.currentIndexes = nextFilledCellsIndexes;

    this.audios.rotateFigure.pause();
    this.audios.rotateFigure.currentTime = 0;
    this.audios.rotateFigure.play();
  }

  private moveFigureRight = () => {

    if (this.currentFigure.placed)
      return;

    if (this.currentFigure.currentIndexes.filter(index => (index + 1) % 10 === 0).length)
      return;

    if (this.currentFigure.currentIndexes.filter(index => this.cells[index + 1].classList.contains(this.placedCellClassName)).length)
      return;


    const nextFilledCellsIndexes = this.currentFigure.currentIndexes.map(index => index + 1);
    this.currentFigure.currentIndexes.forEach(index => this.cells[index].classList.remove(this.currentFigure.class))
    nextFilledCellsIndexes.forEach(index => {
      const cellClassList = this.cells[index].classList;
      cellClassList.contains(this.currentFigure.class) ? undefined : cellClassList.add(this.currentFigure.class);
    });
    this.currentFigure.currentIndexes = nextFilledCellsIndexes;

    this.audios.rotateFigure.pause();
    this.audios.rotateFigure.currentTime = 0;
    this.audios.rotateFigure.play();
  }

  private placeFigureAndHandlePossibleLineCompleted = () => {
    this.currentFigure.placed = true;
    this.currentFigure.currentIndexes.forEach(index => this.cells[index].classList.add(this.placedCellClassName));
    this.audios.placeFigure.play();
    this.currentFigure.currentIndexes.forEach(index => {
      const currentRowFirstCellIndex = Math.floor(index / 10) * 10;
      for (var i = 0; i < 10; i++) {
        if (!this.cells[currentRowFirstCellIndex + i].classList.contains(this.placedCellClassName))
          return;
      }
      this.rowsToCompleteInitialIndexes.indexOf(currentRowFirstCellIndex) + 1 ? undefined : this.rowsToCompleteInitialIndexes.push(currentRowFirstCellIndex);
    });

    if (!this.rowsToCompleteInitialIndexes.length) {
      this.score++;
      this.updateStats();
      return;
    }
    this.score += this.rowsToCompleteInitialIndexes.length * 10;
    this.updateStats();
    const sortedRowToCompleteInitialIndexes = this.rowsToCompleteInitialIndexes.sort((x, y) => x - y);

    sortedRowToCompleteInitialIndexes.forEach((rowIndex) => {
      for (var indexOfRowToBeMovedDown = rowIndex;
        indexOfRowToBeMovedDown > 0;
        indexOfRowToBeMovedDown--) {

        this.cells[indexOfRowToBeMovedDown + 9].classList.value = this.cells[indexOfRowToBeMovedDown - 1].classList.value;
      }

    })
    while (this.rowsToCompleteInitialIndexes.length) {
      this.rowsToCompleteInitialIndexes.splice(0)
    }
    this.audios.linesCompleted.play();
  }

  private gameOver = () => {
    this.nextFigure.nativeElement.classList.value = 'next-piece';
    this.nextNextFigure.nativeElement.classList.value = 'next-next-piece';
    this.endGameOverlay.nativeElement.classList.remove('hidden');
    this.gameStarted = false;
  }

  private populateNextFigureOrGameOver = () => {
    const nextFigure = this.getNewFigure();
    if (nextFigure.currentIndexes.filter(index => this.cells[index].classList.contains(this.placedCellClassName)).length) {
      this.gameOver();
      return false;
    }
    this.currentFigure = nextFigure;
    this.currentFigureRowNumber = 0;
    this.needNextFigure = false;
    return true;
  }

  private moveFigureDownOrPlaceIt = (manual = false) => {

    if (this.currentFigure.placed)
      return;

    if (
      this.currentFigure.currentIndexes
        .filter(index => index + 10 > 199).length
      || this.currentFigure.currentIndexes
        .filter(index => this.cells[index + 10].classList.contains(this.placedCellClassName)).length
    ) {

      this.placeFigureAndHandlePossibleLineCompleted();
      this.needNextFigure = true;
      return;
    }
    this.currentFigureRowNumber++;
    this.moveFigureDown(manual);
  }

  private runGame = async () => {
    while (this.gameStarted) {
      
      if (!this.gamePaused) {
        if (this.needNextFigure && !this.populateNextFigureOrGameOver()) {
          return;
        }
        this.moveFigureDownOrPlaceIt();
      }

      await this.delay();
    }
  }

  private delay = () => new Promise(res => setTimeout(res, this.currentLevel === 1 ? 1000 : 1000 / (0.8 * this.currentLevel)));

  private startGame = () => {
    if (this.gameStarted) {
      this.gamePaused = !this.gamePaused;
      return;
    }

    this.initialize();
    this.runGame();
  };

  @HostListener('window:keydown', ['$event'])
  public addKeyEventListener(e: KeyboardEvent) {

    switch (e.key) {
      case this.keys.up:
        this.rotateFigure();
        break;
      case this.keys.left:
        this.moveFigureLeft();
        break;
      case this.keys.right:
        this.moveFigureRight();
        break;
      case this.keys.down:
        this.moveFigureDownOrPlaceIt(true);
        break;
      case this.keys.enter:
        this.startGame();
        break;
    }
  }

}
