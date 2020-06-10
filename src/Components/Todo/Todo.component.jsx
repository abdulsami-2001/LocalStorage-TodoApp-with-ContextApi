import React,{useState} from 'react'
import {Provider} from '../../ContextApi/index';
import Styles from './Todo.module.css'
import MiddleMan1 from '../MiddleMans/MiddleMan1.componet'
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faTrash)

const Todo = () => {

    // Checking Local Storage... If it's null
    // then error occurs.. So Setting Local
    // Storage
    
    if(JSON.parse(localStorage.getItem("todoList")) === null){
        localStorage.setItem('todoList',JSON.stringify([]))
    }

    const localStorageItems = JSON.parse(localStorage.getItem("todoList"))

    
    // Initializing State

    const [todo, setTodo] = useState({
        todoList: [...localStorageItems], 
        todoItem: {
            key: "",                      
            text: ""                      
        }        
    })


    // Function That Handle Input.
    // Setting The State. TodoItem Obj
    // Now Have A Value

    const handleChange = (e) => {
        setTodo({
            ...todo,
            todoItem: {
                key: Date.now(),
                text: e.target.value
            }
        })
    }

    // Function That Handle Submit of Todo.
    // Setting The State, Now TodoList
    // Array is Not Empty.

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const todoItem = todo.todoItem;
        const todoList = todo.todoList;
        
        if(todoItem.text !== ""){
           
            setTodo({
                todoList: [...todoList,todoItem], 
                todoItem: {
                    key: "",
                    text: ""
                }  
            })        
          
            localStorage.setItem("todoList", JSON.stringify([...todoList, todoItem]) )
          
        }
    }

    // Function That Allows Us To Change The 
    // Todo Value.

    const changeItem = (key,e) => {
        
        const todoList = todo.todoList;
        
        for(let obj of todoList){
            
            if(obj.key === key){
                
                obj.text = e.target.value;
                
                setTodo({
                    todoList: todoList,
                    todoItem: {
                        key: "",
                        text: ""
                    }        
                })

                localStorage.setItem('todoList', JSON.stringify(todo.todoList))
                
            }   
        }
    }

    // Function That Allow's Us To Delete A
    // Todo Item

    const deleteItem = (key) => {
        
        const todoList = todo.todoList; 
        const remainingItem = todoList.filter((item)=> item.key!==key)
        
        setTodo({
            todoList: remainingItem,
            todoItem: {
                key: "",
                text: ""
            }
        })

        localStorage.setItem('todoList', JSON.stringify(remainingItem))
    }

    // This Is The Obj, That We Send Through
    // The Context Api.
    // It Consist Of The Array Of Todo Items,
    // Function That Change The Single Todo Item,
    // Function That Delete The Single Todo Item.

    const data = {  
        todoList: todo.todoList, 
        changeItem: changeItem, 
        deleteItem: deleteItem
    }

    return (
        <>
            <header className={Styles.card} >

                <form onSubmit={handleSubmit}  >
                    <input type="text" className={Styles.inputField}  placeholder="Enter Todo..." value={todo.todoItem.text} onChange={handleChange}/>
                    <button type="submit" className="addButton">Add</button>
                </form>

                {/* Providing State To The All Of The Remaining Components */}

                <Provider value={data} >
                    <MiddleMan1/>
                </Provider>

            </header>
        </>
    )
}

export default Todo
