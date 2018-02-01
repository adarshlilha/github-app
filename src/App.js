import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userRepos : null
    }
  }

  getUserDetails = () => { 
    console.log(this.input.value);
    fetch(`https://api.github.com/users/adarshlilha/repos`)
      .then(data => data.json())
      .then(userData => {
        this.setState({
          userRepos: userData
        }, () => {
          console.log(this.state.userRepos)
        })
      });
  }

  clear = () => {
    this.setState({
      userRepos: null
    });
    this.input.value = "";
  }

  searchText = () => {
    let matchedData = this.state.userRepos.filter(userRepo => {
      let newRegex = RegExp(this.searchBox.value,'gi');
      return userRepo.name.match(newRegex);
    });
    return matchedData;
  }

  displayMatchesOnly = () => {
    let matchResults = this.searchText();
    let listOfMatched = matchResults.map(repoName => {
      return(
        <li>
          ${repoName.name}
        </li>
      );
    });
    console.log(listOfMatched);
  }

  render() {
    return (
      <div>
        <input type="text" ref={(t) => this.input = t}/>
        <button onClick={this.getUserDetails}>Go</button>
        <button onClick={this.clear}>Clear</button>
        <input type="text" 
        ref={(search) => this.searchBox = search}
        onKeyDown={this.displayMatchesOnly}/>
        <button>Clear</button>
        <ul ref={(ul) => this.ul = ul}>
          {this.state.userRepos && this.state.userRepos.map(userRepo => {
            return (
              <li>{userRepo.name}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
