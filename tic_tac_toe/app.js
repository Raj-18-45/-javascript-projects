let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset_button");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; // Player O starts
let count = 0;    // Counts the moves

const winPatterns = [
[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8]
];

// Reset the game
const resetGame = () => {
turnO = true;
count = 0;

enableBoxes();
msgContainer.classList.add("hide");
msg.innerText = "";

};

// Handle box clicks
boxes.forEach((box) => {
box.addEventListener("click", () => {
if (box.disabled) return;

    if (turnO === true) {
        box.innerText = "O";
        turnO = false;
    } else {
        box.innerText = "X";
        turnO = true;
    }
    box.disabled = true;
    count++;
    checkWinner();
});

});

// Disable all boxes
const disableBoxes = () => {
for (let box of boxes) {
box.disabled = true;
}
};

// Enable all boxes and clear their contents
const enableBoxes = () => {
for (let box of boxes) {
box.disabled = false;
box.innerText = "";
}
};

// Display the winner
const showWinner = (winner) => {
msg.innerText = `Congratulations! Winner is ${winner}`;
msgContainer.classList.remove("hide");
disableBoxes();
};

// Check for a winner or draw
const checkWinner = () => {
for (let pattern of winPatterns) {
let pos1Val = boxes[pattern[0]].innerText;
let pos2Val = boxes[pattern[1]].innerText;
let pos3Val = boxes[pattern[2]].innerText;

    if (
        pos1Val !== "" &&
        pos2Val !== "" &&
        pos3Val !== "" &&
        pos1Val === pos2Val &&
        pos2Val === pos3Val
    ) {
        showWinner(pos1Val);
        return;
    }
}
// Check for a draw
if (count === 9) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

};

// Button event listeners
newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);