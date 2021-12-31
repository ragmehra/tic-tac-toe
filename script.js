const gameboard = (() => {
    let boardState = ["0", "1","2","3","4","5","6","7","8"];

    const create = () => {
        resetBoard();
        const pieces = document.querySelectorAll(".piece");

        let piecesIndex = 0;
        for (let piece of pieces) {
            piece.textContent = boardState[piecesIndex];
            piecesIndex ++;
        }
    }

    const resetBoard = () => {
        boardState = ["", "", "", "", "", "", "", "", ""];
    }

    const isSpotOpen = (event) => {
        if  (event.target.textContent === "") return true;
        else return false;
    }

    
    return {create, isSpotOpen};
})();

const game = (() => {
    let turns = 0;
    let activeGame = false;

    const start = () => {
        turns = 0;
        activeGame = true;
        gameboard.create();
        let player1 = Player("X");
        let player2 = Player("O");
        setupTurnListeners(player1.playTurn);
        setupTurnListeners(player2.playTurn);
        player1.toggleTurn();
        return {player1, player2};
    }

    const end = () => {

    }

    const addTurn = () => {
        turns++;
    }

    const setupTurnListeners = (playTurn) => {
        const pieces = document.querySelectorAll(".piece");

        pieces.forEach( (piece) => {
            piece.addEventListener( "click", playTurn);
            piece.addEventListener("click", addTurn);
        })
    }

    //const removeTurnListeners = (playTurn)

    const checkForDraw = () => {
        console.log("Turns: " + turns);
        if (turns === 8) {
            console.log("It's a tie!");
            game.end();
        }
    }

    const isThereAWinner = (player) => {
        const pieces = document.querySelectorAll(".piece");

        //Check Rows
        if (pieces[0].textContent === pieces[1].textContent &&
                pieces[0].textContent === pieces[2].textContent &&
                pieces[0].textContent !== "" ||
                pieces[3].textContent === pieces[4].textContent &&
                pieces[3].textContent === pieces[5].textContent &&
                pieces[3].textContent !== "" || 
                pieces[6].textContent === pieces[7].textContent &&
                pieces[6].textContent === pieces[8].textContent &&
                pieces[6].textContent !== "") {
            console.log("Game Over!");
            game.end();
            return true;
        }
            
        //Check Columns
        else if (pieces[0].textContent === pieces[3].textContent &&
                pieces[0].textContent === pieces[6].textContent &&
                pieces[0].textContent !== "" ||
                pieces[1].textContent === pieces[4].textContent &&
                pieces[1].textContent === pieces[7].textContent &&
                pieces[1].textContent !== "" ||
                pieces[2].textContent === pieces[5].textContent &&
                pieces[2].textContent === pieces[8].textContent &&
                pieces[2].textContent !== "") {
            console.log("Game Over!");
            game.end();
            return true;
        }
        //Check Diagonals
        else if (pieces[0].textContent === pieces[4].textContent &&
                pieces[0].textContent === pieces[8].textContent && 
                pieces[0].textContent !== ""||
                pieces[2].textContent === pieces[4].textContent &&
                pieces[2].textContent === pieces[6].textContent &&
                pieces[2].textContent !== "") {
            console.log("Game Over!");
            game.end();
            return true;
        }
        else {
            console.log("Game Continues!");
            return false;
        }
    }


    return {start, turns, activeGame, isThereAWinner, checkForDraw, end};
})();

const Player = (marker) => {
    let myTurn = false;

    const getMarker = () => {
        return marker;
    }

    const getTurn = () => {
        return myTurn;
    }

    const playTurn = (event) => {
        if (gameboard.isSpotOpen(event) && myTurn) {
            event.target.textContent = marker;
            console.log("Suck my dick");
        }
        toggleTurn();
        game.isThereAWinner();
        game.checkForDraw();

    }

    const toggleTurn = () => {
        if (myTurn) myTurn = false;
        else myTurn = true;
    }

    return {playTurn, toggleTurn, getMarker, getTurn};
}

let players = game.start();
console.log(players);
console.log(game.turns);