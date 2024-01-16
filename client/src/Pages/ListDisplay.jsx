import AddItems from '../components/AddItems';
import React ,{useState} from 'react';
import "./ListDisplay.css"
import CartInfo from '../components/CartInfo';
import { Link } from 'react-router-dom';

const ListDisplay = ()=> {
  const [arrOfItems , setArrOfItems] = useState([])
  const hendelClickFinishOrder = ()=>{
    if(arrOfItems.length === 0 ){
      alert("הכנס מוצרים")
      return
    }
    localStorage.arrOfItems = JSON.stringify(arrOfItems)
  }
  return (
    <div className="ListDisplay">
            <h1> רשימת קניות  </h1>
        <AddItems setArrOfItems={setArrOfItems} arrOfItems={arrOfItems}/>
        <div className='line'></div>
        <CartInfo arrOfItems={arrOfItems}/>
        <button className={`finishOrder ${arrOfItems.length === 0 ? "disableButton" : ""}`} onClick={hendelClickFinishOrder}> 
        {arrOfItems.length > 0&&<Link to="/order">
          <div>
          </div>
        </Link>}
        סיים הזמנה
        </button>
    </div>
  );
} 
 
export default ListDisplay; 