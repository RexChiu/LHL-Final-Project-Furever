function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = function santizePetfinder(json) {
  json = json.petfinder.pets.pet;

  // synchronous for loop
  for (let i = 0; i < json.length; i++) {
    // guard statements to delete element if missing values
    // no pictures
    if (json[i].media === '') {
      console.log(`No Picture: ${json[i].id}`);
      json[i] = '';
      continue;
    }
    // no breeds info
    if (json[i].breeds === undefined) {
      console.log(`No Breeds: ${json[i].id}`);
      json[i] = '';
      continue;
    }

    // sanitize pet.breeds.breed to pet.breeds
    if (json[i].breeds.breed instanceof Array) {
      json[i].breed = json[i].breeds.breed.join(' and ');
    } else {
      json[i].breed = json[i].breeds.breed;
    }
    delete json[i].breeds;

    // // sanitize pet.media.photos.photo to pet.photos
    json[i].photos = [];
    for (let j = 0; j < json[i].media.photos.photo.length; j++) {
      if (json[i].media.photos.photo[j].includes('x.jpg')) {
        json[i].photos.push(json[i].media.photos.photo[j]);
      }
    }
    delete json[i].media;

    // sanitize pet.options.option to pet.options
    const options = json[i].options.option;
    delete json[i].options;
    // not an array, put into array
    if (options && !(options instanceof Array)) {
      json[i].options = [options];
    } else {
      json[i].options = options || '';
    }

    // sanitize pet.name to remove all caps
    json[i].name = capitalizeFirstLetter(json[i].name);
  }

  return Promise.resolve(json);
};
