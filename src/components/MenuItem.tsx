import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { useSettingsState } from '../screens/settings/SettingsContext';

type MenuItemProps = {
    children: ReactNode;
    linkTo?: string;
    displayValue?: string | number;
    onClick?: () => void;
    type?: 'link' | 'option';
};

export function MenuItem({
    children,
    linkTo,
    onClick,
    displayValue,
    type = 'link',
}: MenuItemProps) {
    const { themeName } = useSettingsState();
    const theme = useTheme()[themeName];
    return (
        <>
            {type === 'link' ? (
                <Link
                    to={linkTo as string}
                    style={{ textDecoration: 'none', width: '100vw' }}
                >
                    <button className="menu-item" onClick={onClick}>
                        {children}
                    </button>
                </Link>
            ) : (
                <button className="menu-item" onClick={onClick}>
                    <div
                        style={{
                            display: 'flex',
                            width: '500px',
                            justifyContent: 'flex-end',
                            paddingRight: '5px',
                        }}
                    >
                        {`${children}:`}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            width: '500px',
                            paddingLeft: '5px',
                        }}
                    >
                        {`[${displayValue}]`}
                    </div>
                </button>
            )}

            <style>
                {`
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80px;
        cursor: pointer;
        font-size: 30px;
        font-family: ${theme.font.baseText.fontFamily};
        text-shadow: ${theme.font.baseText.textShadow};
        color: ${theme.font.baseText.color};
        background: transparent;
        border: none;
        transition: color .25s, font-size .25s;
      }

      .menu-item:hover {
        font-size: 34px;
        color: white;
        outline: none;
        background: ${theme.menuItem.backgroundHover};
      }
     `}
            </style>
        </>
    );
}
