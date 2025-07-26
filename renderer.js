const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const slider = document.getElementById('cpu-slider');
const cpuValue = document.getElementById('cpu-value');
const consoleOutput = document.getElementById('console');

// Update the displayed slider value when changed
slider.addEventListener('input', () => {
  cpuValue.innerText = `${slider.value}%`;
});

// Start miner with current CPU limit
startBtn.addEventListener('click', () => {
  const cpuLimit = parseInt(slider.value);
  window.electronAPI.startMiner(cpuLimit);
});

// Stop miner
stopBtn.addEventListener('click', () => {
  window.electronAPI.stopMining();
});

// Receive log messages from miner and print them
window.electronAPI.onMinerLog((data) => {
  consoleOutput.textContent += data;
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
});

// Optional: auto-update the slider display on load
cpuValue.innerText = `${slider.value}%`;
