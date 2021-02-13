import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

let freeSquares = 16;
let totalSquares = 16;
let boardWidth = 4;

class Square extends React.Component {
  render() {
    return (
      <div className="square" id="square">{this.props.value}</div>
    );
  }
}

class GameBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      values: [],
    };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    let constructorValues = new Array(16);
    this.setState({values: constructorValues});
    window.addEventListener("keydown", this.onKeyPress);
    this.setRandomSquare(); 
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }

  setRandomSquare() {
    let boardCopy = this.state.values;

    console.log("Board Copy" + boardCopy);

    // If there are no free squares then don't generate an index
    if (freeSquares === 0) {
      return;
    }

    // Generate an index of the board that is even distributed between all the free squares
    let randomIndex = Math.round(Math.random() * (freeSquares - 1) + 1);

    // Choose randomly between 2 and 4
    let randomNumber = Math.round(Math.random());
    if (randomNumber === 0) {
      randomNumber = 2;
    }
    else {
      randomNumber = 4;
    }

    // Traverse the array to evenly place the psudeo random value. 
    for (let i = 0; i < totalSquares; i++) {
      console.log(i + " " + randomIndex);
      if (boardCopy[i] === undefined) {
        randomIndex -= 1;
      }
      if (randomIndex === 0) {
        boardCopy[i] = randomNumber;
        break;
      }
    }
    freeSquares = freeSquares - 1;

    // Set state to render
    this.setState(
      {
        values: boardCopy,
      }
    )
  }

  onKeyPress(event) {
    this.setRandomSquare();
  }

  renderSquare(i) {
    console.log("renderSquare(" + i + ")");
    return <Square value={i} />;
  }

  render() {

    return (
      <div className="board" onKeyPress={this.onKeyPress}>
        <div className="row">
          {this.renderSquare(this.state.values[0])}
          {this.renderSquare(this.state.values[1])}
          {this.renderSquare(this.state.values[2])}
          {this.renderSquare(this.state.values[3])}
        </div>
        <div className="row">
          {this.renderSquare(this.state.values[4])}
          {this.renderSquare(this.state.values[5])}
          {this.renderSquare(this.state.values[6])}
          {this.renderSquare(this.state.values[7])}
        </div>
        <div className="row">
          {this.renderSquare(this.state.values[8])} 
          {this.renderSquare(this.state.values[9])}
          {this.renderSquare(this.state.values[10])}
          {this.renderSquare(this.state.values[11])}
        </div>
        <div className="row">
          {this.renderSquare(this.state.values[12])}
          {this.renderSquare(this.state.values[13])}
          {this.renderSquare(this.state.values[14])}
          {this.renderSquare(this.state.values[15])}
        </div>
      </div>

    );
  }
}   

const App = (props) => {
  return (
    <GameBoard />
  )
}

ReactDOM.render(
  App(),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
