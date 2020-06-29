import React from 'react';
import { Frame } from '../../components/Frame';
import { H1, H3 } from '../../components/Text';
import { Row } from '../../components/Layout';
import { useGameState } from './context/GameContext';
import { useWindowSize } from '../../util/useWindowSize';
import { ZERO_SCORE } from '../../constants';

export default function Score() {
    const { scoreDisplay } = useGameState();
    const scoreString: string = scoreDisplay.toString();
    const windowSize = useWindowSize();
    return (
        <Frame>
            <Row>
                <div
                    style={{
                        letterSpacing: '4px',
                    }}
                >
                    {(windowSize.width as number) > 768 ? (
                        <H1>
                            {ZERO_SCORE.slice(scoreString.length) + scoreString}
                        </H1>
                    ) : (
                        <H3>
                            {ZERO_SCORE.slice(scoreString.length) + scoreString}
                        </H3>
                    )}
                </div>
            </Row>
        </Frame>
    );
}
