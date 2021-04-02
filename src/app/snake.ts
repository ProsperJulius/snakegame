import { Listnode } from './listnode';
export class Snake {
     head;
     tail;
    
    constructor(position){
        const root=new Listnode(position);
        this.head=root;
        this.tail=root;
        
    }
    
    add(position){
    const newNode=new Listnode(position);
     this.tail.next=newNode;
     this.tail=this.tail.next;
  
    }
    getHead():Listnode{
    return this.head;
    }
    getTail(){
        return this.tail;
    }
    moveUp(){
        let position =this.getPosition();
        let possiblePosition= {row:(position.row)-1,
            column:position.column,
            direction:position.direction};
        if(!this.isPositionOutOfBound(possiblePosition)){
            
            position.row-=1;
           
        }else{
            position.row=11;
        }
     
    }
    moveDown(){
        let position =this.getPosition();
        let possiblePosition= {row:(position.row)+1,
            column:position.column,
            direction:position.direction};
        if(!this.isPositionOutOfBound(possiblePosition)){
            position.row+=1;
        }else{
            position.row=0;
        }
        
    }
    moveLeft(){
        let position = this.getPosition();
        let possiblePosition= {row:position.row,
            column:(position.column)-1,
            direction:position.direction};
        if(!this.isPositionOutOfBound(possiblePosition)){
            position.column-=1;
        }else{
            position.column=19;
        }
    }
    moveRight(){
        let position = this.getPosition();
        let possiblePosition= {row:position.row,
            column:(position.column)+1,
            direction:position.direction};
        if(!this.isPositionOutOfBound(possiblePosition)){
            position.column+=1;
        }else{
            position.column=0;
        }
    }
    isPositionOutOfBound(position){
        if(position.row <0 || position.row > 11 || position.column < 0 || position.column> 19){
           
            return true;
        } else{
            return false;
        }
    }
    getPosition(){
       return this.getHead().position;
    }
}
