const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;

    return {getName, getPiece};
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

    const _render = () => {
        let index = 0;
        for(let i = 0; i < 3; i++){
            gameArr[i] = new Array(3);
            for(let j = 0; j < 3; j++){
                // console.log(gameDiv.children.item(index).dataset.id);
                gameDiv.children.item(index++).addEventListener("click", (e) =>{
                    gameArr[i][j] = "x";
                    //let active = gameDiv.closest("div").querySelector(".cell");
                    e.target.classList.add("inactive");
                    e.target.removeEventListener("click", () => {

                    })
                    //console.log(e.target.)
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

const Game = (() => {
    Gameboard.init();
    const playerOne = Player("Shawn", "x");
    const playerTwo = Player("Charlie", "o");

    const setPiece = piece => {

    }
    return {

    }
})();
