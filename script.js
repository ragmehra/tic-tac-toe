const gameboard = (() => {
    const currentSetup = ["x", "x","O","x","x","O","x","x","O",];

    const create = () => {
        const pieces = document.querySelectorAll(".piece");
        console.log(pieces);

        let index = 0;
        for (let piece of pieces) {
            piece.textContent = currentSetup[index];
            index ++;
        }
    }
    return {create};
})();


const Player = (name) => {
    return {name}
}

gameboard.create();