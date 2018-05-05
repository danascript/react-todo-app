import React from "react";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";

const uuid = require("uuid/v4");

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    const old = localStorage.getItem(this.props.storageKey);

    if (old) {
      this.state = JSON.parse(old);
    } else {
      this.state = {
        toDoItems: {}
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(this.props.storageKey, JSON.stringify(this.state));
  }
  // !!! The component with the state needs to have also the function to modify the state.
  // !!! You can't access the state from any other component. That's why we pass 'down' the props and then modify it 'up' again.

  state = {
    toDoItems: {}
  };

  addToDo = text => {
    this.setState(state => {
      const todo = {
        uuid: uuid(),
        text,
        done: false
      };
      state.toDoItems[todo.uuid] = todo;

      return state;
    });
  };

  toggleToDoDone = e => {
    const checkbox = e.target;
    this.setState(state => {
      state.toDoItems[checkbox.value].done = checkbox.checked;
      return state;
    });
  };

  removeToDo = uuid => {
    this.setState(state => {
      delete state.toDoItems[uuid];
      return state;
    });
  };

  changedInput = (e, uuid) => {
    const text = e.target.value;
    this.setState(state => {
      state.toDoItems[uuid].text = text;
      return state;
    });
  };

  render() {
    return (
      <div className="todo-list">
        <ToDoForm addToDo={this.addToDo} />
        <table className="todo-items table">
          <tbody>
            {Object.keys(this.state.toDoItems).map(uuid => (
              <ToDoItem
                // !! accessing the key is something React needs to access the item much faster!
                key={`todo-item-${uuid}`}
                data={this.state.toDoItems[uuid]}
                toggleToDoDone={this.toggleToDoDone}
                removeToDo={this.removeToDo}
                changedInput={this.changedInput}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ToDoList;
