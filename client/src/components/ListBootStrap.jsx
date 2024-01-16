import React from 'react';
const ListBootStrap = ({ arrOfItems }) => {
    
    return (
        <>
            {
                arrOfItems.map((e, i) => (
                    <li className="list-group-item li-item"key={"item_" + i} >{e.itemName} <div> <span style={{fontWeight:900}}> כמות:</span> {e.amount}</div></li>
                ))
            }
        </>
    );
}

export default ListBootStrap;