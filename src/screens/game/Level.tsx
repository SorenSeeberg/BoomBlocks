import React from 'react';
import { useGameState } from '../../context/GameContext';
import { Column } from '../../components/Layout';
import { H2, H3 } from '../../components/Text';
import { Frame } from '../../components/Frame';

export default function Level() {
    const { levelInfo } = useGameState();

    return (
        <Frame>
            <Column>
                <H3>Level</H3>
                <H2>{levelInfo.level}</H2>
            </Column>
        </Frame>
    );
}
