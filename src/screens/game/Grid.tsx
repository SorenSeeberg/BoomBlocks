import Block from './Block';
import Frame from '../../components/Frame';
import React, { ReactNode } from 'react';
import { BLOCK_SIZE, GRID_SIZE, HIDDEN_ROW_COUNT } from '../../constants';
import { Column } from '../../components/Layout';
import { LinesProps } from '../../types';

function Grid({ lines, activePiece }: LinesProps) {
    return (
        <Frame>
            <Column>
                <svg
                    width={BLOCK_SIZE * GRID_SIZE.x}
                    height={BLOCK_SIZE * GRID_SIZE.y}
                >
                    {([] as ReactNode[]).concat(
                        lines.map((line: number[], y: number) =>
                            line.map((value: number, x: number) => {
                                return y >= HIDDEN_ROW_COUNT ? (
                                    <Block
                                        key={`${x}_${y}`}
                                        transform={`translate(${x *
                                            BLOCK_SIZE} ${y * BLOCK_SIZE -
                                            HIDDEN_ROW_COUNT * BLOCK_SIZE})`}
                                        value={value}
                                    />
                                ) : (
                                    undefined
                                );
                            })
                        )
                    )}
                    {([] as ReactNode[]).concat(
                        activePiece.tetromino.data.map(
                            (line: number[], y: number) =>
                                line.map((value: number, x: number) => {
                                    return activePiece.position.y + y >=
                                        HIDDEN_ROW_COUNT ? (
                                        <Block
                                            key={`${activePiece.position.x +
                                                x}_${activePiece.position.y +
                                                y}`}
                                            transform={`translate(${(activePiece
                                                .position.x +
                                                x) *
                                                BLOCK_SIZE} ${(activePiece
                                                .position.y +
                                                y) *
                                                BLOCK_SIZE -
                                                HIDDEN_ROW_COUNT *
                                                    BLOCK_SIZE})`}
                                            value={value !== 0 ? value : 8}
                                        />
                                    ) : (
                                        undefined
                                    );
                                })
                        )
                    )}
                </svg>
            </Column>
        </Frame>
    );
}

export default Grid;
