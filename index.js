const
loader = document.querySelector('.loader'),
monday = document.querySelector('.pn'),
tuesday = document.querySelector('.wt'),
wednesday = document.querySelector('.sr'),
thursday = document.querySelector('.cz'),
friday = document.querySelector('.pt'),
lessons = document.querySelectorAll('.lesson');

let activeDay, dayID, h, min, tMin, timeslot, lastTimeslot;

let setActiveDay = element => {
  if (!element.classList.contains('active-day')) {
    document.querySelectorAll('.day').forEach(day => day.classList.remove('active-day'))
    element.classList.add('active-day')
    activeDay = element
  }
}

let clearActiveDays = () => {
  document.querySelectorAll('.day').forEach(day => { if (day.classList.contains('active-day')) { day.classList.remove('active-day') }})
  activeDay = false
  dayID = null
}

function clearActiveTimeslots() {
  document.querySelectorAll('.timeslot').forEach(e => {
    e.classList.remove('active-hour')
  })
}

function clearActiveLessons() {
  lessons.forEach(e => {
    e.classList.remove('active-lesson')
  })
}

const isBetween = (x,min,max) => {
    return x>=min && x<=max
}

const tRange = (now,t1,t2) => {
  t1 = t1.split(':'); t2 = t2.split(':');
  h1 = +t1[0]; min1 = +t1[1];
  h2 = +t2[0]; min2 = +t2[1];

  let min = h1*60+min1
  let max = h2*60+min2

  return isBetween(now,min,max)
}

setInterval(() => {
  now = new Date();
  // now.setDate(5)
  // now.setHours(11)
  // now.setMinutes(32)

  // Determine current day
  switch (now.getDay()) {
    case 1:
      setActiveDay(monday)
      dayID = 'pn'
      break
    case 2:
      setActiveDay(tuesday)
      dayID = 'wt'
      break
    case 3:
      setActiveDay(wednesday)
      dayID = 'sr'
      break
    case 4:
      setActiveDay(thursday)
      dayID = 'cz'
      break
    case 5: 
      setActiveDay(friday)
      dayID = 'pt'
      break
    default:
      clearActiveDays()
      break
  }
  
  h = now.getHours(),
  min = now.getMinutes(),
  tMin = h * 60 + min;

  if (timeslot) {
    lastTimeslot = timeslot
  }

  // Define timeslots
  if (activeDay) {
    timeslot = 
      tRange(tMin, '08:00','9:30')  ? 1 :
      tRange(tMin, '9:45','11:15')  ? 2 :
      tRange(tMin, '11:30','13:00') ? 3 :
      tRange(tMin, '13:15','14:45') ? 4 :
      tRange(tMin, '15:00','16:30') ? 5 :
      tRange(tMin, '16:45','18:15') ? 6 :
      tRange(tMin, '18:30','20:00') ? 7 :
      null;
  }

  if (timeslot && timeslot != lastTimeslot) {
    clearActiveTimeslots()
    clearActiveLessons()
  }
  
  // Highlight active lesson
  if (dayID && timeslot) {
    let activeLesson = document.querySelector(`.${dayID}${timeslot}`)
    if (!activeLesson.classList.contains('active-lesson')) {
      activeLesson.classList.add('active-lesson')
    }
  }

  // Highlight active timeslot
  if (dayID && timeslot) {
    let activeLesson = document.querySelector(`.t${timeslot}`)
    if (!activeLesson.classList.contains('active-hour')) {
      activeLesson.classList.add('active-hour')
    }
  }

  document.querySelector('#current-date').innerHTML = now.toString();
},1)

