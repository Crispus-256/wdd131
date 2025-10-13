// Initialize localStorage if not set
if (!localStorage.getItem('completedWorkouts')) {
  localStorage.setItem('completedWorkouts', '0');
}

// DOM Elements
const startWorkoutBtn = document.getElementById('startWorkoutBtn');
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const completedCount = document.getElementById('completedCount');
const progressFill = document.getElementById('progressFill');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

// Timer Variables
let timerInterval;
let seconds = 0;

// Function to format time as MM:SS
function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// Start Timer
startTimerBtn.addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      seconds++;
      timerDisplay.textContent = formatTime(seconds);
    }, 1000);
  }
});

// Reset Timer
resetTimerBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  timerDisplay.textContent = '00:00';
});

// Mark Workout Complete
startWorkoutBtn.addEventListener('click', () => {
  let count = parseInt(localStorage.getItem('completedWorkouts'));
  count++;
  localStorage.setItem('completedWorkouts', count.toString());
  updateProgress(count);
  alert(`Great job! You've completed ${count} workout${count === 1 ? '' : 's'} this week.`);
});

// Update Progress Bar
function updateProgress(count) {
  completedCount.textContent = count;
  const percentage = (count / 5) * 100;
  progressFill.style.width = `${percentage}%`;
}

// Load saved progress on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedCount = parseInt(localStorage.getItem('completedWorkouts'));
  updateProgress(savedCount);
});

// Toggle Mobile Menu
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Handle Feedback Form Submission
document.getElementById('feedbackForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thank you for your feedback!");
});

// Handle Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thank you for reaching out! We'll get back to you soon.");
});