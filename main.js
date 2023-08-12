const questions = [
  {
    question: "What is your name?",
    answer: [
      { text: "Akash", correct: true },
      { text: "Varsha", correct: false },
      { text: "Raunak", correct: false },
      { text: "Krupakshi", correct: false },
    ],
  },
  {
    question: "Where do you currently work?",
    answer: [
      { text: "Western digital", correct: false },
      { text: "Advantest", correct: true },
      { text: "Google", correct: false },
      { text: "Adobe", correct: false },
    ],
  },
  {
    question: "what is your current designation?",
    answer: [
      { text: "Manual Tester", correct: false },
      { text: "Software Engineer", correct: true },
      { text: "QA Tester", correct: false },
      { text: "FVT Engineer", correct: false },
    ],
  },
  {
    question: "which protocol you are working on?",
    answer: [
      { text: "CXL", correct: true },
      { text: "PCIe", correct: false },
      { text: "NVMe", correct: false },
      { text: "SATA", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIdx = 0;
let score = 0;

function startQuiz() {
  currentQuestionIdx = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIdx];
  questionElement.innerHTML =
    currentQuestionIdx + 1 + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIdx++;
  if (currentQuestionIdx < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIdx < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
