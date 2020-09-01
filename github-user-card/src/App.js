import React, { Component } from 'react';
import axios from 'axios'
import './App.css';


class App extends Component {
  state = {
    user: '',
    username: '',
    followers: '',
    error: ''
  }
  componentDidMount(){
    axios
      .get('https://api.github.com/users/kalvinzhao11')
      .then(response => {
        this.setState({user: response.data})
      })
      .catch(error => {
        this.setState({error: 'This user does not exist'})
      })
    axios
      .get('https://api.github.com/users/kalvinzhao11/followers')
      .then(response => {
        this.setState({followers: response.data})
      })
      .catch(error => {
        // this.setState({error: 'This user does not exist'})
      })

  }

  componentDidUpdate(prevProps, prevStates){
    if (prevStates.username !== this.state.username) {
      axios
        .get(`https://api.github.com/users/${this.state.username}`)
        .then(response => {
          this.setState({user: response.data})
          console.log(this.state.user)
        })
        .catch(error => {
          this.setState({error: 'This username does not exist'})
        })
    }
    axios
    .get(`https://api.github.com/users/${this.state.username}/followers`)
    .then(response => {
      this.setState({followers: response.data})
    })
    .catch(error => {
      // this.setState({error: 'This user does not exist'})
    })
  }

  onClick = (event) => {
    this.setState({username: event.target.innerText})
    console.log(event.target.value)
  }
  render() {
    console.log(this.state.user)
    return (
    <div class="card">
      <p>Github Card</p>
      <img src={this.state.user.avatar_url} />
      <div class="card-info">
        <h3 class="name">{this.state.user.name}</h3>
        <p class="username">{this.state.user.login}</p>
        <p>Location: {this.state.user.location}</p>
        <p>Profile:
          <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
        </p>
        <p>Followers: {this.state.user.followers}</p>
        {console.log(this.state.followers)}
        { 
          this.state.followers ? this.state.followers.map(follower => (
             <p key={follower.id} value={follower.login} onClick={this.onClick}>{follower.login}</p>
          )) : ''
        }
        <p>Following: {this.state.user.following}</p>
        <p>Bio: {this.state.user.bio}</p>
      </div>
    </div>
    )
  }
}

export default App;
