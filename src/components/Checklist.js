import React, { useState, useEffect } from 'react';
import './styles.css';

/* Get the Local Storage Back even After Reloading*/

const getLocalData = () => {
    const lists = localStorage.getItem("MyCheckList");
    
    if(lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

export default function Checklist() {

  const [ inputdata, setInputData ] = useState("");
  const [ items, setItems ] = useState(getLocalData());
  const [ isEditItem, setIsEditItem ] = useState("");
  const [ toggleButton, setToggleButton ] = useState(false);


  /* Add the Items  */

  const addItem = () => {
      if(!inputdata) {
          alert("Error! Please Write Any Item and then Add Again.");
      } else if(inputdata && toggleButton) {
          setItems(
            items.map((curElem) => {
                if(curElem.id === isEditItem) {
                    return{...curElem, name: inputdata };
                }  return curElem;
            })  
          );

          setInputData("");
          setToggleButton(null);
          setIsEditItem(false);

      } else {
          const myNewInputData = {  //to make a New ID for Each Addition based on Timestamp
              id: new Date().getTime().toString(),
              name: inputdata,
          };
          setItems([...items, myNewInputData]); // adding element into items array
          setInputData(""); // resetting the value of Input data
      }
  };

  /* Delete the Items*/

  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
        return curElem.id !== index;    // Only return the Elements whose index does not matches with the Search
    });
    setItems(updatedItem);
  };

  /*  Edit any Item */

  const editItem = (index) => {
    const item_checklist_edited = items.find((curElem) => {
        return curElem.id === index;
    });
    setInputData(item_checklist_edited.name);
    setToggleButton(true);
    setIsEditItem(index);
  };

  /* Remove all the Items */

  const removeAll = () => {
      setItems([]);
  };

  /* Adding Local Storage to List */

  useEffect(() => {
      localStorage.setItem("MyCheckList", JSON.stringify(items));
  }, [items] );
    
  return <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt="Check List" />
                    <figcaption>Add your List Here ✌</figcaption>
                </figure>
                
                <div className="addItems">
                    <input type="text" placeholder="✍ Add Item" className="form-control"
                            value={ inputdata }
                            onChange={(e) => setInputData(e.target.value)}
                    />
                    {toggleButton ? (
                        <i className="fa fa-plus edit-btn" onClick={addItem}></i>
                    ) : (
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    )}
                </div>

                { /* Show all the Items that are Added */ }

                <div className="showItems">
                    {items.map((curElem) => {
                            return(
                                <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                    <i className='far fa-edit add-btn' onClick={() => editItem(curElem.id)}></i>
                                    <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                                </div>
                                </div>
                            );
                    })}

                    
                </div>

                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>

            </div>
            
        </div>
  
  </>;
}
