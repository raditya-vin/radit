const riddles = [
    {
        question: "Aku punya kota tapi tidak punya rumah. Aku punya sungai tapi tidak punya air. Apa aku?",
        answer: "peta",
        hint: "Sesuatu yang menunjukkan lokasi"
    },
    {
        question: "Semakin panas aku, semakin aku mengecil. Apa aku?",
        answer: "es",
        hint: "Benda padat yang mencair"
    },
    {
        question: "Aku punya leher tapi tidak punya kepala. Apa aku?",
        answer: "botol",
        hint: "Benda untuk minum"
    },
    {
        question: "Aku bicara tanpa mulut dan mendengar tanpa telinga. Aku datang tanpa kaki. Apa aku?",
        answer: "gema",
        hint: "Suara yang memantul"
    },
    {
        question: "Apa yang basah saat mengering?",
        answer: "handuk",
        hint: "Digunakan setelah mandi"
    },
    {
        question: "Aku punya daun tapi bukan pohon. Apa aku?",
        answer: "buku",
        hint: "Digunakan untuk membaca"
    },
    {
        question: "Semakin banyak lubangnya, semakin banyak yang bisa ditampung. Apa itu?",
        answer: "keju",
        hint: "Makanan dari susu"
    },
    {
        question: "Aku milikmu tapi temanmu menggunakannya lebih banyak daripada kamu. Apa itu?",
        answer: "namamu",
        hint: "Sesuatu yang orang lain sering sebut"
    },
    {
        question: "Apa yang terbang tanpa sayap?",
        answer: "waktu",
        hint: "Tidak bisa dipegang"
    },
    {
        question: "Aku punya mata tapi tidak bisa melihat. Apa aku?",
        answer: "jarum",
        hint: "Digunakan untuk menjahit"
    }
];

let currentRiddleIndex = 0;
let score = 0;
let level = 1;
let hintUsed = false;

const riddleText = document.getElementById('riddleText');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const hintBtn = document.getElementById('hintBtn');
const hintText = document.getElementById('hintText');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');

function loadRiddle() {
    const riddle = riddles[currentRiddleIndex];
    riddleText.textContent = riddle.question;
    answerInput.value = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    hintUsed = false;
    hintText.textContent = '';
    hintBtn.textContent = '💡 Petunjuk';
    nextBtn.classList.add('hidden');
    answerInput.focus();
}

function checkAnswer() {
    const userAnswer = answerInput.value.toLowerCase().trim();
    const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        score += hintUsed ? 5 : 10;
        level = Math.floor(score / 20) + 1;
        scoreEl.textContent = score;
        levelEl.textContent = level;
        feedback.textContent = '✅ Benar! Jawabanmu tepat!';
        feedback.classList.add('correct');
        nextBtn.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        feedback.textContent = '❌ Belum tepat, coba lagi!';
        feedback.classList.add('wrong');
        answerInput.value = '';
        answerInput.focus();
    }
}

function showHint() {
    if (!hintUsed) {
        const hint = riddles[currentRiddleIndex].hint;
        hintText.textContent = hint;
        hintUsed = true;
        hintBtn.textContent = '🔓 Petunjuk sudah digunakan';
    }
}

function nextRiddle() {
    currentRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
    submitBtn.disabled = false;
    loadRiddle();
}

// Event Listeners
submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
hintBtn.addEventListener('click', showHint);
nextBtn.addEventListener('click', nextRiddle);

// Initialize
loadRiddle();
