module.exports = function makeDataHelpers(db) {
  return {
    // returns all pets from the firestore database
    returnAll() {
      const petsRef = db.collection('pets');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets
      return petsRef
        .orderBy('id', 'asc')
        .limit(12)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
        })
        .catch(err => err);
    },
    // returns all pets from the id in the firestore database
    returnNextPets(id) {
      const petsRef = db.collection('pets');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets, after the id given
      return petsRef
        .orderBy('id')
        .startAfter(Number(id)) // convert to number, since stringify/JSON changes it to a string
        .limit(15)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.docs.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
        })
        .catch(err => err);
    },
    returnAllUsers() {
      const userRef = db.collection('users');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets
      return userRef
        .limit(50)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
        })
        .catch(err => err);
    },
    // BELOW ADDED BY JARON AGAIN!!!!
    returnAllEvents() {
      // GET DATE
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; // January is 0!
      const yyyy = today.getFullYear();

      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }

      today = `${yyyy}/${mm}/${dd}`;
      const eventRef = db.collection('events');
      // inits empty array
      const resultArr = [];
      const resultArrDate = [];
      // grabs all the pets under the collection pets
      return eventRef
        .limit(100)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));

          for (let i = 0; i < resultArr.length; i++) {
            // need to toString() the id
            const date = resultArr[i].date.replace(/-/g, '/');
            if (today < date) {
              resultArrDate.push(resultArr[i]);
            }
          }
          return resultArrDate;
          // return resultArr;
        })
        .catch(err => err);
    },
    // below was added by Jaron
    returnAllUsersWithPets() {
      const userRef = db.collection('users');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets
      return userRef
        .where('adopted', '==', true)
        .limit(50)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          this.returnAllUsersWithPets02(resultArr);

          return resultArr;
        })
        .catch(err => err);
    },
    // inserts multiple pets into firestore db
    insertMultiplePets(pets) {
      // creates a batch to insert as a group
      const batch = db.batch();
      const petsRef = db.collection('pets');

      // synchronized for loop to specify the document path and inserting
      for (let i = 0; i < pets.length; i++) {
        // need to toString() the id
        // add only if the pet exists
        if (pets[i].id) {
          batch.set(petsRef.doc(pets[i].id.toString()), pets[i]);
        }
      }
      // commits the batch and returns
      return batch
        .commit()
        .then(result => result)
        .catch(err => err);
    },
    // inserts a new user into the firestore db
    insertNewUser(newUser) {
      // creates a new unique id for a user and adds into user
      const usersRef = db.collection('users').doc();
      newUser.id = usersRef.id;
      // inserts user into the database
      usersRef
        .set(newUser)
        .then(result => usersRef.id)
        .then(err => err);
      return newUser.id;
    },
    // inserts a new message into the firestore db -Jaron Evans
    insertNewMessage(newMessage) {
      // creates a new unique id for a user and adds into user
      const messageRef = db.collection('events').doc();
      newMessage.id = messageRef.id;
      // inserts user into the database
      messageRef
        .set(newMessage)
        .then(result => messageRef.id)
        .then(err => err);
      return newMessage.id;
    },
    // inserts a new message >>> GOING <<< into the firestore db -Jaron Evans
    insertNewMessageGoing(newGoing) {
      const passNewGoing = JSON.stringify(newGoing);
      const resultArr = [passNewGoing];
      const messageRef = db
        .collection('events')
        .doc(newGoing.eventId)
        .get()
        .then((result) => {
          const orgObj = result.data();
          if (orgObj.going == undefined || orgObj.going == null) {
            db.collection('events')
              .doc(newGoing.eventId)
              .update({
                going: resultArr
              });
          } else {
            for (let i = 0; i < orgObj.going.length; i++) {
              resultArr.push(orgObj.going[i]);
            }
            db.collection('events')
              .doc(newGoing.eventId)
              .update({
                going: resultArr
              });
          }
        });
      return resultArr;
    },
    // function to search if username exists in the database, returns user if exists, null if not
    getUserDetails(username) {
      // searches in users collection
      const usersRef = db.collection('users');
      return usersRef
        .where('username', '==', username)
        .get()
        .then((result) => {
          // query returns a querySnapshot, which has an array (.docs) of documentSnapshot
          if (!result.empty) {
            // grabs the first instance of the query
            const outputObj = result.docs[0].data();
            return outputObj;
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    },
    // function to search if username exists in the database, returns user if exists, null if not
    getUserDetailsById(userId) {
      // searches in users collection
      const usersRef = db.collection('users').doc(userId);
      return usersRef
        .get()
        .then((result) => {
          if (result.exists) {
            // returns document snapshot, if exists return data
            if (result.exists) {
              return result.data();
            }
            return null;
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    },
    // function to see if the petId exists in the database, returns pet if exists, null if not
    getPetDetailsById(petId) {
      // searches in users collection
      const petsRef = db.collection('pets').doc(petId.toString());
      return petsRef
        .get()
        .then((result) => {
          // returns document snapshot, if exists return data
          if (result.exists) {
            return result.data();
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    },
    // moves the pet into user.adopted, and deletes from pets collection
    movePet(user, pet) {
      // grabs the refs of the user and pet
      const usersRef = db
        .collection('users')
        .doc(user.id.toString())
        .collection('adopted')
        .doc(pet.id.toString());
      const petsRef = db.collection('pets').doc(pet.id.toString());

      return usersRef
        .set(pet)
        .then(result => result)
        .then(() => petsRef.delete());
    },
    // function to adopt a pet, moves pet from pets collection to a adopted collection in user
    async adoptPet(userId, petId) {
      // specifies the paths
      const usersRef = db
        .collection('users')
        .doc(userId.toString())
        .collection('adopted');
      const petsRef = db.collection('pets').doc(petId.toString());

      // gets the details of the user and pet
      const user = await this.getUserDetailsById(userId);
      const pet = await this.getPetDetailsById(petId);

      if (user && pet) {
        await this.movePet(user, pet);
        await this.setAdoptedTrue(userId);
        Promise.resolve(true);
      } else {
        console.log('something went wrong');
        Promise.resolve(false);
      }
    },
    // sets the adopted flag of user to be true
    setAdoptedTrue(userId) {
      const usersRef = db.collection('users').doc(userId.toString());

      return usersRef
        .update({ adopted: true })
        .then(() => console.log('Adopted'))
        .catch(err => console.log(err));
    },
    // Filter through pets with options provided
    filterPets(options) {
      let queryRef = db.collection('pets').orderBy('id');

      // // filter by size if any
      if (options.size) {
        queryRef = queryRef.where('size', '==', options.size);
      }
      // filter by age if any
      if (options.age) {
        queryRef = queryRef.where('age', '==', options.age);
      }
      // filter by sex if any
      if (options.sex) {
        queryRef = queryRef.where('sex', '==', options.sex);
      }
      // filter by animal if any
      if (options.animal) {
        queryRef = queryRef.where('animal', '==', options.animal);
      }

      // sets the index and query start point
      if (options.lastPet) {
        queryRef = queryRef.startAfter(Number(options.lastPet));
      }

      // executes query
      return queryRef
        .limit(12)
        .get()
        .then((snap) => {
          // query not empty
          if (!snap.empty) {
            const resultArr = [];
            for (let i = 0; i < snap.size; i++) {
              resultArr.push(snap.docs[i].data());
            }
            return resultArr;
          }
          return {};
        });
    },
    // saves breeds into the db accordingly
    saveBreeds(type, breeds) {
      // creates a batch to insert as a group
      const batch = db.batch();
      const breedsRef = db
        .collection('breeds')
        .doc(`${type.toString()}Breeds`)
        .collection(type.toString());

      // synchronized for loop to specify the document path and inserting
      for (let i = 0; i < breeds.length; i++) {
        // need to toString() the name
        batch.set(breedsRef.doc(breeds[i].name.toString()), breeds[i]);
      }
      // commits the batch and returns
      return batch
        .commit()
        .then(result => result)
        .catch(err => err);
    },
    // gets all the breeds of that type
    getBreeds(type) {
      const breedsRef = db
        .collection('breeds')
        .doc(`${type.toString()}Breeds`)
        .collection(type.toString());

      const resultArr = [];
      // grabs all the breeds under the collection pets
      return breedsRef
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
        })
        .catch(err => err);
    },
    // saves the pet care info into the db
    saveInfo(typeAnimal, id, info) {
      const infoRef = db
        .collection('info')
        .doc(`${typeAnimal.toString()}Breeds`)
        .collection(typeAnimal.toString())
        .doc(id.toString());

      // sets the breed of info as breed
      info.breed = id;
      return infoRef.set(info).then(() => info);
    },
    // returns all the pets of the userId
    getUserPetsByUserId(userId) {
      const userRef = db
        .collection('users')
        .doc(userId.toString())
        .collection('adopted');

      return userRef.get().then((snapshot) => {
        const pets = [];
        snapshot.forEach(pet => pets.push(pet.data()));
        return pets;
      });
    },
    getUsersWithPets() {
      const userRef = db.collection('users');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets
      return userRef
        .where('adopted', '==', true)
        .get()
        .then(async (snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          for (const doc of snapshot.docs) {
            const user = doc.data();
            const userId = user.id;
            const petsArr = await this.getUserPetsByUserId(userId);
            user.pets = petsArr;
            resultArr.push(user);
          }
          return resultArr;
        });
    },
    getUserWithPets(userId) {
      const userRef = db.collection('users').doc(userId.toString());
      return userRef.get().then(async (doc) => {
        const user = doc.data();
        const petsArr = await this.getUserPetsByUserId(userId);
        user.pets = petsArr;
        return user;
      });
    },
    // get information of the breed given
    getBreedInfo(ref) {
      return ref
        .get()
        .then(result => result.data())
        .catch((err) => {
          console.log('error');
        });
    },
    // returns an object with the breeds information of each breed given
    async getAllBreedInfo(breeds) {
      const outputObj = {
        cat: [],
        dog: []
      };
      const catRef = db
        .collection('info')
        .doc('catBreeds')
        .collection('cat');
      const dogRef = db
        .collection('info')
        .doc('dogBreeds')
        .collection('dog');

      // saves the array of the breeds, if single elem wrap in array
      const catBreeds = breeds.cat instanceof Array ? breeds.cat : [breeds.cat];
      const dogBreeds = breeds.dog instanceof Array ? breeds.dog : [breeds.dog];

      // synchronous for loop to grab the cat breeds
      for (let i = 0; i < catBreeds.length; i++) {
        const ref = catRef.doc(catBreeds[i].toString());
        const breedInfo = await this.getBreedInfo(ref);
        outputObj.cat.push(breedInfo);
      }

      // synchronous for loop to grab the dog breeds
      for (let i = 0; i < dogBreeds.length; i++) {
        const ref = dogRef.doc(dogBreeds[i].toString());
        const breedInfo = await this.getBreedInfo(ref);
        outputObj.dog.push(breedInfo);
      }
      return Promise.resolve(outputObj);
    }
  };
};
