// 30 HTML QUESTIONS DATASET
const questions = [
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Home Text Markup Language"], answer: 0 },
  { q: "Who is making the Web standards?", options: ["Mozilla", "Microsoft", "The World Wide Web Consortium (W3C)", "Google"], answer: 2 },
  { q: "Which HTML element is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2 },
  { q: "What is the correct HTML element for inserting a line break?", options: ["<lb>", "<br>", "<break>", "<newline>"], answer: 1 },
  { q: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], answer: 2 },
  { q: "Which character is used to indicate an end tag in HTML?", options: ["*", "/", "<", "^"], answer: 1 },
  { q: "How can you open a link in a new tab/browser window?", options: ['<a href="url" new>', '<a href="url" target="_blank">', '<a href="url" target="new">', '<a href="url" window="_blank">'], answer: 1 },
  { q: "Which HTML element defines the title of a document shown in the browser tab?", options: ["<meta>", "<head>", "<title>", "<header>"], answer: 2 },
  { q: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?", options: ["title", "src", "alt", "longdesc"], answer: 2 },
  { q: "Which doctype is correct for HTML5?", options: ["<!DOCTYPE html>", "<!DOCTYPE HTML5>", "<!DOCTYPE html PUBLIC>", "<DOCTYPE html>"], answer: 0 },
  { q: "Which HTML element is used to specify a footer for a document or section?", options: ["<bottom>", "<section>", "<footer>", "<end>"], answer: 2 },
  { q: "In HTML, which attribute is used to specify that an input field must be filled out?", options: ["validate", "placeholder", "required", "formvalidate"], answer: 2 },
  { q: "Which HTML element is used to play video files?", options: ["<media>", "<video>", "<movie>", "<mp4>"], answer: 1 },
  { q: "Which HTML element is used to play audio files?", options: ["<sound>", "<mp3>", "<audio>", "<music>"], answer: 2 },
  { q: "Which input type defines a slider control in HTML5?", options: ["slider", "range", "controls", "search"], answer: 1 },
  { q: "Which HTML element is used to define navigation links?", options: ["<navigate>", "<nav>", "<navigation>", "<links>"], answer: 1 },
  { q: "How do you create a numbered (ordered) list in HTML?", options: ["<ul>", "<ol>", "<dl>", "<list>"], answer: 1 },
  { q: "How do you create a bulleted (unordered) list in HTML?", options: ["<ol>", "<ul>", "<li>", "<bl>"], answer: 1 },
  { q: "Which HTML tag is used to define a table row?", options: ["<td>", "<th>", "<tr>", "<table-row>"], answer: 2 },
  { q: "Which HTML tag is used to define a table header cell?", options: ["<thead>", "<th>", "<tr>", "<td>"], answer: 1 },
  { q: "Which input type allows a user to select multiple choices in a form?", options: ["radio", "checkbox", "text", "submit"], answer: 1 },
  { q: "Which input type allows only ONE option to be selected from a group?", options: ["checkbox", "radio", "select", "option"], answer: 1 },
  { q: "Which HTML element is used to create a drop-down list?", options: ["<input type='dropdown'>", "<list>", "<select>", "<dropdown>"], answer: 2 },
  { q: "What is the correct HTML for creating a hyperlink?", options: ['<a url="https://example.com">Example</a>', '<a href="https://example.com">Example</a>', '<a>https://example.com</a>', '<link href="https://example.com">Example</link>'], answer: 1 },
  { q: "Which HTML tag is used to make text bold with strong importance?", options: ["<bold>", "<strong>", "<b>", "<important>"], answer: 1 },
  { q: "Which HTML tag is used to define an inline frame (embedding another webpage)?", options: ["<frame>", "<iframe>", "<embed>", "<window>"], answer: 1 },
  { q: "Which HTML element is used to draw graphics on the fly via JavaScript?", options: ["<svg>", "<canvas>", "<graphic>", "<draw>"], answer: 1 },
  { q: "What is the correct HTML for inserting a horizontal rule (line)?", options: ["<line>", "<hr>", "<br>", "<rule>"], answer: 1 },
  { q: "Which attribute is used to provide a short hint inside an input field?", options: ["hint", "value", "placeholder", "title"], answer: 2 },
  { q: "How do you write a comment in HTML?", options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "# This is a comment"], answer: 2 }
];

