const express = require('express');
const app = express();
const port = 3000;

const animals = [
  { id: 1, name: 'Koala', image: 'https://media.istockphoto.com/id/519731334/photo/young-koala.jpg?s=612x612&w=0&k=20&c=Po_L33-L7izPCCE0tYVqZFA1aSMJqJuFqQZD9LIz4JU=', votes: 0 },
  { id: 2, name: 'Hamster', image: 'https://a-z-animals.com/media/2022/01/isolated-dwarf-hamster.jpg', votes: 0 },
  { id: 3, name: 'Cat', image: 'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*', votes: 0 }
];

app.use(express.json());

app.get('/animals', (req, res) => {
  res.json(animals);
});

app.get('/animals/:id', (req, res) => {
  const animalId = parseInt(req.params.id);
  const animal = animals.find(animal => animal.id === animalId);

  if (!animal) {
    res.status(404).json({ error: 'Animal not found' });
  } else {
    res.json(animal);
  }
});

app.put('/animals/:id/vote', (req, res) => {
  const animalId = parseInt(req.params.id);
  const animal = animals.find(animal => animal.id === animalId);

  if (!animal) {
    res.status(404).json({ error: 'Animal not found' });
  } else {
    animal.votes++;
    res.json(animal);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
