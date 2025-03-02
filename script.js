//some presidential quotes
const quotes = [
    "God knows that I detest slavery, but it is an existing evil, for which we are not responsible.",
    "Nations, like individuals, are subjected to punishments and rewards.",
    "The man who can look upon a crisis without being willing to offer himself upon the altar of his country is not fit for public trust.",
    "May God save the country, for it is evident that the people will not.",
    "It is not strange to mistake change for progress."
];

//this function will pick a random quote and shows it on the page
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // find the paragraph tag inside the quote box and change its text
    document.querySelector("#presidential-quote p").textContent = quotes[randomIndex];
}

//quiz
const quizQuestions = [
    {
        question: "Where was Millard Fillmore born?",
        answers: ["Buffalo, NY", "Summer Hill, NY", "Albany, NY", "Rochester, NY"],
        correct: 1  //computers start counting at 0
    },
    {
        question: "Which political party was Fillmore a part of later in his career?",
        answers: ["Democratic Party", "Republican Party", "Know Nothing Party", "Whig Party"],
        correct: 2
    },
    {
        question: "What was one of Fillmore's major achievements as president?",
        answers: ["Compromise of 1850", "Missouri Compromise", "Kansas-Nebraska Act", "Wilmot Proviso"],
        correct: 0
    },
    {
        question: "Where did Fillmore receive his formal education?",
        answers: ["Harvard University", "Yale College", "New Hope Academy", "No formal degree"],
        correct: 2
    },
    {
        question: "What was Fillmore's early career before politics?",
        answers: ["Military Officer", "Cloth Maker Apprentice", "School Teacher", "Both B and C"],
        correct: 3
    }
];

// Keep track of which question we are on and the score
let questionNumber = 0;
let quizScore = 0;
let totalQuestionsAnswered = 0;

// This shows the quiz question on the page
function showQuestion() {
    //first grab the places where we will show our stuff
    const questionBox = document.getElementById('question');
    const answerBox = document.getElementById('answers');
    const resultBox = document.getElementById('quiz-result');

    //if we can't find these boxes, dont do anything to prevent an error
    if (!questionBox || !answerBox) return;
    
    // Check if we've completed all questions
    if (totalQuestionsAnswered >= quizQuestions.length) {
        // Show final score
        questionBox.textContent = "Quiz Complete!";
        answerBox.innerHTML = '';
        resultBox.innerHTML = `<p class="fw-bold">Your Score: ${quizScore} out of ${quizQuestions.length}</p>`;
        
        // Restart button
        const restartButton = document.createElement('button');
        restartButton.className = 'btn btn-primary mt-3';
        restartButton.textContent = 'Restart Quiz';
        restartButton.onclick = function() {
            questionNumber = 0;
            quizScore = 0;
            totalQuestionsAnswered = 0;
            resultBox.textContent = "";
            showQuestion();
        };
        answerBox.appendChild(restartButton);
        return;
    }

    //get the current question from our list
    const currentQuestion = quizQuestions[questionNumber];

    //show the question text
    questionBox.textContent = `Question ${questionNumber + 1} of ${quizQuestions.length}: ${currentQuestion.question}`;

    //clear out old answer buttons
    answerBox.innerHTML = '';

    //make new buttons for each answer
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        // Create a cool new button
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary mb-2';
        button.textContent = currentQuestion.answers[i];

        //when someone clicks the button, check if they got it right
        button.onclick = function () {
            checkIfCorrect(i);
        };

        //add the button to our answer box
        answerBox.appendChild(button);
    }
}

//this checks if the answer is right or wrong
function checkIfCorrect(answerNumber) {
    //get the current question
    const currentQuestion = quizQuestions[questionNumber];

    //find where to show the result
    const resultBox = document.getElementById('quiz-result');

    //disable all buttons so they can't click again
    const buttons = document.querySelectorAll('#answers button');
    buttons.forEach(function (button) {
        button.disabled = true;
    });

    //check if they got it right
    if (answerNumber === currentQuestion.correct) {
        resultBox.textContent = "Correct!";
        resultBox.className = "text-success mt-2";
        quizScore++; // Increment score for correct answers
    } else {
        resultBox.textContent = "Incorrect. The correct answer was: " + currentQuestion.answers[currentQuestion.correct];
        resultBox.className = "text-danger mt-2";
    }

    totalQuestionsAnswered++; // Increment the total questions answered
    
    //wait 2 seconds then show the next question
    setTimeout(function () {
        questionNumber = (questionNumber + 1) % quizQuestions.length;
        if (questionNumber === 0) {
            // If we've wrapped around, ensure we show results instead of restarting
            questionNumber = quizQuestions.length;
        }
        resultBox.textContent = "";
        showQuestion();
    }, 2000);
}

//when page loads, start the quiz and show a quote
document.addEventListener('DOMContentLoaded', function () {
    //only start the quiz if your on the quiz page
    if (document.getElementById('quiz-section')) {
        showQuestion();
    }
    
    //show a random quote if we're on the home page
    if (document.getElementById('presidential-quote')) {
        generateQuote();
    }
});