// Set lessons
lessons.forEach(l => {
  let subject = teacher = subjectURL = teacherID = " "
  
  switch (l.getAttribute('l')) {
    case 'test':
      subject = "INSERT TITLE HERE"
      teacher = "NAME SURNAME"
      subjectURL = "#"
      teacherID = "#"
      break;
    case 'grafika2d':
      subject = "Warsztaty 2D-graf. wektorowa"
      teacher =  "Wójcik, Anna"
      subjectURL = "https://teams.microsoft.com/l/team/19%3afbcb1893464645e78a495d1c92cb1cc7%40thread.tacv2/conversations?groupId=ce32b94d-e92d-456f-8783-10bbf9add9ca&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e"
      teacherID = "awojcik@san.edu.pl"
      break
    case 'liternictwo':
      subject = "Liternictwo"
      teacher = "Tomsia, Szymon"
      subjectURL = "https://teams.microsoft.com/l/team/19%3a34f5021badc543539e05d911b67eba87%40thread.tacv2/conversations?groupId=ab0c05f0-c064-461f-91cc-231c40eef50d&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e"
      teacherID = "stomsia@san.edu.pl"
      break
    case 'fotografia':
      subject = "Fotografia"
      teacher = "Tomsia, Szymon"
      subjectURL = "https://teams.microsoft.com/l/team/19%3a572259cf45d3481d998241e4cc4f542f%40thread.tacv2/conversations?groupId=7c4caf1c-8524-490c-b5e9-10409bf6f2df&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e"
      teacherID = "stomsia@san.edu.pl"
      break
    case 'jezyk-obcy':
      subject = "Jezyk obcy"
      teacher = "???"
      subjectURL = "???"
      teacherID = "???"
      break
    case 'rysunek-malarstwo':
      subject = "Rysunek/Malarstwo"
      teacher = "Sikora, Zbigniew"
      subjectURL = "#"
      teacherID = "zsikora@san.edu.pl"
      break
    case 'tech-inf':
      subject = "Technologie Informacyjne Ćw"
      teacher = "Kluka, Grzegorz"
      subjectURL = "https://teams.microsoft.com/l/team/19%3afb922d119ff44a7ca9e51b0f18e083a7%40thread.tacv2/conversations?groupId=e1c7a9e5-0ef0-40ec-90cb-54c034844eef&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e"
      teacherID = "gkluka@san.edu.pl"
      break
    case 'pfwidz-komwiz':
      subject = " "
      teacher = "Piątek, Maria"
      subjectURL = "#"
      teacherID = "mpiatek@san.edu.pl"
      break
    default:
      break;
  }

  l.innerHTML =
`     <a href="${subjectURL}" target="_blank">
    <div class="subject">${subject}</div>
  </a>
  <a onclick="prompt('Skopiuj i wyszukaj w Teams ten adres:', '${teacherID}');">
    <div class="teacher">${teacher}</div>
  </a>`;
})

// Set lessons based on week number
function getWeekNumber(d) {
d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
return [d.getUTCFullYear(), weekNo];
}

let currentWeek = getWeekNumber(new Date());

const lessonTemplate = (element,subject,teacher,subjectURL,teacherID) => {
element.innerHTML =
`     <a href="${subjectURL}" target="_blank">
    <div class="subject">${subject}</div>
  </a>
  <a onclick="prompt('Skopiuj i wyszukaj w Teams ten adres:', '${teacherID}');">
    <div class="teacher">${teacher}</div>
  </a>`;
}

if (currentWeek[1] % 2) {
document.querySelectorAll('*[l="rysunek-malarstwo"').forEach(e => {
  lessonTemplate(e,'Malarstwo','Sikora, Zbigniew','https://teams.microsoft.com/l/team/19%3aa25f53d0b19f4004a530f5b149cda45a%40thread.tacv2/conversations?groupId=d5edf811-8adc-49ea-b122-af5f25256404&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e','zsikora@san.edu.pl')
})
document.querySelectorAll('*[l="pfwidz-komwiz"]').forEach(e => {
  lessonTemplate(e,'Psychofizjologia Widzenia','Piątek, Maria','https://teams.microsoft.com/l/team/19%3af6a7ca2747ce414eaefc1d0358d2e17d%40thread.tacv2/conversations?groupId=a43a8368-0dde-40fb-8037-1b57617a2864&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e','mpiatek@san.edu.pl')
})
} else {
document.querySelectorAll('*[l="rysunek-malarstwo"').forEach(e => {
  lessonTemplate(e,'Rysunek','Sikora, Zbigniew','https://teams.microsoft.com/l/team/19%3a3dd5f7ef5c994026a7085969de65bce6%40thread.tacv2/conversations?groupId=90e76167-2b2f-45bc-84c5-06268111cb6f&tenantId=262dbaf1-38a1-43f9-a7da-3022da85cc5e','zsikora@san.edu.pl')
})
document.querySelectorAll('*[l="pfwidz-komwiz"]').forEach(e => {
  lessonTemplate(e,'Podstawy Komunikacji Wizualnej','Piątek, Maria','#','mpiatek@san.edu.pl')
})
document.querySelectorAll('*[l="tech-inf"]').forEach(e => {
  lessonTemplate(e,' ',' ',' ',' ')
})
}

setTimeout(() => {
  loader.classList.add('hidden')
  loader.style.pointerEvents = 'none'
}, 4040);