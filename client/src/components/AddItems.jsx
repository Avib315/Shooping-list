import React, { useEffect, useRef, useState } from "react";
import InputComponent from "../components/InputCompunent";
import axios from "axios";
import "./AddItems.css";
import LoadingPage from "./LoadingPage";

const AddItems = ({ setArrOfItems, arrOfItems }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [arrOfCategorys, setArrOfCat] = useState(false);
  const inputComponentRef = useRef();

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:3500/getCategoryList");
      setArrOfCat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const setCategoryIdClickHandler = (id) => {
    setSelectedCategory(id);
  };

  const addNewItem = (savedData) => {
    let arrOfItemsUpdate = arrOfItems
    const indexOfArr = arrOfItems.findIndex(e => e.CategoryId === savedData.CategoryId)
    if (indexOfArr >= 0) {
      const indexOfItem = arrOfItems[indexOfArr].arr.findIndex(e => e.itemName === savedData.itemName)
      if(indexOfItem >= 0){
        arrOfItemsUpdate[indexOfArr].arr[indexOfItem].amount++
      }
      else{
        arrOfItemsUpdate[indexOfArr].arr.push(    
          {
                itemName: savedData.itemName,
                amount: 1,
          })
        }
        setArrOfItems([...arrOfItemsUpdate])
    }
    else {
      setArrOfItems([
        ...arrOfItems,
        {
          CategoryName: savedData.CategoryName,
          CategoryId: savedData.CategoryId,
          arr: [
            {
              itemName: savedData.itemName,
              amount: 1,
            },
          ]
        }
      ])
    }
  };

  const addItemToListLogic = () => {
    if (!selectedCategory) {
      alert("הכנס קטגוריה");
      return;
    }
    if (!inputValue) {
      alert("הכנס שם");
      return;
    }
    addNewItem(
      {
      itemName: inputValue.trim(),
      CategoryId: selectedCategory.CategoryId,
      CategoryName: selectedCategory.CategoryName
    });
    resetPage();
  };

  const resetPage = () => {
    setSelectedCategory("");
    setInputValue("");
    inputComponentRef.current && inputComponentRef.current.resetInput();
  };
  const setNumItemsInList = ()=>{
    let num = 0;
    arrOfItems.forEach(catgory => { 
      catgory.arr.forEach(item=>{
        num += item.amount
      })
    });
return num
  }
  return (
    <>
      {arrOfCategorys ? (
        <>
          <div className="AddItems">
        <div className="containerAmonth">סך מוצרים : {setNumItemsInList()} </div>
            <div className="addNewItemInput">
              <InputComponent
                ref={inputComponentRef}
                placeHolder="שם מוצר"
                setValueFunc={setInputValue}
              />
            </div>
            <div className="categorySelectContainer">
              <h3>בחר קטגוריית מוצר:</h3>
              {arrOfCategorys.map((el) => (
                <button
                  key={"category_key_" + el.CategoryId}
                  className={`categoryBtnSelect img  ${el.class}_icon ${el.CategoryId === selectedCategory.CategoryId ? "selectedCategory" : ""
                    }`}
                  onClick={() => setCategoryIdClickHandler({ CategoryId: el.CategoryId, CategoryName: el.CategoryName })}
                >
                  <p>{el.CategoryName}</p>
                </button>
              ))}
            </div>
            <button className="addNewItemBtn" onClick={addItemToListLogic}>
              הוספה{" "}
            </button>
          </div>
        </>
      ) : (
        <LoadingPage/>
      )}
    </>
  );
};

export default AddItems;