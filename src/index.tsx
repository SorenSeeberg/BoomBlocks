import * as React from 'react';
import { render } from 'react-dom';
import './styles.css';
import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Menu from './screens/menu/Menu';
import Game from './screens/game/Game';
import Settings from './screens/settings/Settings';
import { SettingsProvider } from './context/SettingsContext';

export type Routes =
    | '/'
    | '/settings'
    | '/game'
    | '/highscore'
    | '/about'
    | '/menu';

function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <SettingsProvider>
                    <GameProvider>
                        <Router>
                            <Switch>
                                <Route path="/" exact>
                                    <Redirect to="/menu" />
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
                        </Router>
                    </GameProvider>
                </SettingsProvider>
            </ThemeProvider>
        </div>
    );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
