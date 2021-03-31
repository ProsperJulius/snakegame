import { Component, Input, OnInit } from '@angular/core';
export enum cellvalue{
  Empty ='',
  X='x',
  COLOR='whitesmoke'
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() color:cellvalue;
  constructor() { }

  ngOnInit(): void {
  }

}
