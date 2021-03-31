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
 previousPosition;
 readonly timestep=2000;
  constructor() { }
  ngOnInit(): void {
    this.newGame();
    this.snake =new Snake({row:5,column:5,direction:Directions.NORTH});
    this.snake.add({row:6,column:5,direction:Directions.NORTH});
    this.snake.add({row:7,column:5,direction:Directions.NORTH});
    console.log(this.snake);
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
    this.snake.moveLeft();
    console.log(this.snake);
    
    
  }
  updateSnake(){
    let iterator = this.snake.getHead();
    let  row = iterator.position.row;
    let column = iterator.position.column;
    this.squares[row][column] =cellvalue.COLOR;
    iterator=iterator.next;
   
   while(iterator!=null){
    let positionSwapper=iterator.position;
    iterator.position=this.previousPosition;
    this.previousPosition=positionSwapper;    
    row=iterator.position.row;
    column = iterator.position.column;
  // this.squares[row][column] =cellvalue.COLOR;
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
  this.previousPosition=this.snake.getPosition();
  //console.log(this.previousPosition);
  this.snake.moveUp();
  this.unOccupy();
  this.updateSnake();
}
  unOccupy(){
    let row =this.snake.getTail().position.row;
    let column = this.snake.getTail().position.column;
  
    this.squares[row][column]=cellvalue.Empty;
  }
 
  moveDown(){
    this.previousPosition=this.snake.getPosition();
    this.snake.moveDown();
    this.unOccupy();
    this.updateSnake();
  }
  moveLeft(){
    this.previousPosition=this.snake.getPosition();
    this.snake.moveLeft();
    this.unOccupy();
    this.updateSnake();
  }
  moveRight(){
    this.previousPosition=this.snake.getPosition();
    this.snake.moveRight();
    this.unOccupy();
    this.updateSnake();
    
  }
   range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

}
