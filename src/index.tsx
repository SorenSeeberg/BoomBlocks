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
import { SettingsProvider } from "./context/SettingsContxt";
import { Background } from "./components/Background";

export type Routes =
  | "/"
  | "/settings"
  | "/game"
  | "/highscore"
  | "/about"
  | "/menu";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <SettingsProvider>
          <GameProvider>
            <Background>
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
            </Background>
          </GameProvider>
        </SettingsProvider>
      </ThemeProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
