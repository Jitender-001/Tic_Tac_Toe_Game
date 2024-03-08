let mainContainer=document.querySelector(".container");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#newGame-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0 = true;  //playerX  player0

mainContainer.classList.remove("hide");
resetBtn.classList.remove("hide");

const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0=true;
    counter=0;
    enableBoxes();
    for(let box of boxes){
        box.innerText="";
        msgContainer.classList.add("hide");
        mainContainer.classList.remove("hide");
        resetBtn.classList.remove("hide");
    }
};

let counter=0; // initial counter

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turn0){    //player0's turn
            box.innerText="0";
            turn0=false;
        }
        else{       //playerX's turn
            box.innerText="X";
            turn0=true;
        }
        counter=counter+1;
        box.disabled=true;
        checkWinner(counter);  //counter added in functin=on
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
    }
}

const showWinner = (winner)=>{
    counter=0;
    msg.innerText=`Congratulations winner is ${winner}`;
    msgContainer.classList.remove("hide");
    mainContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
};

const matchDraw = () =>{
    counter=0;
    msg.innerText="Match Drawn.."
    msgContainer.classList.remove("hide");
    mainContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
};

const checkWinner = (counter) => {
    if(counter===9){
        matchDraw();
    }
    else{
        for(let pattern of winningPatterns){
            let pos1val=boxes[pattern[0]].innerText;
            let pos2val=boxes[pattern[1]].innerText;
            let pos3val=boxes[pattern[2]].innerText;
            
            if(pos1val!="" && pos2val!="" && pos3val!=""){
                if(pos1val===pos2val && pos2val===pos3val){
                    showWinner(pos1val);
                }
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);