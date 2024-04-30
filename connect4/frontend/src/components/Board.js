import React, { useState, useEffect } from "react";
import { Slot } from "./Slot";

export const Board = () => {
    let [board, setBoard] = useState([
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_']
    ]);

    let [currPlayer, setCurrPlayer] = useState('x');
    let [oppPlayer, setOppPlayer] = useState('o');
    let [victory, setVictory] = useState('_');
    let [gameOver, setGameOver] = useState(false);
    
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

    async function AIMove() {
        if (gameOver === false) {
            try {
                const data = await getAIMove(board, currPlayer).then(data => {
                    // Use the fetched data here
                    setBoard(data['nb'])
                    if (data['win'] === "True") {
                        setGameOver(true)
                        setVictory(currPlayer)
                    }
                })
                .catch(error => {
                    // Handle any errors
                    console.error('Error:', error);
                });
                        }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        if (!gameOver) {
            // Swap players
            const currPlayerCopy = currPlayer;
            currPlayer = oppPlayer;
            oppPlayer = currPlayerCopy;
            }
        }
    }

    

    async function handleClick(e) {
        const column = e.target.getAttribute('x');
        let row = board.findIndex((rowArr, index) => {
            return (rowArr[column] !== '_' || (index === board.length - 1));
        });
        if (row !== (board.length - 1)) row -= 1;
        if (board[row][column] !== '_') row -= 1;

        board[row][column] = currPlayer;

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
            if (flag === true) {
                setVictory(currPlayer)
                return
            }

        }
        catch (error) {
            console.error('Error fetching data:', error);
          }

        console.log(currPlayer)
          if (!gameOver) {
            // Swap players
            const currPlayerCopy = currPlayer;
            currPlayer = oppPlayer;
            oppPlayer = currPlayer;
        }


        AIMove()
        
    };


    return (
        <>
            {gameOver && (
                <h1>Game Over! {victory == 'x' ? 'Yellow' : 'Red'} Wins!</h1>
            )}
            <h2 id='title'>Connect 4</h2>
            <div id='board'
                onClick={gameOver ? null : (event) => { handleClick(event); ;}}
            >

                {board.map((row, i) => {
                    return row.map((ch, j) => <Slot ch={ch} y={i} x={j} />);
                })}
            </div>
        </>
    );
};