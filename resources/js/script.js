const hiddenCardPath = "./resources/images/card.svg";
const asImagePath = "./resources/images/as.svg";
const threeImagePath = "./resources/images/three.svg";
const sixImagePath = "./resources/images/six.svg";
let openCard1;
let openCard2;
let openCard3;

let card1 = document.getElementById('card1');
let card2 = document.getElementById('card2');
let card3 = document.getElementById('card3');

card1.src = hiddenCardPath;
card2.src = hiddenCardPath;
card3.src = hiddenCardPath;

let firstMove = true;
let secondMove = false;

let message = document.getElementById('info');
let play = document.getElementById('play');

let gamesWithoutChange = 0;
let winWithoutChange = 0;
let gamesWithChange = 0;
let winWithChange = 0;

let buttonWinFirstChoice = document.getElementById("firstChoiceWin");
let buttonWinSecondChoice = document.getElementById("secondChoiceWin");

let changedCard = false;
let firstChoice;





const generateRandomPath = () => {
    const variant = Math.floor(Math.random() * 5);
    switch (variant) {
        case 0:
            openCard1 = asImagePath;
            openCard2 = threeImagePath;
            openCard3 = sixImagePath;
            break;
        case 1:
            openCard1 = asImagePath;
            openCard2 = sixImagePath;
            openCard3 = threeImagePath;
            break;
        case 2:
            openCard1 = sixImagePath;
            openCard2 = asImagePath;
            openCard3 = threeImagePath;
            break;
        case 3:
            openCard1 = threeImagePath;
            openCard2 = asImagePath;
            openCard3 = sixImagePath;
            break;
        case 4:
            openCard1 = threeImagePath;
            openCard2 = sixImagePath;
            openCard3 = asImagePath;
            break;
        case 5:
            openCard1 = sixImagePath;
            openCard2 = threeImagePath;
            openCard3 = asImagePath;
            break;
    }
}




const showFirstCard = (card) => {

    const variant = Math.floor(Math.random() * 2);
    if (card === card1) {

        if (openCard1 === asImagePath) {
            switch (variant) {
                case 0:
                    card2.src = openCard2;
                    break;
                case 1:
                    card3.src = openCard3;
            }
        } else {
            switch (true) {
                case openCard2 === asImagePath:
                    card3.src = openCard3;
                    break;
                case openCard3 === asImagePath:
                    card2.src = openCard2;
                    break;
            }
        }
    } else if (card === card2) {
        if (openCard2 === asImagePath) {
            switch (variant) {
                case 0:
                    card1.src = openCard1;
                    break;
                case 1:
                    card3.src = openCard3;
                    break;
            }
        } else {
            switch (true) {
                case openCard1 === asImagePath:
                    card3.src = openCard3;
                    break;
                case openCard3 === asImagePath:
                    card1.src = openCard1;
                    break;
            }
        }
    } else {
        if (openCard3 === asImagePath) {
            switch (variant) {
                case 0:
                    card1.src = openCard1;
                    break;
                case 1:
                    card2.src = openCard2;
                    break;
            }
        } else {
            switch (true) {
                case openCard1 === asImagePath:
                    card2.src = openCard2;
                    break;
                case openCard2 === asImagePath:
                    card1.src = openCard1;
                    break;
            }
        }

    }
}

const showCards = () => {
    card1.src = openCard1;
    card2.src = openCard2;
    card3.src = openCard3;
    card1.style.border = "2px grey dashed";
    card2.style.border = "2px grey dashed";
    card3.style.border = "2px grey dashed";
}

const changeMessage = (param) => {
    message.innerHTML = param;
}

const isWinner = (card) => {
    if (card.src.indexOf("as.svg") != -1) {
        return true;
    }
    return false;
}

play.onclick = () => {
    generateRandomPath();
    card1.src = hiddenCardPath;
    card2.src = hiddenCardPath;
    card3.src = hiddenCardPath;
    card1.style.border = "2px grey dashed";
    card2.style.border = "2px grey dashed";
    card3.style.border = "2px grey dashed";
    firstMove = true;
    secondMove = false;
    changeMessage('Step 1: Find Ace');
}

const selectMove = (card) => {
    switch (true) {
        case firstMove:
            firstChoice = card;
            showFirstCard(card);
            card.style.border = "2px yellow dashed";
            changeMessage('Which card wins? Select the winner !');
            firstMove = false;
            secondMove = true;
            break;
        case secondMove:
            changedCard = false;
            secondMove = false;
            showCards();
            if (isWinner(card)) {
                card.style.border = "2px green dashed";
                message.innerHTML = "Win ! Play again";
            } else {
                card.style.border = "2px red dashed";
                message.innerHTML = "Not this time ! Play again";
            }
            if (card != firstChoice) {
                changedCard = true;
                gamesWithChange++;
            } else {
                gamesWithoutChange++;
            }

            if (isWinner(card) && changedCard) {
                winWithChange++;

            } else if (isWinner(card) && !changedCard) {
                winWithoutChange++;
            }
            
              if(gamesWithChange !=0){
                buttonWinSecondChoice.innerHTML = Math.round((winWithChange / gamesWithChange) * 100) / 100;
              }  
              if(gamesWithoutChange !=0){
                buttonWinFirstChoice.innerHTML = Math.round((winWithoutChange / gamesWithoutChange) * 100) / 100;
              }




            break;
    }
}

card1.onclick = () => {
    selectMove(card1);
}
card2.onclick = () => {
    selectMove(card2);
}
card3.onclick = () => {
    selectMove(card3);
}

generateRandomPath();
