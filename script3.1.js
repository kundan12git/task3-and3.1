const questions = [
    {
        type: "single",
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        type: "multi",
        question: "Which of these are fruits?",
        options: ["Apple", "Carrot", "Banana", "Broccoli"],
        answer: ["Apple", "Banana"]
    },
    {
        type: "fill",
        question: "Fill in the blank: The sun rises in the ____.",
        answer: "east"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

console.log("questionContainer:", questionContainer);
console.log("optionsContainer:", optionsContainer);
console.log("nextButton:", nextButton);
console.log("Questions array:", questions);

function loadQuestion() {
    console.log("Loading question...");
    const q = questions[currentQuestionIndex];

    if (!q) {
        console.error("No question found at index", currentQuestionIndex);
        return;
    }
    questionContainer.innerHTML = `<p class='question'>${q.question}</p>`;
    optionsContainer.innerHTML = "";

    if (q.type === "single") {
        optionsContainer.innerHTML = q.options.map(option =>
            `<button class="option-btn" onclick="selectAnswer('${option}')">${option}</button>`
        ).join('');
            
     } else if (q.type === "multi") {
        optionsContainer.innerHTML = q.options.map(option => 
            `<label><input type='checkbox' value='${option}'>${option}</label><br>`
        ).join('');

    } else if (q.type === "fill") {
        optionsContainer.innerHTML = `<input type='text' id='fill-answer' placeholder='Your answer here'>`;
    }

    nextButton.style.display = "block";
}


function selectAnswer(option) {
    selectedAnswer = option;
    console.log("Selected answer:", selectedAnswer);
document.querySelectorAll(".option-btn").forEach(btn => {
    btn.classList.remove("selected");
    if(btn.innerText === option) {
        btn.classList.add("selected");
    }
});
}

nextButton.addEventListener("click", () => {
    const q = questions[currentQuestionIndex];
    let userAnswer;
    
    if (q.type === "single") {
        const selected = document.querySelector("input[name='answer']:checked");
        userAnswer = selected ? selected.value : null;
        if (userAnswer === q.answer) score++;
    } else if (q.type === "multi") {
        const selected = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(input => input.value);
        if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) score++;
    } else if (q.type === "fill") {
        userAnswer = document.getElementById("fill-answer").value.trim().toLowerCase();
        if (userAnswer === q.answer.toLowerCase()) score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionContainer.innerHTML = "";
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
        resultContainer.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
        resultContainer.style.display = "block";
    }
});
window.onload = function() {
    console.log("Window loaded, running loadQuestion()");
    loadQuestion();
};