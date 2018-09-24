import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class MainBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      boards: Array(9).fill(null),
      squares: Array(9).fill(Array(9).fill(null)),
      nextBox: 0,
    };
  }

  calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (square[line[0]] && square[line[0]] === square[line[1]] && square[line[0]] === square[line[2]]) {
      return square[line[0]];
    }
  }
  return null;
}

  findUltimateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (this.state.boards[line[0]]
        && this.state.boards[line[0]] === this.state.boards[line[1]]
        && this.state.boards[line[0]] === this.state.boards[line[2]]) {
        return this.state.boards[line[0]];
      }
    }
    return null;
  }

  handleClick(j, i) {
    console.log('handleClick' + j + ',' + i);
    console.log('next box = ' + this.state.nextBox);
    const square = this.state.squares.slice();
    if (this.findUltimateWinner() || square[j][i]) {
      console.log('first if 70');
      return;
    }
    if(!(j === this.state.nextBox) && !this.calculateWinner(square[this.state.nextBox])) {
      console.log('second if 74');
      return;
    } else if (j === this.state.nextBox && this.calculateWinner(square[this.state.nextBox])) {
      console.log('third if 77');
      return;
    }

    const part = this.state.squares[j].slice();
    part[i] = this.state.xIsNext ? 'X' : 'O';
    square[j] = part;
    this.setState(
      {squares: square,
      xIsNext: !this.state.xIsNext,
      nextBox: i });
    const winner = this.calculateWinner(square[j]);
    if (winner) {
      console.log('found winner!')
      const board = this.state.boards.slice();
      board[this.state.nextBox] = this.state.xIsNext ? 'X' : 'O';
      this.setState({boards: board});
    }
    console.log('clicked on ' + j + ',' + i);
  }

  renderSquare(j, i) {
    return <Square value={this.state.squares[j][i]}
    onClick={() => this.handleClick(j, i)} />;
  }

  renderBox(j) {
    const name = 'box' + j;
    return (
      <div className={name}>
        <div className="square-row">
          {this.renderSquare(j, 0)}
          {this.renderSquare(j, 1)}
          {this.renderSquare(j, 2)}
        </div>
        <div className="square-row">
          {this.renderSquare(j, 3)}
          {this.renderSquare(j, 4)}
          {this.renderSquare(j, 5)}
        </div>
        <div className="square-row">
          {this.renderSquare(j, 6)}
          {this.renderSquare(j, 7)}
          {this.renderSquare(j, 8)}
        </div>
      </div>
    );
  }

  render() {
    const winner = this.findUltimateWinner();
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board">
        <div className="board-row1">
          {this.renderBox(0)}
          {this.renderBox(1)}
          {this.renderBox(2)}
        </div>
        <div className="board-row2">
          {this.renderBox(3)}
          {this.renderBox(4)}
          {this.renderBox(5)}
        </div>
        <div className="board-row3">
          {this.renderBox(6)}
          {this.renderBox(7)}
          {this.renderBox(8)}
        </div>
        </div>
      </div>
    );

  }

}

export default MainBoard;
