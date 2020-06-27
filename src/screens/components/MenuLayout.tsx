import React, { ReactNode } from 'react';
import { Background } from '../../components/Background';

type MenuLayoutProps = {
    header: ReactNode;
    menu: ReactNode;
    footer: ReactNode;
};

export function MenuLayout({ header, menu, footer }: MenuLayoutProps) {
    return (
        <Background>
            <div className="grid">
                <div className="header">{header}</div>
                <div className="menu">{menu}</div>
                <div className="footer">{footer}</div>
                <style jsx>{`
                    .grid {
                        display: grid;
                        width: 100vw;
                        height: 100vh;
                        grid-template-columns: 1fr 500px 1fr;
                        grid-template-rows: 140px 1fr 400px 1fr 60px;
                        grid-template-areas:
                            'header header header '
                            ' . . . '
                            ' . menu . '
                            ' . . . '
                            'footer footer footer ';
                    }

                    .header {
                        grid-area: header;
                    }

                    .menu {
                        grid-area: menu;
                    }

                    .footer {
                        grid-area: footer;
                    }
                `}</style>
            </div>
        </Background>
    );
}
