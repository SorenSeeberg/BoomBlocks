import React, { ReactNode } from 'react';
import { Background } from '../../components/Background';

type GameLayoutProps = {
    header: ReactNode;
    line: ReactNode;
    level: ReactNode;
    score: ReactNode;
    highScore: ReactNode;
    nextBlock: ReactNode;
    blocks: ReactNode;
    footer: ReactNode;
};

export function GameLayout({
    header,
    line,
    level,
    score,
    highScore,
    nextBlock,
    blocks,
    footer,
}: GameLayoutProps) {
    return (
        <Background>
            <div className="grid">
                <div className="header">{header}</div>
                <div className="score">{score}</div>
                <div className="line">{line}</div>
                <div className="level">{level}</div>
                <div className="high-score">{highScore}</div>
                <div className="next-block">{nextBlock}</div>
                <div className="blocks">{blocks}</div>
                <div className="footer">{footer}</div>
                <style jsx>{`
                    .grid {
                        display: grid;
                        width: 100vw;
                        height: 100vh;
                        grid-template-columns: 1fr 160px 160px 320px 1fr;
                        grid-template-rows: 60px 1fr 90px 90px 550px 2fr 60px;
                        grid-template-areas:
                            'header header header header header'
                            ' . . . . . '
                            ' . line next-block score . '
                            ' . blocks blocks level . '
                            ' . blocks blocks high-score . '
                            ' . . . . . '
                            'footer footer footer footer footer';
                    }

                    .header {
                        grid-area: header;
                    }

                    .line {
                        grid-area: line;
                    }

                    .level {
                        grid-area: level;
                    }

                    .score {
                        grid-area: score;
                    }

                    .high-score {
                        grid-area: high-score;
                    }

                    .next-block {
                        grid-area: next-block;
                    }

                    .blocks {
                        grid-area: blocks;
                    }

                    .footer {
                        grid-area: footer;
                    }
                `}</style>
            </div>
        </Background>
    );
}