// REUSABLE ANIMATED ALERT HELPER
function showAnimatedAlert(options) {
  return Swal.fire({
    ...options,
    showClass: {
      popup: 'alert-show'
    },
    hideClass: {
      popup: 'alert-hide'
    }
  });
}

// STATE MANAGEMENT
let currentUser = null;
let currentQuestionIndex = 0;
let selectedOptionIndex = null;
let score = 0;
let timerInterval = null;
let timeLeft = 30;

// DOM ELEMENTS
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const startQuizBtn = document.getElementById('startQuizBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const userTag = document.getElementById('userTag');

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    currentUser = JSON.parse(loggedUser);
    updateUserTag();
    switchView('homeView');
  } else {
    switchView('signupView');
  }
});

// VIEW SWITCHER
function switchView(viewId) {
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

function updateUserTag() {
  userTag.textContent = currentUser ? `[ USER: ${currentUser.name.toUpperCase()} ]` : '';
}

// 1. SIGNUP SYSTEM
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  let users = JSON.parse(localStorage.getItem('quizUsers')) || [];

  if (users.find(u => u.email === email)) {
    showAnimatedAlert({
      icon: 'error',
      title: 'Signup Failed',
      text: 'Email is already registered!'
    });
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('quizUsers', JSON.stringify(users));

  showAnimatedAlert({
    icon: 'success',
    title: 'Signup Successful!',
    text: 'Your account has been created successfully.'
  }).then(() => {
    signupForm.reset();
    switchView('loginView');
  });
});

// 2. LOGIN SYSTEM
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showAnimatedAlert({
      icon: 'error',
      title: 'Access Denied',
      text: 'Invalid email or password!'
    });
  } else {
    currentUser = user;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    updateUserTag();

    showAnimatedAlert({
      icon: 'success',
      title: 'Login Successful!',
      text: 'Welcome back!',
      timer: 1400,
      showConfirmButton: false
    }).then(() => {
      loginForm.reset();
      switchView('homeView');
    });
  }
});

function logout() {
  clearInterval(timerInterval);
  localStorage.removeItem('loggedUser');
  currentUser = null;
  updateUserTag();
  switchView('loginView');
}

// 3. QUIZ ENGINE
startQuizBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  switchView('quizView');
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  selectedOptionIndex = null;
  nextBtn.disabled = true;

  const qData = questions[currentQuestionIndex];
  const qNum = currentQuestionIndex + 1;

  document.getElementById('questionProgress').textContent = `Question ${String(qNum).padStart(2, '0')} / ${questions.length}`;
  document.getElementById('questionText').textContent = `${qNum}. ${qData.q}`;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  qData.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectOption(idx);
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function selectOption(index) {
  selectedOptionIndex = index;
  const optionBtns = document.querySelectorAll('.option-btn');

  optionBtns.forEach((btn, idx) => {
    btn.classList.toggle('selected', idx === index);
  });

  nextBtn.disabled = false;
}

function startTimer() {
  timeLeft = 30;
  const timerBadge = document.getElementById('timerBadge');
  timerBadge.textContent = `Time Remaining: ${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerBadge.textContent = `Time Remaining: ${String(timeLeft).padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleNextQuestion();
    }
  }, 1000);
}

nextBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  handleNextQuestion();
});

function handleNextQuestion() {
  if (selectedOptionIndex !== null) {
    if (selectedOptionIndex === questions[currentQuestionIndex].answer) {
      score++;
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// 4. RESULT SYSTEM
function showResults() {
  switchView('resultView');

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById('scoreDisplay').textContent = `${score} / ${questions.length}`;
  document.getElementById('percentageDisplay').textContent = `Percentage: ${percentage}%`;

  const feedback = document.getElementById('feedbackText');
  if (percentage >= 70) {
    feedback.textContent = 'Outstanding execution! Exceptional HTML skill!';
  } else if (percentage >= 50) {
    feedback.textContent = 'Solid performance! Keep practicing to reach master level!';
  } else {
    feedback.textContent = 'Better luck next time! Keep Learning & Keep Coding!';
  }

  showAnimatedAlert({
    icon: percentage >= 50 ? 'success' : 'info',
    title: percentage >= 50 ? 'Quiz Passed!' : 'Quiz Completed!',
    text: `Your Score: ${score} / ${questions.length} (${percentage}%)`
  });
}