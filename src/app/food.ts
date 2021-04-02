import { cellvalue } from './cell/cell.component';
import { Position } from './position';
export class Food {
    public color:cellvalue = cellvalue.FOODCOLOR;
        constructor(public position:Position){

    }
    setPosition(position:Position){
        this.position=position;
    }

}
