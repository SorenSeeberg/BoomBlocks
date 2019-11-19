import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import { GameProvider } from "./context/GameContext";
import { Row, Column } from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Menu from "./screens/menu/Menu";
import Game from "./screens/game/Game";
import { GameTitle } from "./components/GameTitle";
import Settings from "./screens/settings/Settings";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <GameProvider>
          <Router>
            <Row
              width="100vw"
              height="calc(100vh - 20px)"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Column>
                <GameTitle />
                <Switch>
                  <Route path="/" exact>
                    <Menu />
                  </Route>
                  <Route path="/menu" exact>
                    <Menu />
                  </Route>
                  <Route path="/game" exact>
                    <Game />
                  </Route>
                  <Route path="/settings" exact>
                    <Settings />
                  </Route>
                </Switch>
              </Column>
            </Row>
          </Router>
        </GameProvider>
      </ThemeProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
