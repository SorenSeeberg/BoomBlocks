import GameOver from './GameOver';
import Grid from './Grid';
import Level from './Level';
import Line from './Line';
import NextBlock from './NextBlock';
import React, { useEffect } from 'react';
import Score from './Score';
import Statistics from './Statistics';
import useEventListener from '../../util/useEventListener';
import { Footer } from '../../components/Footer';
import { GAME_INPUT_KEYS, GameInputKey } from '../../constants';
import { GameLayout } from './GameLayout';
import { GameState } from './context/types';
import { GameTitle } from '../../components/GameTitle';
import { useGameDispatch, useGameState } from './context/GameContext';
import { useHistory } from 'react-router-dom';

function Game() {
    const game: GameState = useGameState();
    const dispatch = useGameDispatch();
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'FRAME_STEP' });
        }, game.levelInfo.msPerFrame);
    }, [game.currentFrame, game.levelInfo.msPerFrame, dispatch]);

    useEffect(() => {
        if (game.pause) {
            history.push('/menu');
        }
    }, [game.pause, history]);

    function keyHandler({ key }: { key: string }) {
        if (GAME_INPUT_KEYS.includes(key as GameInputKey)) {
            dispatch({ type: 'KEY_DOWN', value: { key } });
        }
        // https://stackoverflow.com/questions/29069639/listen-to-keypress-for-document-in-reactjs
    }

    useEventListener('keydown', keyHandler);

    return (
        <>
            <GameLayout
                header={<GameTitle />}
                line={<Line />}
                level={<Level />}
                score={<Score />}
                highScore={<Statistics />}
                nextBlock={<NextBlock />}
                blocks={<Grid lines={game.grid} activePiece={game.active} />}
                footer={<Footer />}
            />
            {game.gameOver && <GameOver />}
        </>
    );
}

export default Game;
