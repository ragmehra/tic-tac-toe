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
        }
        
    }

    const setupListeners = () => {
        const pieces = document.querySelectorAll(".piece");
        console.log(pieces);
        pieces.forEach( (piece) => {
        piece.addEventListener("click", playTurn);
        });
    }
    
    return {setupListeners};
})();

gameboard.create();
game.setupListeners();