import React, { ReactNode } from 'react';

type JustifyContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right';

type AlignItems =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'base-line'
    | 'first'
    | 'end';

type FlexDirection = 'column' | 'row';

type FlexBox = {
    children: ReactNode;
    width?: string;
    height?: string;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
};

function FlexBox({
    children,
    width = '100%',
    height = '100%',
    justifyContent = 'center',
    alignItems = 'center',
    flexDirection
}: FlexBox & { flexDirection: FlexDirection }) {
    return (
        <div>
            {children}
            <style jsx>
                {`
                    div {
                        display: flex;
                        flex-direction: ${flexDirection};
                        justify-content: ${justifyContent};
                        align-items: ${alignItems};
                        align-content: ${alignItems};
                        width: ${width};
                        height: ${height};
                    }
                `}
            </style>
        </div>
    );
}

export function Row({
    children,
    width,
    height,
    justifyContent,
    alignItems
}: FlexBox) {
    return (
        <FlexBox
            flexDirection="row"
            width={width}
            height={height}
            justifyContent={justifyContent}
            alignItems={alignItems}
        >
            {children}
        </FlexBox>
    );
}

export function Column({
    children,
    width,
    height,
    justifyContent,
    alignItems
}: FlexBox) {
    return (
        <FlexBox
            flexDirection="column"
            width={width}
            height={height}
            justifyContent={justifyContent}
            alignItems={alignItems}
        >
            {children}
        </FlexBox>
    );
}
