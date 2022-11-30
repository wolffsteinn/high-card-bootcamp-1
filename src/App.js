import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class, which is React.component
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],

      //requires their values to be updated,
      //hence, they need to have a state
      player1Wins: 0,
      player2Wins: 0,
      roundWinner: null,
      playAgain: false,
    };
  }

  dealCards = () => {
    let newRoundWinner = null;
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    // twice to pop two cards out
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
      this.incrementPlayer1();
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
      this.incrementPlayer2();
    }

    // this.resetGame();

    // rmb this part is where you UPDATE the state
    this.setState({
      currCards: newCurrCards,
      roundWinner: newRoundWinner,
    });
  };

  incrementPlayer1 = () => {
    this.setState((prevPlayer1) => ({
      player1Wins: prevPlayer1.player1Wins + 1,
    }));
  };

  incrementPlayer2 = () => {
    this.setState((prevPlayer2) => ({
      player2Wins: prevPlayer2.player2Wins + 1,
    }));
  };

  overallWinner = () => {
    if (this.state.player1Wins > this.state.player2Wins) {
      console.log("player1 wins");
    } else if (this.state.player2Wins > this.state.player1Wins) {
      this.incrementPlayer2();
    }
  };

  resetGame = () => {
    console.log("done!");
    this.setState({
      playAgain: true,
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Wins: 0,
      player2Wins: 0,
    });
  };

  render() {
    //they destructured the object prop to directly use name and suit
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const thisRoundsWinner = this.state.roundWinner
      ? `player ${this.state.roundWinner} has won this round!`
      : "Its a tie!";

    const winnerAnnouncement = `player1 has won ${this.state.player1Wins} rounds, player2 has won ${this.state.player2Wins} rounds!`;

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          {thisRoundsWinner}
          <br />
          {winnerAnnouncement}
          <br />
          <button onClick={this.dealCards}>Deal</button>
          <button onClick={() => this.resetGame()}>Restart</button>
        </header>
      </div>
    );
  }
}

export default App;
