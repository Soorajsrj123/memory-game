import { useEffect, useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
const gameIcons = ["🗽", "🗼", "🤖", "👽", "👀", "🐵", "🐺", "🍉", "❄️"];

function App() {
  const [tries, setTries] = useState(40);
  const [pieces, setPieces] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  const startGame = () => {
    const duplicateGameIcons = [...gameIcons, ...gameIcons];
    // console.log(duplicateGameIcons);

    const newGameIcons = [];
    while (newGameIcons.length < gameIcons.length * 2) {
      const random = Math.floor(Math.random() * duplicateGameIcons.length);
      newGameIcons.push({
        emoji: duplicateGameIcons[random],
        fliped: false,
        solved: false,
        position: newGameIcons.length,
      });
      duplicateGameIcons.splice(random, 1);
    }

    setPieces(newGameIcons);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (icon) => {
    setTries((tries) => tries - 1);
    const flipedData = pieces.filter((data) => data.fliped && !data.solved);

    if (flipedData.length === 2) {
      return;
    }
    const newPieces = pieces.map((piece) => {
      if (piece.position === icon.position) {
        piece.fliped = !piece.fliped;
      }
      return piece;
    });
    setPieces(newPieces);
  };

  const gameLogicForFlipped = () => {
    // here we have two flipped icons
    const flippedData = pieces.filter((piece) => piece.fliped && !piece.solved);
    console.log(flippedData, "fliped data");
    if (flippedData.length === 2) {
      setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          // success
          setPieces(
            pieces.map((piece) => {
              if (
                piece.position === flippedData[0].position ||
                piece.position === flippedData[1].position
              ) {
                piece.solved = true;
              }
              return piece;
            })
          );
        } else {
          setPieces(
            pieces.map((piece) => {
              if (
                piece.position === flippedData[0].position ||
                piece.position === flippedData[1].position
              ) {
                piece.fliped = false;
              }
              return piece;
            })
          );
        }
      }, 800);
    }
  };

  const checkGameOver = () => {
    if (pieces.length > 0 && pieces.every((piece) => piece.solved)) {
      setGameComplete(true);
    }
  };

  useEffect(() => {
    gameLogicForFlipped();
    if (pieces.length > 0) {
      checkGameOver();
    }
  }, [pieces]);

  console.log(pieces, "ss");
  return (
    <>
      <main>
        <h2 className="animate-charcter">Memory Game</h2>
        <h5>tries:{tries}</h5>
        <div className="container">
          {pieces.map((icon, index) => (
            <div
              key={index}
              className={`flip-card ${icon.fliped ? "active" : ""} `}
              onClick={() => handleActive(icon)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front " />
                <div className="flip-card-back">{icon.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {/* completed animation */}
        {gameComplete && (
          <div className="completed">
            <h1>YOU WIN!!!!</h1>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
