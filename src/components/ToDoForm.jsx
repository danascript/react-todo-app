import React, { Component, Fragment } from "react";

class ToDoForm extends Component {
  state = {
    error: ""
  };

  newItemText = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.clearError();
    const text = this.newItemText.current.value.trim();

    if (text.length === 0) {
      this.setError("The item cannot be empty!");
      return;
    }

    this.props.addToDo(text);
    e.currentTarget.reset();
  };

  setError = message => {
    this.setState(state => {
      state.error = message;
      return state;
    });
  };

  clearError = () => {
    this.setState(state => {
      state.error = "";
      return state;
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.error.length !== 0 && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        <form className="input-group my-3" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="text"
            placeholder="Add a new todo-item..."
            ref={this.newItemText}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              <i className="fa fa-plus" aria-hidden="true" /> &nbsp; Add Item
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default ToDoForm;
