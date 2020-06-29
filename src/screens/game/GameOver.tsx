import React, { ReactNode } from 'react';
import { Frame } from '../../components/Frame';
import { H3 } from '../../components/Text';
import { Row } from '../../components/Layout';

type OverlayProps = {
    children: ReactNode;
};

function Overlay({ children }: OverlayProps) {
    return (
        <div>
            {children}
            <style jsx>{`
                div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    align-content: center;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
}

export default function GameOver() {
    return (
        <Overlay>
            <Frame width="260px" height="140px">
                <Row>
                    <H3>Game Over</H3>
                </Row>
            </Frame>
        </Overlay>
    );
}
