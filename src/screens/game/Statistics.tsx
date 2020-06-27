import React from 'react';
import { Column } from '../../components/Layout';
import { TetroDistribution } from './TetroDistribution';
import { HighScores } from './HighScores';
import Frame from '../../components/Frame';

export default function Statistics() {
    return (
        <Frame>
            <Column alignItems="center" justifyContent="space-evenly">
                <TetroDistribution />
                <HighScores />
            </Column>
        </Frame>
    );
}
