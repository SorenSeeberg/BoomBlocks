import React, { ReactNode } from 'react';
import { useTheme, Theme } from '../theme/ThemeContext';
import { useSettingsState } from '../screens/settings/SettingsContext';

type Header = {
    children: ReactNode;
    padding?: string;
};

type Title = Header & { fontSize: string };

export function Title({ children, fontSize, padding = '0px' }: Title) {
    const { themeName } = useSettingsState();
    const currentTheme: Theme = useTheme()[themeName];
    return (
        <div
            style={{
                ...currentTheme.font.baseText,
                color: currentTheme.font.color.titleColor,
                WebkitTextStroke: currentTheme.font.color.titleBorder,
                fontSize,
                padding,
                transition: 'font-size .5s',
            }}
        >
            {children}
        </div>
    );
}

export function HeaderInternal({
    children,
    size,
    padding,
}: Header & { size: 'h1' | 'h2' | 'h3' }) {
    const { themeName } = useSettingsState();
    const currentTheme: Theme = useTheme()[themeName];
    return (
        <div
            style={{
                ...currentTheme.font.baseText,
                fontSize: currentTheme.font.size[size],
                padding,
            }}
        >
            {children}
        </div>
    );
}

export function H1({ children, padding = '0px' }: Header) {
    return (
        <HeaderInternal size="h1" padding={padding}>
            {children}
        </HeaderInternal>
    );
}

export function H2({ children, padding = '0px' }: Header) {
    return (
        <HeaderInternal size="h2" padding={padding}>
            {children}
        </HeaderInternal>
    );
}

export function H3({ children, padding = '0px' }: Header) {
    return (
        <HeaderInternal size="h3" padding={padding}>
            {children}
        </HeaderInternal>
    );
}
