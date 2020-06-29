import React from 'react';
import { BlockProps } from '../../types';
import { Theme, useTheme } from '../../theme/ThemeContext';
import { BLOCK_SIZE } from '../../constants';
import { useSettingsState } from '../settings/SettingsContext';

export default function Block({ transform, value }: BlockProps) {
    const { themeName } = useSettingsState();
    const currentTheme: Theme = useTheme()[themeName];

    return (
        <rect
            transform={transform}
            width={BLOCK_SIZE}
            height={BLOCK_SIZE}
            stroke={![8, 0].includes(value) ? 'black' : 'transparent'}
            fill={currentTheme.tetroColors[value]}
        />
    );
}
