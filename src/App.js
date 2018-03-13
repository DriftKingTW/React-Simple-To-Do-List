import React, { Component } from 'react'
import './style/App.css'
import TodoInput from './components/TodoInput.jsx'
import TodoItem from './components/TodoItem.jsx'


class App extends Component {

  constructor(props) {
    super(props)

    // Init todo list
    this.state = {
      todos: [
        {id: 0, text: "Eat some soil!", isCompleted: false, show: true},
        {id: 1, text: "Make soil great again!", isCompleted: false, show: true},
        {id: 2, text: "Steal some money!", isCompleted: false, show: true},
        {id: 3, text: "longgggggggggggggggggggggggggggggggggggggg!", isCompleted: false, show: true},
      ],
      //nextId: 0
      nextId: 4
    }

    // Binding
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.checkTodo = this.checkTodo.bind(this)
    this.modifyTodo = this.modifyTodo.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)

  }

  addTodo(todoText) {

    let todos = this.state.todos
    let nextId = this.state.nextId
    // Add data to todos array
    todos.push({id: nextId, text: todoText, isCompleted: false, show: true})
    // Update nextId
    this.setState({  nextId: nextId+1 })

  }

  modifyTodo(todoText) {

    let result = this.state.todos.map(todo => 
      // Find todo item id
      todo.id === todoText.id ?
      // Update data
      { ...todo, text: todoText.text } :
      // If id not match, return original data
      todo
    )
    this.setState({
      todos: result
    }, () => { console.log(this.state) })
    
  }

  checkTodo(id, currentStatus) {

    let status
    currentStatus ? status=false : status=true
    let result = this.state.todos.map(todo => todo.id === id ? { ...todo, isCompleted: status } : todo)
    this.setState({ todos: result })

  }

  removeTodo(id) {
    // Filter out matching id's todo data
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    })

  }

  clearCompleted() {
    // Filter out completed todos
    this.setState({
      todos: this.state.todos.filter((todo) => todo.isCompleted !== true)
    })

  }

  customizeFilter(arg){

    if(arg === 'Completed') {
      let result = this.state.todos.map(todo => 
        todo.isCompleted === false ? { ...todo, show: false  } : { ...todo, show: true  }
      )
      this.setState({ todos: result })
    }

    if(arg === 'Uncompleted') {
      let result = this.state.todos.map(todo => 
        todo.isCompleted === true ? { ...todo, show: false  } : { ...todo, show: true  }
      )
      this.setState({ todos: result })
    }

    if(arg === 'ShowAll') {
      let result = this.state.todos.map(todo => 
        todo.show === false ? { ...todo, show: true  } : todo
      )
      this.setState({ todos: result })
    }

  }

  render() {

    return (
      <div className="App">
        <div className="todo-wrapper">
          <h1>Todo List</h1>
          <TodoInput todoText="" addTodo={this.addTodo}/>

          <div className="control-bar">
            <input type="button" className="ctrl-btn cmp-only" value="Completed Only" onClick={(e) => this.customizeFilter('Completed')} />
            <input type="button" className="ctrl-btn uncmp-only" value="Uncompleted Only" onClick={(e) => this.customizeFilter('Uncompleted')} />
            <input type="button" className="ctrl-btn show-all" value="Show All Todos" onClick={(e) => this.customizeFilter('ShowAll')} />
            <input type="button" className="ctrl-btn clear-cmp" value="Clear Completed" onClick={(e) => this.clearCompleted()} />
          </div>

          <span className="hint">Hint: Click text to edit!</span>

          <ul>
            {
              this.state.todos.map((todo) => {
                if(todo.show === true)
                  return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo} checkTodo={this.checkTodo} modifyTodo={this.modifyTodo} />
                else
                  return ''
              })
            }
          </ul>
          
        </div>
      </div>
    )

  }
}

export default App
