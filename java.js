const header = document.querySelector("header h2");
/* endpoint er linket til databasen fra Restdb.io */
const endpoint = "https://babushka-dd8a.restdb.io/rest/menu";

/*  api-nøglen til databasen skal tastes ind her*/
const mereinfo = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

/* let er når vi skal kunne lave den om, const er når det er en konstant. 
Dette er den globale variabel. det kan ikke være en konstant fordi man ikke kan sætte alt dataen ind i den på samme tid med at man definere den */
let retter;

/* Her henter vi dataen fra databasen via fetch metoden (en JSON metode = Java Script Object Notation) */

async function hentData() {
  const respons = await fetch(endpoint, mereinfo);
  retter = await respons.json();
  console.log(retter);
  visRetter();
}

const main = document.querySelector("#indhold");
const template = document.querySelector("template").content;
/* variabel for alle vores filtre sættes = alle*/
let filter = "alle";

/* laver en konstant så vi ikke skal lave en eventlistener på alle vores knapper */
const filterKnapper = document.querySelectorAll("nav button");
/* kalder funktionen filtrer "retter" som indeholder det der skal ske når vi klikker på forskellige knapper*/
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerknapper));

function filtrerknapper() {
  /* sætter filter = this (this står for den knap der er trykket på fx "alle" "desserter" osv) ændre teksten der står inde i filteret fx alle --> Desserter alt efter hvilken knap der er trykket på. Kategori er vores data-attribut (fra html)*/
  filter = this.dataset.kategori;
  /* kalder vis retter for at implementere filteret*/
  console.log(filter);

  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  /*headers tekst kontent = knaps kontent*/
  header.textContent = this.textContent;
  /*HUSK AT KALDE FUNKTIONEN*/
  visRetter();
}

/* For at få vist den hentede data skal vi lave et skelet i template tagget i html hvor vi via klone putter indholdet i. Template er usynligt indtil vi putter noget indhold derind fra databasen*/
function visRetter() {
  console.log(retter);
  /* sletter indholdet for listen så den ikke bliver ved med at loope igennem det -vores array DVS der kun kommer dem frem som vi vil have vist*/
  main.textContent = "";

  /*  forEach tillader os at køre vores data i loop, altså få vist vores array X antal gnage i stedet for 1 gang*/
  /*  => er en anynym funktion også kaldet arrow function. referer til globale variabel (retter)*/
  retter.forEach((ret) => {
    /*  Dette er vores betingelse. == betyder at man sammenligner */
    if (filter == "alle" || filter == ret.kategori) {
      console.log("kategori", ret.kategori);
      const klon = template.cloneNode(true);
      klon.querySelector(".billede").src = "billeder/" + ret.billednavn + "-md.jpg";
      klon.querySelector("h2").textContent = ret.navn;
      klon.querySelector(".Billedenavn").textContent = ret.billednavn;
      klon.querySelector(".Kategori").textContent = ret.kategori;
      klon.querySelector(".Kortbeskrivelse").textContent = ret.kortbeskrivelse;
      /* klon.querySelector(".Langbeskrivelse").textContent = ret.langbeskrivelse; */
      klon.querySelector(".Oprindelsesregion").textContent = ret.oprindelsesregion;
      /* Her tilføjes kr efter pris via konkatinering = "+"*/
      klon.querySelector(".Pris").textContent = ret.pris + " kr.";
      main.appendChild(klon);
    }
  });
}

/* Dette gør at vi får vist vores hentede data i consol loggen i vores inspector i browseren. 
OBS: den skal stå uden for funtionen*/
hentData();
