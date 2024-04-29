import React, { useState, useEffect } from "react";
import { Slot } from "./Slot";

export const Board = () => {
    const [board, setBoard] = useState([
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_']
    ]);

    const [currPlayer, setCurrPlayer] = useState('x');
    const [oppPlayer, setOppPlayer] = useState('o');
    const [gameOver, setGameOver] = useState(false);
    
    const updateBoard = (row, column, ch) => {
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
    };

    async function checkWin(b1, r, c, p) {
        const data1 = {
            board: b1,
            row: r,
            column: c,
            piece: p
        }
        try {
            const response = await fetch('win', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error('Error:', error);
              throw error;
            }
         
        }

    async function getAIMove(b1, p) {
        const data1 = {
            board: b1,
            piece: p
        }
        try {
            const response = await fetch('aimove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error('Error:', error);
              throw error;
            }
    }

    async function handleClick(e) {
        const column = e.target.getAttribute('x');
        let row = board.findIndex((rowArr, index) => {
            return (rowArr[column] !== '_' || (index === board.length - 1));
        });
        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '_') row -= 1;

        updateBoard(row, column, currPlayer);
        const boardCopy = board;
        boardCopy[row][column] = currPlayer;

        let flag = false
        try {
            const data = await checkWin(board, row, column, currPlayer).then(data => {
                // Use the fetched data here
                if (data["response"] ===  "True") {
                    flag = true
                }
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
            
            setGameOver(flag);
        }
        catch (error) {
            console.error('Error fetching data:', error);
          }



        if (!gameOver) {
            const currPlayerCopy = currPlayer;
            setCurrPlayer(oppPlayer);
            setOppPlayer(currPlayerCopy);
        }

        let move = 0
        try {
            const data = await getAIMove(board, currPlayer).then(data => {
                // Use the fetched data here
                move = Number(data["move"])
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
                    }
        catch (error) {
            console.error('Error fetching data:', error);
          }

        let column2 = move
        let row2 = board.findIndex((rowArr, index) => {
            return (rowArr[column] !== '_' || (index === board.length - 1));
        });
        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '_') row -= 1;
        updateBoard(row2, column2, currPlayer);

        try {
            const data = await checkWin(board, row, column, currPlayer).then(data => {
                // Use the fetched data here
                if (data["response"] ===  "True") {
                    flag = true
                }
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
            
            setGameOver(flag);
        }
        catch (error) {
            console.error('Error fetching data:', error);
          }

        if (!gameOver) {
            const currPlayerCopy = currPlayer;
            setCurrPlayer(oppPlayer);
            setOppPlayer(currPlayerCopy);
        }

    };


    return (
        <>
            {gameOver && (
                <h1>Game Over! {oppPlayer == 'x' ? 'Yellow' : 'Red'} Wins!</h1>
            )}
            <h2 id='playerDisplay'>{currPlayer === 'x' ? 'Yellow' : 'Red'} Move</h2>
            <div id='board'
                onClick={gameOver ? null : handleClick}
            >

                {board.map((row, i) => {
                    return row.map((ch, j) => <Slot ch={ch} y={i} x={j} />);
                })}
            </div>
        </>
    );
};