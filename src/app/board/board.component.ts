import { Food } from './../food';
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
 readonly timestep=250;
 food:Food;
  constructor() { }
  ngOnInit(): void {
    this.newGame();
    this.snake =new Snake({row:5,column:5,direction:Directions.NORTH});
    this.food = new Food({row:2,column :3,direction:Directions.NORTH});
    this.drawFood(this.food);
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
  drawFood(food:Food){
 // console.log(foodPosition);
    let row =food.position.row;
    let column = food.position.column;
    this.squares[row][column] = food.color; 
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
   this.squares[previousPosition.row][previousPosition.column]=cellvalue.Empty;
   iterator=iterator.next;
   while(iterator!=null){
    let positionSwapper=iterator.position;
    iterator.position=previousPosition;
    previousPosition=positionSwapper;    
    row=iterator.position.row;
    column = iterator.position.column;
    this.squares[row][column]=cellvalue.COLOR;
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
    let currentPossition=this.snake.getHead().position.direction;
    console.log(currentPossition);
    switch(event.key){
      case "ArrowDown":if(currentPossition!=Directions.NORTH)this.snake.getPosition().direction=Directions.SOUTH;break;
      case "ArrowUp": if(currentPossition!=Directions.SOUTH)this.snake.getPosition().direction=Directions.NORTH;break;
      case "ArrowLeft":if(currentPossition!=Directions.EAST)this.snake.getPosition().direction=Directions.WEST;break;
      case "ArrowRight":if(currentPossition!=Directions.WEST)this.snake.getPosition().direction=Directions.EAST;break;
      default:break;
    }
  }
 moveUp(){ 
  let row = this.snake.getHead().position.row;
  let column = this.snake.getHead().position.column;
  let direction = this.snake.getHead().position.Directions;
  let newPosition = {row:row,column:column,direction:direction};
  this.snake.moveUp();
  row = this.snake.getHead().position.row;
  column = this.snake.getHead().position.column;
  let foodPosition =this.food.position;
  this.unOccupy();
  if(foodPosition.column==column && foodPosition.row==row){
    foodPosition.row=row+1;
    this.snake.add(foodPosition);
    this.resetFruit();
  }
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
    let foodPosition =this.food.position;
    row = this.snake.getHead().position.row;
    column = this.snake.getHead().position.column;
    this.unOccupy();
    if(foodPosition.column==column && foodPosition.row==row){
      foodPosition.row=row-1;
      this.snake.add(foodPosition);
      this.resetFruit();
    }
    this.updateSnake(newPosition);
  }
  moveLeft(){
    let row = this.snake.getHead().position.row;
 let column = this.snake.getHead().position.column;
 let direction = this.snake.getHead().position.Directions;
 let newPosition = {row:row,column:column,direction:direction};
    this.snake.moveLeft();
    let foodPosition =this.food.position;
    row = this.snake.getHead().position.row;
    column = this.snake.getHead().position.column;
    this.unOccupy();
    if(foodPosition.column==column && foodPosition.row==row){
      foodPosition.column=column+1;
      this.snake.add(foodPosition);
      this.resetFruit();
    }
    this.updateSnake(newPosition);
  }
  moveRight(){
    let row = this.snake.getHead().position.row;
    let column = this.snake.getHead().position.column;
    let direction = this.snake.getHead().position.Directions;
    let newPosition = {row:row,column:column,direction:direction};
    this.snake.moveRight();
    let foodPosition =this.food.position;
    row = this.snake.getHead().position.row;
    column = this.snake.getHead().position.column;
    this.unOccupy();
    if(foodPosition.column==column && foodPosition.row==row){
      foodPosition.column=column-1
      this.snake.add(foodPosition);
      this.resetFruit();
    }
    this.updateSnake(newPosition); 
  }
  
  resetFruit(): void {
    let x = this.randomNumber();
    let y = this.randomNumber();

    if (this.squares[y][x] === true) {
      return this.resetFruit();
    }
this.food.position.row=x;
this.food.position.column=y;
this.drawFood(this.food);
  }

  randomNumber(): any {
    return Math.floor(Math.random() * this.squares.length);
  }

   range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
}
