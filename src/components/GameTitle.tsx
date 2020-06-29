import React from 'react';
import { Title } from './Text';
import { useHistory } from 'react-router-dom';
import { useSettingsState } from '../screens/settings/SettingsContext';
import { useTheme } from '../theme/ThemeContext';

export function GameTitle() {
    const history = useHistory();
    const { pathname } = history.location;
    const { themeName } = useSettingsState();
    const theme = useTheme()[themeName];

    return (
        <div>
            <Title
                fontSize={
                    pathname === '/game'
                        ? theme.font.size.h1
                        : theme.font.size.title
                }
            >
                Boom Blocks
            </Title>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background: ${theme.backgroundTopBar};
                    transition: height 0.25s;
                }
            `}</style>
        </div>
    );
}
