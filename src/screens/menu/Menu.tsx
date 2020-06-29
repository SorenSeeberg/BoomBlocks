import React from 'react';
import { MenuItem } from '../../components/MenuItem';
import { useGameState, useGameDispatch } from '../game/context/GameContext';
import { useSettingsState } from '../settings/SettingsContext';
import { MenuLayout } from '../../components/MenuLayout';
import { Footer } from '../../components/Footer';
import Frame from '../../components/Frame';
import { GameTitle } from '../../components/GameTitle';

export function Menu() {
    const { pause, gameOver } = useGameState();
    const gameDispatch = useGameDispatch();
    const settingsState = useSettingsState();

    return (
        <MenuLayout
            header={<GameTitle />}
            menu={
                <Frame>
                    {pause && !gameOver && (
                        <MenuItem
                            linkTo="/game"
                            onClick={() =>
                                gameDispatch({
                                    type: 'RESUME_GAME',
                                })
                            }
                        >
                            Resume Game
                        </MenuItem>
                    )}
                    <MenuItem
                        linkTo="/game"
                        onClick={() =>
                            gameDispatch({
                                type: 'NEW_GAME',
                                value: {
                                    settingsState:
                                        settingsState.displayStandard,
                                    startLevel: settingsState.startLevel,
                                    randomModel: settingsState.randomModel,
                                },
                            })
                        }
                    >
                        New Game
                    </MenuItem>
                    <MenuItem linkTo="/settings">Settings</MenuItem>
                    <MenuItem linkTo="/highscore">Highscore</MenuItem>
                    <MenuItem linkTo="/about">About</MenuItem>
                </Frame>
            }
            footer={<Footer />}
        />
    );
}

export default Menu;
