// ---------- data ----------
const log = JSON.parse(localStorage.getItem('weightliftingLog')) || [];
const today = new Date().toISOString().split('T')[0];

// ---------- helpers ----------
function saveLog() { localStorage.setItem('weightliftingLog', JSON.stringify(log)); }
function renderLog() {
  const ul = document.getElementById('log');
  ul.innerHTML = '';
  [...log].sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.date} – ${e.exercise}: ${e.sets}×${e.reps} @ ${e.weight} kg`;
    ul.appendChild(li);
  });
}

// ---------- add entry ----------
function addEntry() {
  const date     = document.getElementById('date').value || today;
  const exercise = document.getElementById('exercise').value.trim();
  const sets     = parseInt(document.getElementById('sets').value,10);
  const reps     = parseInt(document.getElementById('reps').value,10);
  const weight   = parseFloat(document.getElementById('weight').value);

  if (!exercise || isNaN(sets)||sets<=0 || isNaN(reps)||reps<=0 || isNaN(weight)||weight<0) {
    alert('Please fill out all fields correctly.'); return;
  }
  log.push({date, exercise, sets, reps, weight});
  saveLog(); renderLog(); alert('Entry added!');
}

// ---------- init ----------
window.addEventListener('load', () => {
  document.getElementById('date').value = today;
  renderLog();
});
