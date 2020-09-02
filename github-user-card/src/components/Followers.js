import React, { Component } from 'react'
import styled from 'styled-components'

const P = styled.p `
  text-decoration: underline;
  color: red;
`

const Div = styled.div `
    border: 1px solid black;
`

const Img = styled.img `
    height: 20%;
    width: 20%;
`

class Followers extends Component {
    render(){
        return (
            <Div>
                <Img src={this.props.follower.avatar_url}/>
                <P key={this.props.follower.id} value={this.props.follower.login} onClick={this.props.onClick}>{this.props.follower.login}</P>
            </Div>
        )
    }
}

export default Followers