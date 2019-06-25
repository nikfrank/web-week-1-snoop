import React from 'react';
import './App.css';
import emailRegex from './emailRegex';

const checkEmail = (email)=> emailRegex.test(email);


class App extends React.Component {

  state = {
    rapName: '',
    email: '',
    isEmailValid: false,
  }

  setRapName = (event)=> {
    this.setState({
      rapName: event.target.value
    })
  }

  setEmail = (event)=> {
    this.setState({
      email: event.target.value,
      isEmailValid: checkEmail(event.target.value),
    })
  }

  done = (event)=> {
    console.log('done applying, it\'s friday, now I got nothin to do');
  }

  render(){
    return (
      <div className="App">
        <div className='form'>
          <div className='card swanky-input-container'>
            <label>
              <input value={this.state.rapName} onChange={this.setRapName} />
              <span className='title'>Rap Name</span>
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <input value={this.state.email} onChange={this.setEmail} />
              <span className='title'>Email</span>
              {
                (this.state.isEmailValid || this.state.email.length < 1) ? (null) : (
                  <span className='email-invalid'>Please enter a valid email</span>
                )
              }
            </label>
          </div>

          <div className='done-container'>
            <button className='done-button' onClick={this.done}>Done</button>
          </div>
        </div>
      </div>
    );
  }
}





export default App;
