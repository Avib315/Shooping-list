import "./OrderComplete.css";
import React from 'react';
const OrderComplete = () => {

    return (
        <div className="OrderComplete">
            הזמנה בוצעה בהצלחה
            <button className={`finishOrder`} onClick={()=> window.location.href = "/" }>
         חזור לדף הבית
      </button>
        </div>
    );
}

export default OrderComplete;