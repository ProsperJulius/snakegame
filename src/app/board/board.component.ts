import { Directions } from './../directions.enum';
import { cellvalue } from './../cell/cell.component';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Snake } from '../snake';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
 squares=[];
 snake:Snake;
 readonly timestep=500;
  constructor() { }
  ngOnInit(): void {
    this.newGame();
    this.snake =new Snake({row:5,column:5,direction:Directions.NORTH});
    this.snake.add({row:6,column:5,direction:Directions.NORTH});
    this.snake.add({row:7,column:5,direction:Directions.NORTH});
    this.snake.add({row:8,column:5,direction:Directions.NORTH});
    this.snake.add({row:9,column:5,direction:Directions.NORTH});
    this.drawSnakeOnBoard();
  }
  startGame(){
      switch(this.snake.getPosition().direction){
        case Directions.NORTH: this.moveUp();break;
        case Directions.SOUTH: this.moveDown();break;
        case Directions.EAST:this.moveRight();break;
        case Directions.WEST:this.moveLeft();break;
        default: break;
      }
     setTimeout(() => {
       this.startGame();
      }, this.timestep)
  }
  drawSnakeOnBoard(){
    let iterator = this.snake.getHead();
    while(iterator!=null){
      let  row = iterator.position.row;
      let column = iterator.position.column;
      this.squares[row][column] =cellvalue.COLOR;
      iterator =iterator.next;
    }
    //console.log(JSON.stringify(this.snake,null));  
  }
  updateSnake(previousPosition){
   let iterator = this.snake.getHead();
   let  row = iterator.position.row;
   let column = iterator.position.column;
   this.squares[row][column] =cellvalue.COLOR;
   iterator=iterator.next;
   while(iterator!=null){
    let positionSwapper=iterator.position;
    iterator.position=previousPosition;
    previousPosition=positionSwapper;    
    row=iterator.position.row;
    column = iterator.position.column;
   iterator=iterator.next;
  }

  
 

  }
  newGame(){
        for(var i: number = 0; i < 12; i++) {
            this.squares[i] = [];
            for(var j: number = 0; j< 20; j++) {
                this.squares[i][j] = cellvalue.Empty;
            }
        } 
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event:KeyboardEvent){
    switch(event.key){
      case "ArrowDown":this.snake.getPosition().direction=Directions.SOUTH;break;
      case "ArrowUp": this.snake.getPosition().direction=Directions.NORTH;break;
      case "ArrowLeft":this.snake.getPosition().direction=Directions.WEST;break;
      case "ArrowRight":this.snake.getPosition().direction=Directions.EAST;break;
      default:break;
    }
  }
 moveUp(){ 
 let row = this.snake.getHead().position.row;
 let column = this.snake.getHead().position.column;
 let direction = this.snake.getHead().position.Directions;
 let newPosition = {row:row,column:column,direction:direction};
  this.snake.moveUp();
  this.unOccupy();
  this.updateSnake(newPosition);
}
  unOccupy(){
    let row =this.snake.getTail().position.row;
    let column = this.snake.getTail().position.column;
    this.squares[row][column]=cellvalue.Empty;
  }
 
  moveDown(){
    let row = this.snake.getHead().position.row;
    let column = this.snake.getHead().position.column;
    let direction = this.snake.getHead().position.Directions;
    let newPosition = {row:row,column:column,direction:direction};
    this.snake.moveDown();
    this.unOccupy();
    this.updateSnake(newPosition);
  }
  moveLeft(){
    let row = this.snake.getHead().position.row;
 let column = this.snake.getHead().position.column;
 let direction = this.snake.getHead().position.Directions;
 let newPosition = {row:row,column:column,direction:direction};
    this.snake.moveLeft();
    this.unOccupy();
    this.updateSnake(newPosition);
  }
  moveRight(){
    let row = this.snake.getHead().position.row;
    let column = this.snake.getHead().position.column;
    let direction = this.snake.getHead().position.Directions;
    let newPosition = {row:row,column:column,direction:direction};
    this.snake.moveRight();
    this.unOccupy();
    this.updateSnake(newPosition);
    
  }
   range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

}
