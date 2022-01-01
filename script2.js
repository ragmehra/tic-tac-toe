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

const Player = (marker) => {
    this.marker = marker;

    const getMarker = () => {
        return marker;
    }

    return {getMarker};
}

const game = (() => {
    let turns = 0;
    const player1 = Player("X")
    const player2 = Player("O");

    const whoseTurnIsIt = () => {
        return turns % 2 === 0 ? player1.getMarker() : player2.getMarker();
    }

    const playTurn = (e) => {
        const marker = whoseTurnIsIt();
        console.log(marker);
        if (gameboard.isSpotOpen(e)) {
            e.target.textContent = marker;
            turns++;
            console.log(turns);
        }
        isThereAWinner();
        checkForDraw();
    }

    const start = () => {
        turns = 0;
        gameboard.create();
        setupListeners();
    }

    const setupListeners = () => {
        const pieces = document.querySelectorAll(".piece");
        console.log(pieces);
        pieces.forEach( (piece) => {
        piece.addEventListener("click", playTurn);
        });
    }

    const removeListeners = () => {
        const pieces = document.querySelectorAll(".piece");
        console.log(pieces);
        pieces.forEach( (piece) => {
        piece.removeEventListener("click", playTurn);
        });
    }

    const checkForDraw = () => {
        console.log(turns);
        if (turns === 9) {
            console.log("It's a tie!");
            removeListeners();
        }
    }

    const isThereAWinner = () => {
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
            removeListeners();
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
            removeListeners();
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
            removeListeners();
            return true;
        }
        else {
            console.log("Game Continues!");
            return false;
        }
    }
    return {setupListeners, start};
})();

const startButton = document.querySelector("#start");
startButton.addEventListener("click", game.start);