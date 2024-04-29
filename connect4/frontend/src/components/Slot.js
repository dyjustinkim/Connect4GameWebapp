import React, { useEffect, useState } from 'react';
import { RedPiece } from "./RedPiece";
import { YellowPiece } from "./YellowPiece";

export const Slot = ({ ch, y, x }) => {

    return (
        <div className='slot' x={x} y={y}>
            {ch === 'x' && <YellowPiece />}
            {ch === 'o' && <RedPiece />}
        </div>
    );
};