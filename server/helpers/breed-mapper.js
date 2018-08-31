const map = {
  'American Bulldog': 'Bulldog',
  Corgi: 'Pembroke Welsh Corgi',
  'Welsh Corgi': 'Pembroke Welsh Corgi',
  Terrier: 'Scottish Terrier',
  'Yorkshire Terrier Yorkie': 'Yorkshire Terrier',
  'Shetland Sheepdog Sheltie': 'Shetland Sheepdog',
  Hound: 'Greyhound',
  'English Bulldog': 'Bulldog',
  'Thai Ridgeback': 'Rhodesian Ridgeback',
  Dachshund: 'Dachshund (Standard)',
  Spitz: 'Finnish Spitz',
  'Treeing Walker Coonhound': 'American Foxhound',
  Foxhound: 'American Foxhound',
  'American Eskimo Dog': 'American Eskimo Dog (Standard)'
};

module.exports = function breedMap(breeds) {
  const mappedBreeds = {
    cat: [],
    dog: []
  };

  breeds.Cat.forEach((catBreed) => {
    if (map[catBreed]) {
      mappedBreeds.cat.push(map[catBreed]);
    } else {
      mappedBreeds.cat.push(catBreed);
    }
  });

  breeds.Dog.forEach((dogBreed) => {
    if (map[dogBreed]) {
      mappedBreeds.dog.push(map[dogBreed]);
    } else if (dogBreed !== 'Mixed Breed') {
      mappedBreeds.dog.push(dogBreed);
    }
  });

  return mappedBreeds;
};
