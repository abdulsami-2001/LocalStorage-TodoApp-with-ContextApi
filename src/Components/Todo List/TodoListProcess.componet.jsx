import React, { Component } from 'react'
import {todoContext} from '../../ContextApi/index'
import Styles from './TodoList.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class TodoListProcess extends Component {

    // Recieving The State From Todo.Component.jsx
    static contextType = todoContext;

    render() {
        const todoList = this.context.todoList; 
        const changeItem = this.context.changeItem;
        const deleteItem = this.context.deleteItem;
        
        const result = todoList.map((item)=>{
            return(
                <div className={Styles.singleList} key={item.key} >
                    <p>
                        <input type="text" value={item.text} key={item.key} onChange={(e)=>changeItem(item.key,e)} />
                    </p>
                    <span>
                        <FontAwesomeIcon icon="trash" className={Styles.trashIcon} onClick={()=>deleteItem(item.key)} />
                    </span>
                </div>
            )
        })
        return(
            <div className={Styles.parent}>{result}</div>
        )
    }
}

