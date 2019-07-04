import React from 'react';
import './App.css';
import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

import snoopAlbums from './snoopAlbums';
import rappers from './rappers';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const checkEmail = (email)=> emailRegex.test(email);


class App extends React.Component {

  state = {
    modalOpen: false,
    rapName: '',
    email: '',
    isEmailValid: false,
    albumSales: 1000,
    topAlbum: null,
    albumMenuOpen: false,
    startDate: null,
    topRapper: rappers[0],
  }

  setRapName = (event)=> {
    this.setState({
      rapName: event.target.value,
    })
  }

  setEmail = (event)=> {
    this.setState({
      email: event.target.value,
      isEmailValid: checkEmail(event.target.value),
    })
  }

  setAlbumSales = (event) => {
    this.setState({
      albumSales: Math.max(0, Number(event.target.value)),
    })
  }

  toggleModal = ()=>
    this.setState({
      modalOpen: !this.state.modalOpen,
    })

  toggleAlbumMenu = ()=>
    this.setState({
      albumMenuOpen: !this.state.albumMenuOpen,
    })

  selectAlbum = (album)=> this.setState({ topAlbum: album, albumMenuOpen: false })

  setStartDate = (date)=> this.setState({ startDate: date })

  setRapper = (rapper)=> this.setState({ topRapper: rapper })

  done = (event)=> {
    this.toggleModal();
    console.log('done applying, it\'s friday, now I got nothin to do');

    fetch('/submit', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rapName: this.state.rapName,
        email: this.state.email,
        albumSales: this.state.albumSales,
        topAlbum: this.state.topAlbum,
        startDate: this.state.startDate.getTime(),
      }),
    }).then(response => response.text())
      .then(responseText => console.log(responseText));
  }

  render(){
    const { rapName, email } = this.state;

    return (
      <div className="App">
        <div className='header'>
          <img src={this.state.topRapper.imgSrc}
               alt={this.state.topRapper.name}/>
          <ul className='hover-dropdown'>
            <li>{this.state.topRapper.name}</li>
            {
              rappers.map((rapper)=> (
                <li onClick={()=> this.setRapper(rapper)} key={rapper.name}>
                    {rapper.name}
                </li>
              ))
            }
          </ul>
        </div>
        <div className='form'>
          <div className='card swanky-input-container'>
            <label>
              <input value={rapName} onChange={this.setRapName} />
              <span className='title'>Rap Name</span>
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <input value={email} onChange={this.setEmail} />
              <span className='title'>Email</span>
              {
                (this.state.isEmailValid || this.state.email.length < 1) ? (null) : (
                  <span className='email-invalid'>Please enter a valid email</span>
                )
              }
            </label>
          </div>

          <div className='card swanky-input-container'>
            <label>
              <input type='number' step={100000}
                     value={this.state.albumSales} onChange={this.setAlbumSales} />
              <span className='title'>Album Sales</span>
            </label>
            <div className='goldRecords'>
            {
              [1,2,3,4,5,6]
              .filter(x => x*1000000 < this.state.albumSales)
              .map(n=> (
                <div className='goldRecord' key={n}>
                  <img src={goldRecord}/>
                </div>
              ))
            }
            </div>
          </div>

          <div className='card swanky-input-container'>
            <span className='title'>Top Album</span>
            <div className='album-dropdown-base' onClick={this.toggleAlbumMenu}>
              {this.state.topAlbum === null ? (
                <span>Select the best Snoop Album</span>
              ) : (
                <>
                 <img src={this.state.topAlbum.cover}
                      alt={this.state.topAlbum.name}/>
                 <span>{this.state.topAlbum.year}</span>
                 <span>{this.state.topAlbum.name}</span>
               </>
              )}
              <span className='dropdown-arrow'>
                    {this.state.albumMenuOpen ? '▲' : '▼'}
              </span>
            </div>
            {
              this.state.albumMenuOpen ? (
                <ul className='album-menu'>
                  {
                    snoopAlbums.map((album)=>(
                      <li key={album.name}
                          onClick={()=> this.selectAlbum(album)}>
                        <img src={album.cover}/>
                        <span>{album.year}</span>
                        <span>{album.name}</span>
                      </li>
                    ))
                  }
                </ul>
              ) : null
            }
          </div>

          <div className='card swanky-input-container'>
            <label>
              <DatePicker selected={this.state.startDate}
                          onChange={this.setStartDate} />
              <span className='title'>Start Date</span>
            </label>
          </div>


          <div className='done-container'>
            <button className='done-button' onClick={this.toggleModal}>Done</button>
          </div>
        </div>

        <div className={this.state.modalOpen ? 'modal-open' : 'modal-closed'}>
          <h2>Confirmation</h2>
          <p>are you sure you are ready with your application?</p>
          <button onClick={this.done}>Confirm!</button>
          <svg viewBox='0 0 100 100' className='x-button'
               onClick={this.toggleModal}>
            <circle cx={50} cy={50} r={47}/>
            <path d='M 30 30 L 70 70'/>
            <path d='M 70 30 L 30 70'/>
          </svg>
        </div>
        {this.state.modalOpen ? (
          <div className='modal-shade' onClick={this.toggleModal}/>
        ) : null}
      </div>
    );
  }
}





export default App;
