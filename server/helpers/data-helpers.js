module.exports = function makeDataHelpers(db) {
  return {
    // returns all pets from the firestore database
    returnAll() {
      const petsRef = db.collection('pets');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets
      return petsRef
        .orderBy('id', 'desc')
        .limit(1)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
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
        .limit(100)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
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
        .limit(100)
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          console.log('result', resultArr);
          this.returnAllUsersWithPets02(resultArr);

          return resultArr;
        })
        .catch(err => err);
    },
    returnAllUsersWithPets02(array) {
      const userRef = db.collection('users');
      const petsArr = [];
      array.forEach((element) => {
        const tempId = element.id;
        console.log('ID', tempId);
        // above is to isolate UserID
        // this.db.collection('users').collection('adopt').get().
        // then(snapshot) => {
        //   console.log(snapshot);
        // console.log(userRef.tempId);
      });
    },
    // above was added by Jaron
    // inserts multiple pets into firestore db
    insertMultiplePets(pets) {
      // creates a batch to insert as a group
      const batch = db.batch();
      const petsRef = db.collection('pets');

      // synchronized for loop to specify the document path and inserting
      for (let i = 0; i < pets.length; i++) {
        // need to toString() the id
        batch.set(petsRef.doc(pets[i].id.toString()), pets[i]);
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
      console.log(`userId: ${userId}, petId: ${petId}`);
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
        console.log('user and pet exists');
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
      let queryRef = db.collection('pets');
      console.log(options);
      const keys = Object.keys(options);
      const values = Object.values(options);

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

      // executes query
      return queryRef
        .orderBy('id', 'desc')
        .limit(1)
        .get()
        .then((snap) => {
          // query not empty
          if (!snap.empty) {
            console.log('Not Empty!');
            const resultArr = [];
            for (let i = 0; i < snap.size; i++) {
              resultArr.push(snap.docs[i].data());
            }
            return resultArr;
          }
          // no queries
          console.log('Empty!');
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
    }
  };
};
