const Player = (name, piece, turn) => {
    const getName = () => name;
    const setName = (n) => {
        name = n;
    }
    const getPiece = () => piece;
    const getTurn = () => turn;
    const setTurn = () => {
        turn = !turn;
    }

    return {getName, setName, getPiece, getTurn, setTurn};
}

const GameBoard = (() => {
    let gameArr = new Array(3);
    let playersArr = [];
    const form = document.getElementById("names");
    const gameDiv = document.querySelector(".game");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");

    const init = () => {
        _displayForm();
        _handleForm();
        _createBoard();
        _render();
    }

    const _displayForm = () => {
        // gameDiv.style.transform = "scale(0)";
        gameDiv.style.visibility = "hidden";
        // gameDiv.style.display = "none";
    }

    const _displayGame = () =>{
        form.style.visibility = "hidden";
        gameDiv.style.visibility = "visible";
    }

    const getPlayersArr = () => playersArr;

    function _handleForm(){
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            playersArr.push(form.elements["one"].value);
            playersArr.push(form.elements["two"].value);
            GameController.createPlayer();
            _displayGame();
            _displayTurns(GameController.getActivePlayer());
        })
    }

    const getGameArr = () => gameArr;

    const _createBoard = () => {
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("button");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
            gameDiv.appendChild(cell);
        }
    }

    const _render = () => {
        let index = 0;
        for(let i = 0; i < 3; i++){
            gameArr[i] = new Array(3);
            for(let j = 0; j < 3; j++){
                // console.log(gameDiv.children.item(index).dataset.id);
                gameDiv.children.item(index++).addEventListener("click", oneClick, {once: true});

                function oneClick(e) {
                    gameArr[i][j] = GameController.getActivePlayer().getPiece();
                    e.target.textContent = gameArr[i][j];
                    //let active = gameDiv.closest("div").querySelector(".cell");
                    e.target.classList.add("marked");
                    //e.target.removeEventListener("click", oneClick);
                    GameController.playRound();
                    _displayTurns(GameController.getActivePlayer());

                    if(GameController.isGameOver()){
                        if(GameController.getTurnsLeft() !== 0) {
                            _displayWinner(GameController.getWinner());
                        }else{
                            _displayTie();
                        }
                        const cells = document.querySelectorAll(".cell");

                        cells.forEach(cell => {
                            cell.disabled = true;
                        })
                        _displayResetButton();
                        _hideTurns();

                    }
                }
            }
        }
    }
    const _displayWinner = (winner) => {
        let divTitle = document.getElementById("title");
        divTitle.textContent = winner.getName() + " wins!";
    }

    const _displayTie = () => {
        let divTitle = document.getElementById("title");
        divTitle.textContent = "It's a tie!";
    }

    const _displayResetButton = () => {
        if(!document.querySelector(".resetGame")) {
            let button = document.createElement("button");
            button.className = "resetGame";
            button.textContent = "Reset Game";
            button.addEventListener("click", () => {
                resetGame();
            })
            document.querySelector("body").appendChild(button);
        }else{
            document.querySelector(".resetGame").style.display = "";
        }
    }

    const resetGame = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                gameArr[i].pop();
            }
        }
        let divTitle = document.getElementById("title");
        divTitle.textContent = "Tic-Tac-Toe";

        const cells = document.querySelectorAll(".cell");

        cells.forEach(cell => {
            cell.disabled = false;
            cell.textContent = "";
            cell.classList.remove("marked");
        })
        GameController.resetGame();
        _render();
        document.querySelector(".resetGame").style.display = "none";
        _displayTurns(GameController.getActivePlayer());

    }

    const _displayTurns = (player) => {
        if(player.getPiece() === "x"){
            left.textContent = `${player.getName()}` + "'s turn ";
            right.textContent = "";
        }else{
            right.textContent = `${player.getName()}` + "'s turn ";
            left.textContent = "";
        }
    }

    const _hideTurns = () => {
        left.textContent = "";
        right.textContent = "";
    }

    return {
        init,
        getGameArr,
        getPlayersArr,
    }
})();

const GameController = (() => {
    GameBoard.init();
    let board = GameBoard.getGameArr();
    let players = GameBoard.getPlayersArr();
    let turnsLeft = 9;

    const playerOne = Player("Player One", "x", true);
    const playerTwo = Player("Player Two", "o", false);
    let activePlayer = playerOne;

    const createPlayer = () => {
        if(players[0] !== undefined && players[1] !== undefined){
            playerOne.setName(players[0]);
            playerTwo.setName(players[1]);
        }
    }

    let isWinner = null;
    const _switchTurns = () => {
        activePlayer = playerOne.getTurn() ? playerTwo : playerOne;
        playerOne.setTurn();
        playerTwo.setTurn();
    }
    const getActivePlayer = () => activePlayer;

    const _checkWinner = () => {
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
        return getWinner() !== null || getTurnsLeft() === 0;
    }

    const _counter = () => --turnsLeft;

    const getTurnsLeft = () => turnsLeft;

    const resetGame = () => {
        setWinner(null);
        turnsLeft = 9;
        activePlayer = playerOne;

        !playerOne.getTurn() ? playerOne.setTurn() : playerTwo.setTurn();
    }

    const playRound = () => {
        _counter();
        _checkWinner();
        _switchTurns();
    }

    return {
        createPlayer,
        getActivePlayer,
        playRound,
        getWinner,
        getTurnsLeft,
        isGameOver,
        resetGame
    }
})();
