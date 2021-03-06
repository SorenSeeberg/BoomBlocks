import React, { useContext, createContext, Context, ReactNode } from 'react';

export type ThemeName = 'arcade' | 'soviet';

export type Theme = {
    tetroColors: string[];
    background: string;
    backgroundTopBar: string;
    window: { border: string; background: string };
    font: {
        baseText: {
            fontFamily: string;
            color: string;
            textShadow: string;
            transition: string;
        };
        size: {
            title: string;
            h1: string;
            h2: string;
            h3: string;
        };
        color: {
            titleColor: string;
            titleBorder: string;
        };
    };
    menuItem: {
        backgroundHover: string;
    };
};

function themeArcade(): Theme {
    const fontColor = '#ffc379';
    const borderColor = '#7598ca';

    //#8e1f85
    //#7979be

    return {
        tetroColors: [
            'black',
            'cyan',
            'blue',
            'orange',
            'yellow',
            'green',
            'purple',
            'red',
            'transparent',
        ],
        background: '#000C32',
        backgroundTopBar: 'purple',
        window: { border: `2px solid ${borderColor}`, background: '#023186' },
        font: {
            baseText: {
                fontFamily: '"VT323", monospace',
                color: fontColor,
                textShadow: '2px 5px 0 black',
                transition: 'font-size 1s',
            },
            size: { h1: '54px', h2: '45px', h3: '36px', title: '84px' },
            color: {
                titleColor: 'green',
                titleBorder: '1px white',
            },
        },
        menuItem: {
            backgroundHover: 'purple',
        },
    };
}

function themeSoviet(): Theme {
    const primaryColor = '#85ffc7';
    const borderColor = '#52635b';

    return {
        tetroColors: [
            'black',
            '#74ffc7',
            '#74ffc7',
            '#74ffc7',
            '#74ffc7',
            '#74ffc7',
            '#74ffc7',
            '#74ffc7',
            'transparent',
        ],
        background: '#020808',
        backgroundTopBar: '#051010',
        window: { border: `2px solid ${borderColor}`, background: '#051010' },
        font: {
            baseText: {
                fontFamily: '"Share Tech Mono", monospace',
                color: primaryColor,
                textShadow: '0 0 16px #00c372, 0 0 5px #00c372',
                transition: 'font-size 1s',
            },
            size: { title: '80px', h1: '50px', h2: '35px', h3: '28px' },
            color: { titleColor: primaryColor, titleBorder: `1px white` },
        },
        menuItem: {
            backgroundHover: `radial-gradient(circle, ${primaryColor}30 0%, ${primaryColor}00 100%)`,
        },
    };
}

export type Themes = {
    arcade: Theme;
    soviet: Theme;
};

const themes: Themes = { arcade: themeArcade(), soviet: themeSoviet() };
const ThemeContext: Context<Themes> = createContext<Themes>(themes);

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
    );
}

export function useTheme(): Themes {
    return useContext(ThemeContext);
}
