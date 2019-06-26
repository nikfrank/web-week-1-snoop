import React from 'react';
import './App.css';
import emailRegex from './emailRegex';
import goldRecord from './goldRecord.png';

import snoopAlbums from './snoopAlbums';

const checkEmail = (email)=> emailRegex.test(email);


class App extends React.Component {

  state = {
    modalOpen: false,
    rapName: '',
    email: '',
    isEmailValid: false,
    albumSales: 1000,
    topAlbum: snoopAlbums[0],
    albumMenuOpen: false,
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

  done = (event)=> {
    this.toggleModal();
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
