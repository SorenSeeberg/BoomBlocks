import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import Game from "./components/Game";
import { GameProvider } from "./context/GameContext";
import { Row } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <GameProvider>
          <Row width="calc(100vw - 20px)" height="calc(100vh - 20px)">
            <Game />
          </Row>
        </GameProvider>
      </ThemeProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
