import Block from './Block';
import React, { ReactNode } from 'react';
import { BLOCK_SIZE } from '../../constants';
import { Column } from '../../components/Layout';
import { Frame } from '../../components/Frame';
import { Tetromino } from '../../types';
import { useGameState } from './context/GameContext';

export default function NextBlock() {
    const { next } = useGameState();

    const strippedData: number[][] = next.data.filter(
        (l) => l.reduce((a, b) => a + b, 0) > 0
    );
    const strippedNext: Tetromino = {
        ...next,
        data: strippedData,
        size: { x: strippedData[0].length, y: strippedData.length },
    };

    return (
        <Frame>
            <Column>
                <svg
                    width={BLOCK_SIZE * strippedNext.size.x}
                    height={BLOCK_SIZE * strippedNext.size.y}
                >
                    {([] as ReactNode[]).concat(
                        strippedNext.data.map((line: number[], y: number) =>
                            line.map((value: number, x: number) => (
                                <Block
                                    key={`${x}_${y}`}
                                    transform={`translate(${x * BLOCK_SIZE} ${
                                        y * BLOCK_SIZE
                                    })`}
                                    value={value === 0 ? 9 : value}
                                />
                            ))
                        )
                    )}
                </svg>
            </Column>
        </Frame>
    );
}
