import React from 'react';
import { useSettingsState } from '../screens/settings/SettingsContext';
import { Theme, useTheme } from '../theme/ThemeContext';

type FrameProps = {
    width?: string;
    height?: string;
    children: React.ReactNode;
};

export function Frame({
    width = '100%',
    height = '100%',
    children,
}: FrameProps) {
    const { themeName } = useSettingsState();
    const theme: Theme = useTheme()[themeName];

    return (
        <div>
            {children}
            <style jsx>{`
                div {
                    width: ${width};
                    height: ${height};
                    box-shadow: inset 0 0 10px #00000070;
                    border: ${theme.window.border};
                    background: ${theme.window.background};
                    margin: 2px;
                }
            `}</style>
        </div>
    );
}

export default Frame;
