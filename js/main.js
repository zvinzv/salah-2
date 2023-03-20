let select = document.getElementById("select");

let depNight = document.querySelector(".fajr");
let shorok = document.querySelector(".sunset");
let dohour = document.querySelector(".doher");
let magrib = document.querySelector(".maghrib");

let cityname = document.querySelector(".cityname");
let date = document.querySelector(".date");

let main_city = [
  {
    name: {
      ar: "النجف الاشرف",
      en: "Najaf",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "32.0217018",
      long: "44.3644243",
    },
    time: {},
  },
  {
    name: {
      ar: "البصرة",
      en: "Basra",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "30.5312179",
      long: "47.8417508",
    },
    time: {},
  },
  {
    name: {
      ar: "بابل",
      en: "babel",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "32.4732208",
      long: "44.4393714",
    },
    time: {},
  },
  {
    name: {
      ar: "ذي قار",
      en: "theiKar",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "31.039336",
      long: "46.3499263",
    },
    time: {},
  },
  {
    name: {
      ar: "كربلاء",
      en: "karbala",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "32.60751",
      long: "44.0464657",
    },
    time: {},
  },
  {
    name: {
      ar: "واسط",
      en: "kout",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "32.5129091",
      long: "45.8451352",
    },
    time: {},
  },
  {
    name: {
      ar: "القادسية",
      en: "alKadisia",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "31.973471",
      long: "44.9014464",
    },
    time: {},
  },
  {
    name: {
      ar: "ميسان",
      en: "misan",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "31.8403761",
      long: "47.1458781",
    },
    time: {},
  },
  {
    name: {
      ar: "المثنى",
      en: "alMothana",
    },
    date: {
      day: new Date().toLocaleDateString("ar-iq", { weekday: "long" }),
      num: new Date().toLocaleDateString("ar-iq"),
    },
    location: {
      lant: "31.3299899",
      long: "45.2914677",
    },
    time: {},
  },
];


let x = []
main_city.forEach((element) => {
  x.push(element.name.ar)
  axios
    .get(
      `https://hq.alkafeel.net/Api/init/init.php?timezone=+3&long=${element.location.long}&lati=${element.location.lant}&v=jsonPrayerTimes`
    )
    .then((respons) => {
      for (let [key, value] of Object.entries(respons.data)) {
        if (key != "powerdby" && key != "date") {
          element.time[key] = value;
        }
      }
      
    })
    .catch((reject) => {
      setTimeout(() => {
        document.querySelector(".rounded").remove()
        document.querySelector(".content").remove()
        document.querySelector(".overlay").innerHTML = `<span class="not_found">الموقع لا يعمل حالياً, حاول مرة اخرى لاحقاَ او اتصل بنا!</span>
        <nav>
          <ul>
            <li><a href="https://www.instagram.com/x748a/"><i class="fa-brands fa-square-instagram fa-fw"></i></a></li>
            <li><a href="https://t.me/ZVINZV"><i class="fa-brands fa-telegram fa-fw"></i></a></li>
          </ul>
        </nav>`
      }, 800);
    })
});
setTimeout(() => {
  document.querySelector(".overlay").remove()
}, 300);
x.sort()
for (let i of x) {
  select.innerHTML += `<option value="${i}">${i}</option>`;
}
select.addEventListener("change", function () {
  window.scroll({
    top: 0,
    behavior: "smooth"
  })
  main_city.forEach((element) => {
    if (element.name.ar === this.value) {
      editNameAndDate(
        element.name.ar,
        element.date.day + " - " + element.date.num,
        element.time.fajir,
        element.time.sunset,
        element.time.doher,
        element.time.maghrib
      );
      document.querySelector('.cityname').style.display = "none"
      document.querySelector('.date').style.display = "none"
      document.querySelector('.box1').style.display = "none"
      document.querySelector('.box12').style.display = "none"
      document.querySelector('.box123').style.display = "none"
      document.querySelector('.box1234').style.display = "none"
      document.querySelector('.note').style.display = "none"
      setTimeout(() => {
        document.querySelector('.box1').style.display = "block"
        document.querySelector('.box12').style.display = "block"
        document.querySelector('.box123').style.display = "block"
        document.querySelector('.box1234').style.display = "block"
        document.querySelector('.date').style.display = "block"
        document.querySelector('.cityname').style.display = "block"
        document.querySelector('.note').style.display = "flex"
      }, 1);
      
    }
  });
});

function editNameAndDate(name, dates, fajir, sunsets, daur, mg) {
  cityname.innerHTML = name;
  date.innerHTML = dates;
  depNight.innerHTML = fajir + "<span class='time'>صباحاً</span>";
  shorok.innerHTML = sunsets + "<span class='time'>صباحاً</span>";
  dohour.innerHTML = daur + "<span class='time'>مساءً</span>";
  magrib.innerHTML = mg + "<span class='time'>مساءً</span>";
}


document.querySelector('.close').addEventListener("click", function () {
  document.querySelector('.note').style.display = "none"
})