import "./CartInfo.css";
import React from 'react';
import ItemsDisplay from "./ItemsDisplay";
const CartInfo = ({ arrOfItems }) => {

  return (
    <div className="CartInfo">
      {
        arrOfItems&&arrOfItems.map((e, i) => (
          <div key={"category_Isted_key" + i} className="CategoryListContainer">
            <p className="categoryNameP">
            {e.CategoryName}:
              </p>  
              <ItemsDisplay arrOfItems={e.arr}/>
          </div>

        ))
      }
    </div>
  );
}

export default CartInfo;