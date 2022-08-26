const endpoint = "https://babushka-dd8a.restdb.io/rest/menu";
const mereinfo = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};
async function hentData() {
  const respons = await fetch(endpoint, mereinfo);
  const json = await respons.json();
  vis(json);
}

function vis(retter) {
  console.log(retter);
  const main = document.querySelector("#indhold");
  const template = document.querySelector("template").content;
  retter.forEach((ret) => {
    const klon = template.cloneNode(true);
    klon.querySelector(".billede").src = "/billeder" + ret.billede;
    klon.querySelector("h2").textContent = ret.navn;
    klon.querySelector(".Billedenavn").textContent = ret.billedenavn;
    klon.querySelector(".Kategori").textContent = ret.kategori;
    klon.querySelector(".Kortbeskrivelse").textContent = ret.kortbeskrivelse;
    /* klon.querySelector(".Langbeskrivelse").textContent = ret.langbeskrivelse; */
    klon.querySelector(".Oprindelsesregion").textContent = ret.Oprindelsesregion;
    klon.querySelector(".Pris").textContent = ret.pris + " kr.";
    main.appendChild(klon);
  });
}

hentData();
