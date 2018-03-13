import React from 'react'
import '../style/TodoInput.css'
import FontAwesome from 'react-fontawesome' 

export default class TodoInput extends React.Component {

    constructor(props) {
        super(props)

        // Save input data
        this.state = {value: ""}

        // Binding
        this.handleChange = this.handleChange.bind(this)
        this.addTodo = this.addTodo.bind(this)

    }

    handleChange(e) {
        // Handle change and save to state
        this.setState({value: e.target.value})

    }

    addTodo(todo) {
        // Add data to todo list if string is not empty
        if(todo.length > 0){
            this.props.addTodo(todo)
            // Clear input field
            this.setState({value: ''})
        }

    }

    render() {

        return(
            <ul>
                <div className="todoWrapper grid-container-input">
                    <input className="input-text" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Do Something! =)" />
                    <button className="btn-add" onClick={() => this.addTodo(this.state.value)}>
                        <span><FontAwesome className="fa-plus" name="plus" size="2x"/></span>
                    </button>
                </div>
            </ul>
        )
        
    }
}