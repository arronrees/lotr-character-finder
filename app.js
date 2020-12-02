function audio() {
  document.querySelector('.soundtrack').volume = 0.5;
}

audio();

let query = '';
const regUrl = 'https://the-one-api.dev/v2/character?name=/';
const nameUrl = 'https://the-one-api.dev/v2/character?name=';
const key = 'TcI-mcyMlwfV7qVRvvPO';

const form = document.querySelector('.searchForm');
const input = document.querySelector('.inputName');

const nameDiv = document.querySelector('.name');
const realmDiv = document.querySelector('.realm');
const birthDiv = document.querySelector('.birth');
const deathDiv = document.querySelector('.death');
const raceDiv = document.querySelector('.race');
const genderDiv = document.querySelector('.gender');
const findMoreLink = document.querySelector('.findMore a');

const searchResults = document.querySelector('.searchResults');

// Fetches and returns data as json
async function fetchData(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${key}`,
    },
  });

  const data = await dataFetch.json();

  return data;
}

async function generateSearch(url) {
  const data = await fetchData(url);

  // Finds all related characters to what was searched and places in html
  const searchResult = data.docs;
  let searchHtml = ``;
  for (let i = 0; i < searchResult.length; i++) {
    searchHtml += `<a>${data.docs[i].name}</a>`;
  }
  searchResults.innerHTML = searchHtml;

  // Adds event listener to each search result and will call function to generate details based on name clicked
  searchResults.childNodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      query = e.target.outerText;

      // Populates details using nameUrl as prevents brackets () being caught in regex
      const url = nameUrl + `${query}`;
      generateDetails(url);
      searchResults.innerHTML = `<p class="selected">${query}</p>`;
    });
  });
}

async function generateDetails(url) {
  const data = await fetchData(url);

  nameDiv.innerHTML = `<span>Name - </span>${data.docs[0].name}`;
  realmDiv.innerHTML = `<span>Realm - </span>${data.docs[0].realm}`;
  birthDiv.innerHTML = `<span>Birth - </span>${data.docs[0].birth}`;
  deathDiv.innerHTML = `<span>Death - </span>${data.docs[0].death}`;
  raceDiv.innerHTML = `<span>Race - </span>${data.docs[0].race}`;
  genderDiv.innerHTML = `<span>Gender - </span>${data.docs[0].gender}`;
  findMoreLink.innerHTML = '<span>Click to Find out more!</span>';
  findMoreLink.href = data.docs[0].wikiUrl;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  query = input.value;
  const url = regUrl + `${query}/i`;
  generateSearch(url);

  input.value = '';
});
