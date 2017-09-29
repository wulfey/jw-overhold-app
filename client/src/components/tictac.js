import React, { Component } from 'react';

// this is now the way to do it, you want to pass down a prop

//     constructor(props){
//     super(props)
//     this.state = {
//         screenIndex: 1,

//     }
// }
class TicTac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PLAYER_ONE_SYMBOL: 'X',
      PLAYER_TWO_SYMBOL: 'O',
      currentTurn: 'X',
      board: ['', '', '', '', '', '', '', '', ''],
      winner: null
    };
  }

  handleClick(index) {
    if (this.state.board[index] === '') {
      let temp = this.state.board;
      temp[index] = this.state.currentTurn;
      // this.state.board[index] = this.state.currentTurn
      this.setState({
        board: temp,
        currentTurn:
          this.state.currentTurn === this.state.PLAYER_ONE_SYMBOL
            ? this.state.PLAYER_TWO_SYMBOL
            : this.state.PLAYER_ONE_SYMBOL,
        winner: this.checkForWinner()
      });
      console.log(index);
    }
  }

  checkForWinner() {
    var currentTurn = this.state.currentTurn;
    var symbols = this.state.board;
    var winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winningCombos.find(function(combo) {
      if (
        symbols[combo[0]] !== '' &&
        symbols[combo[1]] !== '' &&
        symbols[combo[2]] !== '' &&
        symbols[combo[0]] === symbols[combo[1]] &&
        symbols[combo[1]] === symbols[combo[2]]
      ) {
        return currentTurn;
      } else {
        return false;
      }
    });
  }

  //

  render() {
    console.log(this.props);
    console.log(process.env);
    return (
      <div>
        <div className="wrapper-winner">
          {this.state.winner ? (
            <h2>{`The winner is ${this.state.winner}`}</h2>
          ) : null}
        </div>

        <div className="wrapper">
          <div onClick={() => this.handleClick(0)} className="box one">
            <h3>{this.state.board[0]}</h3>
          </div>
          <div onClick={() => this.handleClick(1)} className="box two">
            <h3>{this.state.board[1]}</h3>
          </div>
          <div onClick={() => this.handleClick(2)} className="box three">
            <h3>{this.state.board[2]}</h3>
          </div>
          <div onClick={() => this.handleClick(3)} className="box four">
            <h3>{this.state.board[3]}</h3>
          </div>
          <div onClick={() => this.handleClick(4)} className="box five">
            <h3>{this.state.board[4]}</h3>
          </div>
          <div onClick={() => this.handleClick(5)} className="box six">
            <h3>{this.state.board[5]}</h3>
          </div>
          <div onClick={() => this.handleClick(6)} className="box seven">
            <h3>{this.state.board[6]}</h3>
          </div>
          <div onClick={() => this.handleClick(7)} className="box eight">
            <h3>{this.state.board[7]}</h3>
          </div>
          <div onClick={() => this.handleClick(8)} className="box nine">
            <h3>{this.state.board[8]}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default TicTac;
// module.exports = Screen1;
