import React, { ReactNode } from 'react';
import { useSettingsState } from '../context/SettingsContext';
import { Theme, useTheme } from '../context/ThemeContext';

export function Background({ children }: { children: ReactNode }) {
    const { themeName } = useSettingsState();
    const currentTheme: Theme = useTheme()[themeName];

    return (
        <div>
            {children}
            <style jsx>{`
                div {
                    background: ${currentTheme.background};
                }
            `}</style>
        </div>
    );
}
