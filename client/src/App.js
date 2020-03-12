import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      c: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( {
      [name]: value
    }, () => {
      console.log(this.state);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      multipliers: {
        a: this.state.a,
        b: this.state.b,
        c: this.state.c
      }
    };
    console.log(data);
    fetch('/calculate', {
      method: 'POST',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json().then((data) => {
      console.log(data);
    }));
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label>
            A:
            <input type="text" name="a" value={this.state.a} onChange={this.handleChange} />
          </label>
          <label>
            B:
            <input type="text" name="b" value={this.state.b} onChange={this.handleChange} />
          </label>
          <label>
            C:
            <input type="text" name="c" value={this.state.c} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Отправить" />
        </form>
    );
  }
}

export default App;
