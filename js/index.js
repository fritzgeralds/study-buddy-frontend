let date;

async function getNextDate() {
  await fetch('https://study.dischner.me/api/getNextDate').then(response => {
    return response.json();
  }).then(data => {
    date = data;
    setInterval(async function(){
      getDate(date)
    }, 1000);
  });
}

async function getDate(date) {
  let diff;
  const today = Date.parse(new Date().toLocaleString([], {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Los_Angeles",
  }));

  const local_time = Date.parse(new Date().toLocaleString('en-US'));

  const nextStart = Date.parse(date.date + ", " + date.starttime);
  const nextEnd = Date.parse(date.date + ", " + date.endtime);

  const nextTime = new Date(nextStart + Math.floor(((local_time - today) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) * 60 * 60 * 1000).toLocaleTimeString('en-US');

  if (nextStart < today && today < nextEnd) {
    diff = nextEnd - today;
    document.querySelector('header>h4').innerText = "Time left in current study buddy party!";
    document.querySelector('.card-container>h2').style.display = "none";
  } else {
    diff = nextStart - today;
    document.querySelector('header>h4').innerText = "Time until next study buddy party!";
    document.querySelector('#date').innerText = date.date;
    document.querySelector('#time').innerText = new Date(date.date + ', ' + nextTime).toLocaleTimeString()
  }

  document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / (1000));
}

getNextDate();