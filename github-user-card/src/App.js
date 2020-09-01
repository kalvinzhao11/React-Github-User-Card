import React, { Component } from 'react';
import axios from 'axios'
import GitHubCalendar from 'github-calendar'
import './App.css';


class App extends Component {
  state = {
    user: '',
    username: 'kalvinzhao11',
    followers: '',
    error: '',
    search: '',
  }
  componentDidMount(){
    axios
      .get('https://api.github.com/users/kalvinzhao11')
      .then(response => {
        this.setState({user: response.data})
        this.setState({error: ''})
      })
      .catch(error => {
        this.setState({error: 'This user does not exist'})
      })
    axios
      .get('https://api.github.com/users/kalvinzhao11/followers')
      .then(response => {
        this.setState({followers: response.data})
        this.setState({error: ''})
      })
      .catch(error => {
        this.setState({error: 'This user does not exist'})
      })

  }

  componentDidUpdate(prevProps, prevStates){
    if (prevStates.username !== this.state.username) {
      axios
        .get(`https://api.github.com/users/${this.state.username}`)
        .then(response => {
          this.setState({user: response.data})
          this.setState({error: ''})
        })
        .catch(error => {
          this.setState({error: 'This user does not exist'})
        })
      axios
        .get(`https://api.github.com/users/${this.state.username}/followers`)
        .then(response => {
          this.setState({followers: response.data})
          this.setState({error: ''})
        })
        .catch(error => {
          this.setState({error: 'This user does not exist'})
        })
    }
  }

  onClick = (event) => {
    this.setState({username: event.target.innerText})
  }

  onChange = (event) => {
    this.setState({search: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      username: this.state.search,
      search: ''
    })
  }

  // GitHubCalendar(".calendar", "kalvinzhao11");

  render() {
    return (
    <div class="card">
      <p>Github Card</p>
      <form onSubmit={this.onSubmit}>
        <label>Search Github User: </label>
        <input
          value={this.state.search}
          onChange={this.onChange}
        ></input>
        <button>Search</button>
      </form>
      { this.state.error ? <p>{this.state.error}</p> : <p></p>}
      <img src={this.state.user.avatar_url} />
      <div class="card-info">
        <h3 class="name">{this.state.user.name}</h3>
        <p class="username">{this.state.user.login}</p>
        <p>Location: {this.state.user.location}</p>
        <p>Profile:
          <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
        </p>
        <p>Followers: {this.state.user.followers}</p>
        { 
          this.state.followers ? this.state.followers.map(follower => (
             <p key={follower.id} value={follower.login} onClick={this.onClick}>{follower.login}</p>
          )) : ''
        }
        <p>Following: {this.state.user.following}</p>
        <p>Bio: {this.state.user.bio}</p>
      </div>

      <div class="calendar">
      </div>

    </div>
    )
  }
}

export default App;
