const Gameboard = (() => {
    let gameArr = [["x", "o", "x"], ["o", "x", "o"], ["x", "o", "x"]];
    let gameDiv = document.querySelector(".game");

    const init = () => {
        _createBoard();
    }

    function _createBoard(){
        for(let i = 0; i < 9; i++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
            // if(i % 2 === 0) {
            //     cell.textContent = "x";
            // }else{
            //     cell.textContent = "o";
            // }
            gameDiv.appendChild(cell);
        }
    }

    function _render(){

    }
    return {
        init,
        gameArr
    }
})();

Gameboard.init();
console.log(Gameboard.gameArr);