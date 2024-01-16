import './OrderForm.css';
import React, { useEffect, useState } from 'react';
import InputComponent from "../components/InputCompunent";
import ListBootStrap from '../components/ListBootStrap';
import axios from "axios";
import LoadingPage from '../components/LoadingPage';
const OrderForm = () => {
  const [inputNameValue, setInputNameValue] = useState("")
  const [inputAddresValue, setInputAddresValue] = useState("")
  const [inputEmailValue, setInputEmailValue] = useState("")
  const isValueEnterd = Boolean(inputNameValue === "" || inputAddresValue === "" || inputEmailValue === "")
  const [isLoading, setIsLoading] = useState(false)
  const [arrOfItems, setArrayOfItems] = useState([])
  const saveUser = async () => {
    try {
      const res = await axios.post('http://localhost:3500/addOrder', {
        fullName: inputNameValue,
        address: inputAddresValue,
        email: inputEmailValue,
        arrOrder:arrOfItems
      })
      localStorage.clear();
      window.location.href = "/orderFinish"
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }
  const hendelClickFinishOrder = () => {
    if(isLoading || isValueEnterd){
      return
    }
    saveUser()
    setIsLoading(true)
  }
  const setIsAnArrayOfItems = ()=>{
    if(localStorage.arrOfItems){
      setArrayOfItems(JSON.parse([localStorage.arrOfItems]))
    }
    else{
      window.location.href = "/" 
    }
  }
  useEffect(()=>{
    setIsAnArrayOfItems()
  },[])
  return (
    <>
    {arrOfItems&&<div className="OrderForm">
      <h1>השלמת הזמנה</h1>
      <div className='container_form'>

        <div className="InputContainer">
          <InputComponent
            placeHolder="שם פרטי ומשפחה:  "
            setValueFunc={setInputNameValue}
            />
        </div>
        <div className="InputContainer">
          <InputComponent
            placeHolder="כתובת:"
            setValueFunc={setInputAddresValue}
            />
        </div>
        <div className="InputContainer">
          <InputComponent
            placeHolder="מייל:"
            setValueFunc={setInputEmailValue}
            type="email"
            />
        </div>
      </div>
      <h1>סיכום הזמנה</h1>
      <ul className="list-group ol-List">
        {arrOfItems.map(e => (
          <ListBootStrap key={"list-" + e.CategoryId} arrOfItems={e.arr} />
          ))}
      </ul>
      <button className={`finishOrder ${isValueEnterd ? "disableButton" : ""}`} onClick={()=>{hendelClickFinishOrder()}}>
        סיים הזמנה
      </button>
    </div>}
      {isLoading&&<LoadingPage/>}
          </>
  );
}

export default OrderForm;