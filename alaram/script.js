let alarmTimeout;
  let alarmInterval;
  let selectedSound = '';

  const timeElement = document.getElementById('time');
  const alarmElement = document.getElementById('alarm');
  const bellElement = document.getElementById('bell');
  const soundSelect = document.getElementById('soundSelect');

  function play() {
    const audio = new Audio(selectedSound);
    audio.play();
  }

  function updateTime() {
    const now = new Date();
    timeElement.innerHTML = now.toDateString() + " " + now.toLocaleTimeString();
  }

  setInterval(updateTime, 1000);
  updateTime(); // initial call

  function startAlarm() {
    const seconds = parseInt(document.getElementById('secondsInput').value);
    selectedSound = soundSelect.value;

    if (isNaN(seconds) || seconds <= 0) {
      alert("Please enter a valid number of seconds!");
      return;
    }

    if (!selectedSound) {
      alert("Please select an alarm sound!");
      return;
    }

    const startTime = new Date().getTime();
    const alarmTime = startTime + seconds * 1000;

    if (alarmTimeout) clearTimeout(alarmTimeout);
    if (alarmInterval) clearInterval(alarmInterval);

    bellElement.style.display = 'none'; // hide bell initially

    alarmTimeout = setTimeout(() => {
      play();
      alarmElement.innerHTML = "⏰ Alarm Ringing!";
      bellElement.style.display = 'block'; // show bell when ringing
    }, seconds * 1000);

    alarmInterval = setInterval(() => {
      const now = new Date().getTime();
      const secondsLeft = Math.floor((alarmTime - now) / 1000);
      if (secondsLeft > 0) {
        alarmElement.innerHTML = `Alarm ringing in ${secondsLeft} seconds`;
      }
    }, 500);
  }

  function resetAlarm() {
    if (alarmTimeout) clearTimeout(alarmTimeout);
    if (alarmInterval) clearInterval(alarmInterval);
    alarmElement.innerHTML = "Alarm Reset. Set a new alarm.";
    bellElement.style.display = 'none'; 
  }