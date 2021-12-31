const gameboard = (() => {
    const boardState = ["", "","","","","","","","",];

    const create = () => {
        const pieces = document.querySelectorAll(".piece");
        console.log(pieces);

        let piecesIndex = 0;
        for (let piece of pieces) {
            piece.textContent = boardState[piecesIndex];
            console.log(isSpotOpen(piecesIndex));
            piecesIndex ++;
        }
    }

    const isSpotOpen = (index) => {
        if  (boardState[index] === "") return true;
        else return false;
    }

    const isThereAWinner = () => {

        //Check Rows 
        const pieces = document.querySelectorAll(".piece");
        

    }
    return {create};
})();

const game = () => {
    const startGame = () => {
        gameboard.create();
    }


    return {start};
}

const Player = (marker) => {

    const playTurn = (event) => {
        event.target.textContent = marker;
    }
    return {playTurn};
}

gameboard.create();