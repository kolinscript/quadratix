import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: {a: null, b: null, c: null}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Отправленное имя: ' + this.state.value);
    event.preventDefault();
    fetch('/calculate/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        multipliers: {
          a: this.state.value.a,
          b: this.state.value.b,
          c: this.state.value.c
        }
      }),
    }).then(res => console.log(res.json()));
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label>
            A:
            <input type="text" value={this.state.value.a} onChange={this.handleChange} />
          </label>
          <label>
            B:
            <input type="text" value={this.state.value.b} onChange={this.handleChange} />
          </label>
          <label>
            C:
            <input type="text" value={this.state.value.c} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Отправить" />
        </form>
    );
  }
}

export default App;
