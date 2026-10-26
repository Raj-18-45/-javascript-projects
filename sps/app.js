let userScore = 0;
let compScore = 0;
let choices = document.querySelectorAll(".choice");

let userscorepara = document.querySelector("#user-score");
let compscorepara = document.querySelector("#comp-score");

const drawGame = () => {
    console.log("game was draw.");
    msg.innerText="Game was draw.Play again!"
    msg.style.backgroundColor="pink";

};
const showWinner = (userWin,compchoice,userchoice ) => {
    if (userWin) {
        userScore++;
        userscorepara.innerText=userScore;

        msg.innerText=`You Win! Your ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor="green";
    } else {
        compScore++;
        compscorepara.innerText=compScore;

        msg.innerText=`You loose! ${compchoice} beats Your ${userchoice}`;
        msg.style.backgroundColor="red";

    }
};
const gencomputerchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const ranIdx = Math.floor(Math.random() * 3);
    return options[ranIdx];
};
const playGame = (userchoice) => {
    console.log("user choice =", userchoice);
    // Generate computer choice
    const compchoice = gencomputerchoice();
    console.log("comp choice =", compchoice);
    if (userchoice === compchoice) {
        // Draw game
        drawGame();
    } else {
        // Simplified winning logic
        let userWin =
            (userchoice === "rock" && compchoice === "scissors") ||
            (userchoice === "paper" && compchoice === "rock") ||
            (userchoice === "scissors" && compchoice === "paper");
        showWinner(userWin,userchoice,compchoice );
    }
};
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        console.log("choice was clicked", userchoice);
        playGame(userchoice);
    });
});