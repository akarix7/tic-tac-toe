const Gameboard = () => {
    let gameArr = [];
    let gameDiv = document.querySelector(".game");

    function _createBoard(){
        for(let i = 0; i < 8; i++){
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.id = (i).toString();
        }

    }
}