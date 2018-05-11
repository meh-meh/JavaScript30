// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

progressBar.style.flexBasis = '1%';

// Build functions
function playToggle(){
  if (video.paused){
    video.play();
  } else {
    video.pause();
  }
}

function updateButton(){
  if (toggle.textContent == '❚❚'){
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚❚';
  }
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
  video[this.name] = this.value;
}

function progressUpdate(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  video.currentTime = video.duration * e.offsetX / video.videoWidth;
}

// Hook up event listeners
video.addEventListener('click', playToggle);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);

toggle.addEventListener('click', playToggle);

skipButtons.forEach(button => button.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change', rangeUpdate));

progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => ((Date.now() % 10 == 0) && e.buttons > 0) && scrub(e));
