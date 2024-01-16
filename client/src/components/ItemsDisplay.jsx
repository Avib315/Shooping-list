import "./ItemsDisplay.css";
import React  from 'react';
const ItemsDisplay = ({arrOfItems})=> {
    return (
      <div className="ItemsDisplay">
      {
        arrOfItems.map((e,i)=>(
            <div key={"item_"+i} className="pItemList" >
              {e.itemName}
              <span>{e.amount > 1 ? " - " +e.amount : ""}</span>
            </div>
        ))
      }
    </div>
  );
}

export default ItemsDisplay;