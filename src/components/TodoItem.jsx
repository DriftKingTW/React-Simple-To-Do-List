import React from 'react'
import '../style/TodoItem.css'
import FontAwesome from 'react-fontawesome' 

export default class TodoItem extends React.Component {
    
    constructor(props) {
        super(props)

        // Binding
        this.state = { value: this.props.todo.text }
        this.handleChange = this.handleChange.bind(this)
        this.modifyTodo = this.modifyTodo.bind(this)
        this.checkTodo = this.checkTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
    }

    handleChange(e) {
        // Sync input text and save to state
        this.setState({value: e.target.value})
        // Call modify function
        this.modifyTodo({id: this.props.id, text: e.target.value})

    }
    
    modifyTodo(todoText) {
        // Make sure that text fild isn't empty
        if(todoText.text.length > 0){
            this.props.modifyTodo(todoText)
        }

    }

    removeTodo(id, currentStatus) {
        // Call remove function
        this.props.removeTodo(id, currentStatus)

    }

    checkTodo(id, currentStatus){

        this.props.checkTodo(id, currentStatus)

    }

    render() {

        return(
            <div className={"todoWrapper grid-container todo-item-" + this.props.todo.isCompleted}>
                <button className="isCompleted" onClick={(e) => this.checkTodo(this.props.id, this.props.todo.isCompleted)}>
                    <span><FontAwesome className={'fa-check isCompelete '+ this.props.todo.isCompleted} name="isCompleted" size="2x"/></span>
                </button>
                <input className="todo-text" defaultValue={this.props.todo.text} onChange={this.handleChange} />
                <button className="remove-btn" name="remove-btn" onClick={(e) => this.removeTodo(this.props.id)}>
                    <span><FontAwesome className="fa-close" name="remove" size="2x"/></span>
                </button>
            </div>
        )

    }
}