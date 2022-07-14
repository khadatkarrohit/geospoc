document.addEventListener("DOMContentLoaded", () => {
  createBoxes();  

  let guessedWords = [[]];
  let availableSpace = 1;

  let word = 'tiger';;
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  const login = document.querySelector(".submit");

 

  function getWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateWord(letter) {
    console.log("letter -- ", letter);
    const currentWordArr = getWordArr();
    console.log("currentWordArr -- ", currentWordArr);

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function getColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(255, 5, 5)"; // Red
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(0, 250, 58)"; // Green
    }

    return "rgb(255,255,0)"; // Yellow
  }

  function submitWord() {
    const currentWordArr = getWordArr();
    console.log('currentWordArr -- ', currentWordArr);
    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letters");
    }

    const currentWord = currentWordArr.join("");
    console.log('currentWord -- ', currentWord, " ===== ", word);

      
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
          setTimeout(() => {
            const tileColor = getColor(letter, index);
            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);            
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, 0);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
          window.alert("Your guess is correct, you score 10 points");

          // this will open window email application
          //window.open('mailto:rohit@yopmail.com?subject=subject&body=You are the winner for today’s game. Keep learning new word everyday.');
          sendEmail();
        }

        if (guessedWords.length === 6) {
          window.alert(`Please, Try Again !!!`);
        }

        guessedWords.push([]);     
  }

  function sendEmail() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "rohit@yopmail.com",
      Password: "rohit123",
      To: 'rohit@yopmail.com',
      From: "rohit@yopmail.com",
      Subject: "GeoSpoc Assignment Winner",
      Body: "You are the winner for today’s game. Keep learning new word everyday.",
    })
      .then(function (message) {
        alert("Mail sent successfully. You are the winner for today’s game. Keep learning new word everyday.")
      });
  }

  function createBoxes() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function deleteChar() {
    const currentWordArr = getWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }

  login.addEventListener('click', submit);

  function submit(){
    document.getElementById('gameBoard').style.display='block';
    document.getElementById('loginBoard').style.display='none';

    alert("Login Successfully. You can start guessing word. Let me give you hint !!! Its a wild animal and mostly belongs to big cat family. Who is the villain in Jungle Book?")

  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      console.log("Type letter -- ", letter);

      if (letter === "enter") {
        submitWord();
        return;
      }

      if (letter === "del") {
        deleteChar();
        return;
      }      

      updateWord(letter);
    };
  }
});
