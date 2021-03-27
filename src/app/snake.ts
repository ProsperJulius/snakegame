import { Position } from './position';
export class Snake {

    symbol:string = "x";

    constructor(private position:Position){

    }
    moveUp(){
        this.position.row+=1;
    }
    moveDown(){
        this.position.row-=1;
    }
    moveLeft(){
        this.position.column-=1;
    }
    moveRight(){
        this.position.column+=1;
    }
}
