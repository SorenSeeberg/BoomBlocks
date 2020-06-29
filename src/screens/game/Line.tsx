import React from 'react';
import { Column } from '../../components/Layout';
import { Frame } from '../../components/Frame';
import { H2, H3 } from '../../components/Text';
import { useGameState } from './context/GameContext';
import { ZERO_LINES } from '../../constants';

export function Line() {
    const { line } = useGameState();
    const lineString = line ? line.toString() : '';

    return (
        <Frame>
            <Column>
                <H3>LINE</H3>
                <H2>{ZERO_LINES.slice(lineString.length) + lineString}</H2>
            </Column>
        </Frame>
    );
}

export default Line;
