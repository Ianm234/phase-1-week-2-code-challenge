const animalList = document.querySelector('.animal-list');
const animalDetails = document.querySelector('.animal-details');

// Fetch animal data from the server
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(data => displayAnimalList(data))
  .catch(error => console.error('Error:', error));

function displayAnimalList(animals) {
  animalList.innerHTML = '';
  animals.forEach(animal => {
    const animalCard = document.createElement('div');
    animalCard.classList.add('animal-card');
    
    const animalName = document.createElement('h3');
    animalName.textContent = animal.name;
    animalCard.appendChild(animalName);
    
    const animalImage = document.createElement('img');
    animalImage.src = animal.image;
    animalCard.appendChild(animalImage);
    
    animalCard.addEventListener('click', () => displayAnimalDetails(animal.id));
    
    animalList.appendChild(animalCard);
  });
}

function displayAnimalDetails(animalId) {
  fetch(`http://localhost:3000/characters/${animalId}`)
    .then(response => response.json())
    .then(animal => {
      animalDetails.innerHTML = '';

      const animalName = document.createElement('h2');
      animalName.textContent = animal.name;
      animalDetails.appendChild(animalName);

      const animalImage = document.createElement('img');
      animalImage.src = animal.image;
      animalDetails.appendChild(animalImage);

      const votesCount = document.createElement('p');
      votesCount.textContent = `Votes: ${animal.votes}`;
      animalDetails.appendChild(votesCount);

      const voteButton = document.createElement('button');
      voteButton.textContent = 'Vote';
      voteButton.addEventListener('click', () => {
        animal.votes++;
        votesCount.textContent = `Votes: ${animal.votes}`;
      });
      animalDetails.appendChild(voteButton);
    })
    .catch(error => console.error('Error:', error));
}
