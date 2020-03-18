import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      c: '',
      result: ''
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
      this.setState(prevState => ({
        result: data
      }), () => {
        console.log(this.state);
      });
    }));
  }

  render() {
    return (
        <div className={'app'}>
          <h1 className={'title'}>QUADRATIX</h1>
          <h2>Quadratic equation calculator</h2>
          <h3>Enter the multipliers at the form below</h3>
          <form onSubmit={this.handleSubmit}>
            <div className={'input'}>
              <input type="text" name="a" value={this.state.a} onChange={this.handleChange} />
            </div>
            <span>x</span>
            <span className={'exponent'}>2</span>
            <span>+</span>
            <div className={'input'}>
              <input type="text" name="b" value={this.state.b} onChange={this.handleChange} />
            </div>
            <span>x</span>
            <span>+</span>
            <div className={'input'}>
              <input type="text" name="c" value={this.state.c} onChange={this.handleChange} />
            </div>
            <span>= 0</span>
            <div className={'btn'}>
              <input type="submit" value="Вычислить" />
            </div>
          </form>
          <div>
            <h3>Result: {this.state.result.error ? <span>{this.state.result.error}</span> : <span>{this.state.result.x1} {this.state.result.x2}</span>}</h3>
          </div>
        </div>
    );
  }
}

export default App;
