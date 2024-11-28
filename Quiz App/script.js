const question = [
    {
        question: "What does BTS stands for?",
        answers: [
            { text: " Beyond the Stars" ,correct: "false"},
            { text: " Bangtan Sonyeondan" ,correct: "true"},
            { text: " Born to Shine" ,correct: "false"},
            { text: " Big Time Singers" ,correct: "false"}
        ]
    },
    {
        question: "When did BTS debut?",
        answers: [
            { text: " June 13, 2013" ,correct: "true"},
            { text: " May 10, 2012" ,correct: "false"},
            { text: " July 15, 2014" ,correct: "false"},
            { text: " March 1, 2011" ,correct: "false"}
        ]
    },
    {
        question: "Which BTS member released the mixtape Hope World?",
        answers: [
            { text: " Jimin" ,correct: "false"},
            { text: " Jungkook" ,correct: "false"},
            { text: " V" ,correct: "false"},
            { text: " J-Hope" ,correct: "true"}
        ]
    },
    {
        question: "What is Suga’s alter ego for his solo music?",
        answers: [
            { text: " AgustD" ,correct: "true"},
            { text: " Sugar K" ,correct: "false"},
            { text: " Min Yoongi" ,correct: "false"},
            { text: " Shadow" ,correct: "false"}
        ]
    },
    {
        question: "Which BTS song became the first K-pop song to reach #1 on the Billboard Hot 100?",
        answers: [
            { text: " Dynamite" ,correct: "true"},
            { text: " Butter" ,correct: "false"},
            { text: " Fake Love" ,correct: "false"},
            { text: " Boy With Luv" ,correct: "false"}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currQuestion = question[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currQuestion.question;


    currQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML= "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currQuestionIndex++;
    if(currQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();