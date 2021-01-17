(function(){
  function buildQuiz(){
    const output = [];
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = [];
        for(letter in currentQuestion.answers){
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }
  function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    resultsContainer.innerHTML = `Ai răspuns la ${numCorrect} din ${myQuestions.length} întrebări corect!`;
  }
  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }
  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Simbolul dacilor era?",
      answers: {
        a: "Un dracon",
        b: "Un dragon",
        c: "Un lup"
      },
      correctAnswer: "a"
    },
    {
      question: "Imperiul Bizantin a fost cucerit de?",
      answers: {
        a: "Imperiul Dac",
        b: "Imperiul Rus",
        c: "Imperiul Otoman"
      },
      correctAnswer: "c"
    },
    {
      question: "Colloseum-ul era?",
      answers: {
        a: "O arenă",
        b: "O sală de mese",
        c: "Casa împăratului",
      },
      correctAnswer: "a"
    },
    {
      question: "Diferența dintre corpul unui soldat roman și al unui dac este?",
      answers: {
        a: "Masivitatea",
        b: "Culoarea",
        c: "Mărimea capului",
      },
      correctAnswer: "a"
    },
    {
      question: "Războaiele Daco-Romane au început în anul?",
      answers: {
        a: "2012",
        b: "101 î.Hr",
        c: "101 d.Hr",
      },
      correctAnswer: "b"
    },
    {
      question: "Împăratul roman în timpul căruia a început războiul este?",
      answers: {
        a: "Pilat",
        b: "Traian",
        c: "Romulus",
      },
      correctAnswer: "b"
    }
  ];
  buildQuiz();
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  showSlide(currentSlide);
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
