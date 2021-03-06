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
    let ai = false;

    const whoseTurnIsIt = () => {
        return turns % 2 === 0 ? player1.getMarker() : player2.getMarker();
    }

    const playTurn = (e) => {
        const marker = whoseTurnIsIt();
        console.log(marker);
        if (gameboard.isSpotOpen(e)) {
            e.target.textContent = marker;
            turns++;
            updateTurnDisplay();
            console.log("Turns: ", turns);
        }
        if (isThereAWinner(marker)) return;
        checkForDraw();
        if (ai) aiTurn();
    }

    const aiTurn = () => {
        const pieces = document.querySelectorAll(".piece");
        const marker = whoseTurnIsIt();
        let randomSpot = Math.floor(Math.random() * 9);
        console.log("Random: ", randomSpot);

        if (pieces.item(randomSpot).textContent === "") {
            pieces.item(randomSpot).textContent = marker;
            turns++;
            updateTurnDisplay();
        }
        else {
            aiTurn();
        }
        isThereAWinner(marker);
        checkForDraw();
    }

    const aiSwitch = () => {
        const aiSwitch = document.querySelector("#aiSwitch");
        aiSwitch.addEventListener("click", () => {
            if (turns < 9) {
                if (aiSwitch.textContent === "Switch On AI") {
                    aiSwitch.textContent = "Switch Off AI";
                    ai = true;
                    aiTurn();
                }
                else if (aiSwitch.textContent === "Switch Off AI") {
                    aiSwitch.textContent = "Switch On AI";
                    ai = false;
                }
            }
        });
    }

    const updateTurnDisplay = () => {
        const marker = whoseTurnIsIt();
        const display = document.querySelector("#display");
        display.textContent = `Player ${marker}'s Turn!`;
    }

    const start = () => {
        turns = 0;
        gameboard.create();
        setupListeners();
        updateTurnDisplay();

    }

    const end = () => {
        removeListeners();
    }

    const setupListeners = () => {
        const pieces = document.querySelectorAll(".piece");
        pieces.forEach( (piece) => {
        piece.addEventListener("click", playTurn);
        });
    }

    const removeListeners = () => {
        const pieces = document.querySelectorAll(".piece");
        pieces.forEach( (piece) => {
        piece.removeEventListener("click", playTurn);
        });
    }

    const checkForDraw = () => {
        console.log("Turns: ",turns);
        if (turns === 9) {
            const display = document.querySelector("#display");
            display.textContent = "It's a tie!";
            console.log("It's a tie!");
            end();
        }
    }

    const isThereAWinner = (marker) => {
        const pieces = document.querySelectorAll(".piece");
        const display = document.querySelector("#display");

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
            display.textContent = `Player ${marker} Wins!`;
            end();
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
            display.textContent = `Player ${marker} Wins!`;
            end();
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
            display.textContent = `Player ${marker} Wins!`;
            end();
            return true;
        }
        else {
            console.log("Game Continues!");
            return false;
        }
    }
    return {start, aiSwitch};
})();

const startButton = document.querySelector("#start");
startButton.addEventListener("click", game.start);
game.aiSwitch();