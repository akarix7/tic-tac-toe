const Player = (name, piece, turn) => {
    const getName = () => name;
    const getPiece = () => piece;
    const getTurn = () => turn;
    const setTurn = () => {
        turn = !turn;
    }

    return {getName, getPiece, getTurn, setTurn};
}

const Gameboard = (() => {
    //let gameArr = [["x", "o", "x"], ["o", "x", "o"], ["x", "o", "x"]];
    //let gameArr = [["", "", ""], ["", "", ""], ["","",""]];
    let gameArr = new Array(3);
    let gameDiv = document.querySelector(".game");

    const init = () => {
        _createBoard();
        _render();
    }

    const getGameArr = () => gameArr;

    const _createBoard = () => {
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
            gameDiv.appendChild(cell);
        }
    }

    //last active cell that set off an event should change turns
    const _render = () => {
        let index = 0;
        for(let i = 0; i < 3; i++){
            gameArr[i] = new Array(3);
            for(let j = 0; j < 3; j++){
                // console.log(gameDiv.children.item(index).dataset.id);
                gameDiv.children.item(index++).addEventListener("click", (e) =>{
                    //gameArr[i][j] = "x";
                    gameArr[i][j] = GameController.getActivePlayer().getPiece();
                    //console.log(gameArr[i][j]);
                    e.target.textContent = gameArr[i][j];
                    //let active = gameDiv.closest("div").querySelector(".cell");
                    e.target.classList.add("marked");
                    e.target.removeEventListener("click", () => {

                    })
                    GameController.playRound();
                    console.log(gameArr)
                })
                //gameDiv.children.item(index++).textContent = gameArr[i][j];
            }
        }
        //console.log(gameArr);

    }
    return {
        init,
        getGameArr
    }
})();

const GameController = (() => {
    Gameboard.init();
    const playerOne = Player("Player One", "x", true);
    const playerTwo = Player("Player Two", "o", false);

    //let activePlayer = playerOne.getTurn() ? playerOne.getName() : playerTwo.getName();
    let activePlayer = playerOne;
    const switchTurns = () => {
        //activePlayer = playerOne.getTurn() ? playerTwo.getName() : playerOne.getName();
        activePlayer = playerOne.getTurn() ? playerTwo : playerOne;
        playerOne.setTurn();
        playerTwo.setTurn();
    }
    const getActivePlayer = () => activePlayer;

    //logic to play game
    const playRound = () => {
        switchTurns();
    }
    const setPiece = piece => {

    }
    return {
        getActivePlayer,
        playRound
    }
})();

// console.log(GameController.getActivePlayer());
// GameController.playRound();
// console.log(GameController.getActivePlayer());
// GameController.playRound();
// console.log(GameController.getActivePlayer());
// GameController.playRound();
// console.log(GameController.getActivePlayer());

