import React, { Component } from 'react';
import axios from 'axios'
import GitHubCalendar from 'github-calendar'
import { Button, Input } from 'reactstrap';
import styled from 'styled-components'
import './App.css';
import Followers from './components/Followers';

const Div = styled.div `
  text-align: center;
`

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

  render() {
    GitHubCalendar(".calendar", `${this.state.username}`);

    return (
    <Div class="card">
      <form onSubmit={this.onSubmit}>
        <label>Search Github User: </label>
        <Input
          value={this.state.search}
          onChange={this.onChange}
        ></Input>
        <Button outline color="warning">Search</Button>
      </form>
      { this.state.error ? <p>{this.state.error}</p> : <p></p>}
      <img src={this.state.user.avatar_url} />
      <div class="card-info">
        <h3 class="name">{this.state.user.name}</h3>
        <p class="username">{this.state.user.login}</p>
        <p>Location: {this.state.user.location ? this.state.user.location : 'N/A'}</p>
        <p>Profile:
          <a href={this.state.user.html_url}>{this.state.user.html_url}</a>
        </p>
        <p>Followers: {this.state.user.followers}</p>
        <h4>Followers</h4>
        { 
          this.state.followers ? this.state.followers.map(follower => (
            <Followers follower={follower} onClick={this.onClick}/>
          )) : ''
        }
        <p>Following: {this.state.user.following}</p>
        <p>Bio: {this.state.user.bio ? this.state.user.bio : 'N/A'}</p>
      </div>

      <div class="calendar">
      </div>

    </Div>
    )
  }
}

export default App;
