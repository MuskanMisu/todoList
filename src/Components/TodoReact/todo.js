import React, { useState , useEffect} from "react";
import "./style.css";

//Get the localStorage data back

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return[];
    }
}

const Todo = () => {

    const[inputData, setInputData] = useState("");
    const[items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const[toggleButton, setToggleButton] = useState(false);

    const addItem = () =>{
        if(!inputData){
            alert("Please fill the data");
        }
        else if (inputData && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id === isEditItem){
                        return{...curElem, name: inputData};
                    }
                    return curElem;
                })
            ); 
            setInputData("");
            setIsEditItem(null);  
            setToggleButton(false); 
        }

        else{

            const myNewInputData = {   //for giving new id to all the entered elements    
                id: new Date().getTime().toString(),
                name: inputData,
            };

            setItems([...items, myNewInputData]); 
            setInputData ("");  // whatever data is changed it will be erased from additem section and get reflected below 


        }
    };

    //Edit the items

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });

        setInputData(item_todo_edited.name);
        setIsEditItem(index);  
        setToggleButton(true); 
    };

    //Deleting items

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) =>{
            return curElem.id !== index;
        }); 
        setItems(updatedItems);
    };

    // Remove all the elements

    const removeAll = () => {
        setItems([]);
    };

    // Adding localStorage

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your List Here</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item "
              className="form-control"
              value={ inputData }
              onChange = { (event) => setInputData(event.target.value)}
            />
            {toggleButton ? (<i className="fa fa-regular  fa-edit" onClick={ addItem }></i>) : (<i className="fa fa-regular  fa-plus" onClick={ addItem }></i>)}
            
          </div>

           {/* Show our items          */}

          <div className="showItems">

            {items.map((curElem) => {
                return(
                    <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-regular  fa-edit" onClick={() => editItem(curElem.id)}></i>
                    <i className="far fa-regular  fa-trash-alt" onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                </div>
                );
            })}
                
          </div>

            {/* Remove all button */}

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
