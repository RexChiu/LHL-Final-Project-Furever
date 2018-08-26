function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = function santizePetfinder(json) {
  // const sanitizedJson = json.petfinder.pets.pet;

  json.petfinder.pets.pet.forEach((elem) => {
    // guard statement for no photos
    if (elem.media.photos.photo === '') {
      console.log('\n\nNo Photo!\n\n');
      elem = '';
    }

    // // sanitize pet.breeds.breed to pet.breed
    // elem.breed = elem.breeds.breed;
    // delete elem.breeds;

    // console.log(`Elem: ${JSON.stringify(elem)}`);

    // // sanitize pet.media.photos.photo to pet.photos
    // elem.photos = elem.media.photos.photo;
    // delete elem.media;

    // // sanitize pet.options.option to pet.options
    // const options = elem.options.option;
    // delete elem.options;
    // // not an array, put into array
    // if (options && !(options instanceof Array)) {
    //   elem.options = [options];
    // } else {
    //   elem.options = options || '';
    // }

    // sanitize pet.name to remove all caps
    // elem.name = capitalizeFirstLetter(elem.name);
  });

  return json.petfinder.pets.pet;
};
