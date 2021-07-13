const yearContainer = document.querySelector("#year-container");
const animalContainer = document.querySelector("#animals-container");

let animalFacts = [];
let yearInformation = {};

fetch("http://numbersapi.com/2000..2020/year")
  .then((response) => response.json())
  .then((data) => yearInformation = data)
  .then(() => showYearInformation());

const showYearInformation = () => {
  for (let property in yearInformation) {
    let dataInformation = document.createElement("div");
    dataInformation.classList.add('year');
    dataInformation.innerHTML = `<h3>${property}</h3>
      <p>${yearInformation[property]}</p>`;
    yearContainer.appendChild(dataInformation);
  }
};



fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=5")
  .then((response) => response.json())
  .then((data) => animalFacts.push(...data))
  .then(() => showAnimalInformation());

 const showAnimalInformation = () => {
   for (let i = 0; i < animalFacts.length; i++) {
     let fact = animalFacts[i];
     let dataInformation = document.createElement("div");
     dataInformation.classList.add("animal-fact");
     dataInformation.innerHTML = fact.text;

     animalContainer.appendChild(dataInformation);
   }
 }
