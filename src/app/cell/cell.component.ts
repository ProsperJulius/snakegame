import { Component, Input, OnInit } from '@angular/core';
import { Snake } from '../snake';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() snake:Snake;
  @Input() row:any;
  @Input() column:any;
  

  constructor() { }

  ngOnInit(): void {
  }

}
