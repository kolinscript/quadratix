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
          <h1 className={'title'}>QUADRATI<span>X</span></h1>
          <h2 className={'subtitle'}>Quadratic equation calculator</h2>
          <span className={'text'}>Enter the multipliers at the form below</span>
          <form onSubmit={this.handleSubmit}>
            <div className={'input'}>
                <input type="number" name="a" value={this.state.a} onChange={this.handleChange} />
            </div>
            <span>x</span>
            <span className={'exponent'}>2</span>
            <span>+</span>
            <div className={'input'}>
                <input type="number" name="b" value={this.state.b} onChange={this.handleChange} />
            </div>
            <span>x</span>
            <span>+</span>
            <div className={'input'}>
                <input type="number" name="c" value={this.state.c} onChange={this.handleChange} />
            </div>
            <span>= 0</span>
            <div className={'btn'}>
                <button type="submit">Calculate</button>
            </div>
          </form>
          <div className={'result text'}>
            <span>The result is:</span>
            {this.state.result.x1 && ( <span>x1 = <span className={'root'}> {this.state.result.x1}</span></span> )}
            {this.state.result.x2 && ( <span>x2 = <span className={'root'}> {this.state.result.x2}</span></span> )}
            {this.state.result.error && ( <span>{this.state.result.error}</span> )}
          </div>
          <footer>
            <div className={'social'}>
              <div className="link"><a className="github" href="https://github.com/kolinscript" target="_blank" rel="noopener noreferrer"></a></div>
              <div className="link"><a className="telega" href="https://t.me/nkoshkarov" target="_blank" rel="noopener noreferrer"></a></div>
              <div className="link"><a className="vk" href="https://vk.com/koshkarovnik" target="_blank" rel="noopener noreferrer"></a></div>
              <div className="link"><a className="instagram" href="http://instagram.com/kolinvision" target="_blank" rel="noopener noreferrer"></a></div>
            </div>
          </footer>
        </div>
    );
  }
}

export default App;
