// src/TodoBox.jsx
import React, { Component } from 'react';
import Item from './Item';

class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            newItemText: '',
        };
    }

    handleInputChange = (event) => {
        this.setState({ newItemText: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { newItemText } = this.state;
        if (newItemText.trim() !== '') {
            const newItem = {
                id: this.uniqueId(),
                text: newItemText,
            };
            this.setState((prevState) => ({
                items: [newItem, ...prevState.items],
                newItemText: '',
            }));
        }
    };

    handleRemove = (itemId) => {
        this.setState((prevState) => ({
            items: prevState.items.filter((item) => item.id !== itemId),
        }));
    };

    uniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        const { items, newItemText } = this.state;

        return (
            <div>
                <div className="mb-3">
                    <form className="d-flex" onSubmit={this.handleSubmit}>
                        <div className="me-3">
                            <input
                                type="text"
                                value={newItemText}
                                required
                                className="form-control"
                                placeholder="I am going..."
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            add
                        </button>
                    </form>
                </div>
                {items.map((item) => (
                    <Item key={item.id} task={item.text} onRemove={() => this.handleRemove(item.id)} />
                ))}
            </div>
        );
    }
}

export default TodoBox;
