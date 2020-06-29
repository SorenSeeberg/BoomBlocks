import React from 'react';
import { useGameState } from './context/GameContext';
import { Theme, useTheme } from '../../theme/ThemeContext';
import { Row } from '../../components/Layout';
import { useSettingsState } from '../settings/SettingsContext';

type BarProps = {
    height?: string;
    index: number;
};

function Bar({ height = '100px', index }: BarProps) {
    const { themeName } = useSettingsState();
    const currentTheme: Theme = useTheme()[themeName];
    const colorIndex = index + 1;

    return (
        <div
            style={{
                height: height === '0px' ? '4px' : height,
                width: '30px',
                background: currentTheme.tetroColors[colorIndex],
                transition: 'height 0.35s ease',
            }}
        />
    );
}

export function TetroDistribution() {
    let highestValue = 0;
    const { statistics } = useGameState();

    for (let i = 0; i < statistics.length; i++) {
        if (statistics[i] > highestValue) {
            highestValue = statistics[i];
        }
    }

    const normalizedUnit = highestValue > 0 ? 100 / highestValue : 0;

    return (
        <Row alignItems="flex-end" justifyContent="space-evenly">
            {statistics.map((s, i) => (
                <Bar
                    key={i}
                    index={i}
                    height={
                        highestValue > 0 ? `${normalizedUnit * s}px` : '0px'
                    }
                />
            ))}
        </Row>
    );
}
