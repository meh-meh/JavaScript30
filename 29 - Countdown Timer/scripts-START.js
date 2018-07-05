let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            document.title = 'Timer Over';
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remSeconds = seconds % 60;

    const display = `${minutes}:${remSeconds < 10 ? '0' : ''}${remSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    let realHour = hour > 12 ? hour - 12 : hour;
    if (realHour == 0) realHour = 12;
    const minutes = end.getMinutes();
    const zeroMinute = minutes < 10 ? '0' + minutes : minutes;

    endTime.textContent = `Be Back at ${realHour}:${zeroMinute} ${hour > 12 ? 'pm' : 'am'}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})