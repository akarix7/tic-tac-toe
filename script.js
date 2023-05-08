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
                gameDiv.children.item(index++).addEventListener("click", oneClick);

                function oneClick(e) {
                    gameArr[i][j] = GameController.getActivePlayer().getPiece();
                    e.target.textContent = gameArr[i][j];
                    //let active = gameDiv.closest("div").querySelector(".cell");
                    e.target.classList.add("marked");
                    e.target.removeEventListener("click", oneClick);

                    console.log(e);
                    GameController.playRound();
                }
                //gameDiv.children.item(index++).textContent = gameArr[i][j];
            }
        }
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
    const _switchTurns = () => {
        //activePlayer = playerOne.getTurn() ? playerTwo.getName() : playerOne.getName();
        activePlayer = playerOne.getTurn() ? playerTwo : playerOne;
        playerOne.setTurn();
        playerTwo.setTurn();
    }
    const getActivePlayer = () => activePlayer;

    const _checkWinner = () => {
        let board = Gameboard.getGameArr();
        console.log(board[0][0] === board[0][1] === board[0][2]);
        //rows
        for(let i = 0; i < 3; i++) {
            if (board[i][0] !== undefined && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                console.log("row winner!");
            }
        }
        //columns
        for(let i = 0; i < 3; i++) {
            if (board[0][i] !== undefined && board[0][i] === board[1][i] && board[1][i] === board[2][0]) {
                console.log("column winner!!");
            }
        }
        //diagonal
        if (board[0][0] !== undefined && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
            console.log("LTR diagonal");
        }
        if (board[0][2] !== undefined && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            console.log("RTL diagonal");
        }

        console.log(board);
    }

    //logic to play game
    const playRound = () => {
        _checkWinner();
        _switchTurns();
    }
    const setPiece = piece => {

    }
    return {
        getActivePlayer,
        playRound
    }
})();
