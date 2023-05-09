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
    let gameArr = new Array(3);
    let gameDiv = document.querySelector(".game");
    let containerDiv = document.querySelector(".container");

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
                gameDiv.children.item(index++).addEventListener("click", oneClick, {once: true});
                // gameDiv.children.item(index++).addEventListener("click", (e) => {
                //     gameArr[i][j] = GameController.getActivePlayer().getPiece();
                //     e.target.textContent = gameArr[i][j];
                //     e.target.classList.add("marked");
                //
                //     GameController.playRound();
                //     if(GameController.isGameOver()){
                //         displayWinner(GameController.getWinner());
                //         const cells = document.querySelectorAll(".cell");
                //
                //         cells.forEach(cell => {
                //             cell.removeEventListener("click", )
                //             //console.log(cell);
                //         })
                //     }
                //
                // }, {once: true})

                function oneClick(e) {
                    gameArr[i][j] = GameController.getActivePlayer().getPiece();
                    e.target.textContent = gameArr[i][j];
                    //let active = gameDiv.closest("div").querySelector(".cell");
                    e.target.classList.add("marked");
                    //e.target.removeEventListener("click", oneClick);

                    //console.log(e.target);
                    GameController.playRound();

                    if(GameController.isGameOver()){
                        displayWinner(GameController.getWinner());

                        //console.log(e.target.parentNode);
                        // for(let k = 0; k < 9; k++){
                        //     gameDiv.children.item(k).removeEventListener("click", oneClick);
                        //
                        //     //e.target.parentNode.children.item(k).removeEventListener("click", oneClick)
                        //     console.log(e.target.parentNode.children.item(k));
                        // }
                    }
                }

                //gameDiv.children.item(index++).textContent = gameArr[i][j];
            }
        }
    }
    const displayWinner = (winner) => {
        let divTitle = document.getElementById("title");
        divTitle.textContent = winner.getName() + " wins!";
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
    let isWinner = null;
    const _switchTurns = () => {
        //activePlayer = playerOne.getTurn() ? playerTwo.getName() : playerOne.getName();
        activePlayer = playerOne.getTurn() ? playerTwo : playerOne;
        playerOne.setTurn();
        playerTwo.setTurn();
    }
    const getActivePlayer = () => activePlayer;

    const _checkWinner = () => {
        let board = Gameboard.getGameArr();
        //rows
        for(let i = 0; i < 3; i++) {
            if (board[i][0] !== undefined && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                setWinner(getActivePlayer());
                console.log("row winner!");
            }
        }
        //columns
        for(let i = 0; i < 3; i++) {
            if (board[0][i] !== undefined && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                setWinner(getActivePlayer());
                console.log("column winner!!");
            }
        }
        //diagonal
        if (board[0][0] !== undefined && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
            setWinner(getActivePlayer());
            console.log("LTR diagonal");
        }
        if (board[0][2] !== undefined && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            setWinner(getActivePlayer());
            console.log("RTL diagonal");
        }
    }

    const setWinner = (player) => {
        isWinner = player;
    }

    const getWinner = () => isWinner;

    const isGameOver = () => {
        return getWinner() !== null;
    }

    //logic to play game
    const playRound = () => {
        _checkWinner();
        _switchTurns();
    }

    return {
        getActivePlayer,
        playRound,
        getWinner,
        isGameOver
    }
})();
