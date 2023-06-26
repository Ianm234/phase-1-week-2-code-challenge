
const animalList = document.querySelector('.animal-list');
const animalDetails = document.querySelector('.animal-details');

function fetchAnimals() {
  fetch('/animals')
    .then(response => response.json())
    .then(animals => {
      renderAnimals(animals);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


function renderAnimals(animals) {
  animalList.innerHTML = '';
  animals.forEach(animal => {
    const animalCard = createAnimalCard(animal);
    animalList.appendChild(animalCard);
  });
}


function createAnimalCard(animal) {
  const animalCard = document.createElement('li');
  animalCard.className = 'animal-card';
  animalCard.innerHTML = `
    <img src="${animal.image}" alt="${animal.name}">
    <h3>${animal.name}</h3>
    <p>Votes: ${animal.votes}</p>
    <button class="vote-button">Vote</button>
  `;

  const voteButton = animalCard.querySelector('.vote-button');
  voteButton.addEventListener('click', () => {
    voteForAnimal(animal.id);
  });

  return animalCard;
}

function voteForAnimal(animalId) {
  fetch(`/animals/${animalId}/vote`, { method: 'PUT' })
    .then(response => response.json())
    .then(updatedAnimal => {
      updateVotes(updatedAnimal);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function updateVotes(animal) {
  const animalCard = document.querySelector('.animal-card');
  const voteCount = animalCard.querySelector('p');
  voteCount.textContent = `Votes: ${animal.votes}`;
}

fetchAnimals();
