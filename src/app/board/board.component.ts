import { Component, OnInit } from '@angular/core';
import { Snake } from '../snake';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares =[];
  currentRow=5;
  currentColumn=5;
  constructor() { }

  ngOnInit(): void {
    this. newGame();
    this.initializeSymbol();
    
  
    
  }
  initializeSymbol(){
    this.squares[5][5]= new Snake({"row":5,"column":5})
  }
  newGame(){
    this.squares = [];

        for(var i: number = 0; i < 10; i++) {
            this.squares[i] = [];
            for(var j: number = 0; j< 10; j++) {
                this.squares[i][j] = null;
            }
        }
        
  }

}
