import express from 'express';
import bcrypt from 'bcrypt';

import UserSerializer from '../serializers/user';
import PetsSerializer from '../serializers/pets';

const router = express.Router();
const SALT_ROUNDS = 10;

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/register', async (req, res) => {
    // guard statment for existing username
    const exists = await dataHelpers.getUserDetails(req.body.username);
    if (exists) {
      res.sendStatus(401);
      return;
    }

    // generates a password hash
    const passwordDigest = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    // constructs an user object to send to db
    const inputObj = {
      username: req.body.username,
      passwordDigest,
      lat: req.body.lat,
      lng: req.body.lng,
      adopted: req.body.adopted
    };

    // grabs userId from successful db insert
    const id = await dataHelpers.insertNewUser(inputObj);

    // constructs return obj and serializes it
    delete inputObj.passwordDigest;
    const returnObj = inputObj;
    const jsonOutput = UserSerializer.serialize(returnObj);
    res.json(jsonOutput);
  });

  router.post('/login', async (req, res) => {
    const inputObj = {
      username: req.body.username,
      password: req.body.password
    };

    // grab user details with login details
    const user = await dataHelpers.getUserDetails(req.body.username);

    // guard statment for no existing user
    if (!user) {
      res.sendStatus(401);
      return;
    }

    // using bcrypt to check password match
    const match = await bcrypt.compare(inputObj.password, user.passwordDigest);

    if (match) {
      delete user.passwordDigest;
      const jsonOutput = UserSerializer.serialize(user);
      res.json(jsonOutput);
    } else {
      res.sendStatus(401);
    }
  });

  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAllUsers();

    console.log(result);

    const jsonOutput = UserSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  router.get('/withpets', async (req, res) => {
    const result = await dataHelpers.getUsersWithPets();

    const jsonOutput = UserSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  router.get('/:id/withpets', async (req, res) => {
    // hardcoded response to not keep querying the database
    if (req.params.id == 'pVVdKI8xVFQpmKDYOC3b') {
      res.json({
        data: {
          type: 'users',
          id: 'pVVdKI8xVFQpmKDYOC3b',
          attributes: {
            id: 'pVVdKI8xVFQpmKDYOC3b',
            lat: 43.650033099999995,
            lng: -79.391594,
            adopted: true,
            username: 't',
            pets: [
              {
                'shelter-id': 'ON155',
                id: 22437815,
                size: 'M',
                age: 'Adult',
                photos: [
                  'http://photos.petfinder.com/photos/pets/22437815/1/?bust=1395765423&amp;width=500&amp;-x.jpg',
                  'http://photos.petfinder.com/photos/pets/22437815/2/?bust=1395765424&amp;width=500&amp;-x.jpg'
                ],
                contact: {
                  address1: '',
                  fax: '',
                  zip: 'M4X 1G7',
                  city: 'Toronto',
                  address2: '',
                  state: 'ON',
                  email: 'catbusters00@yahoo.ca',
                  phone: ''
                },
                breed: 'Domestic Short Hair and Tuxedo',
                mix: 'yes',
                animal: 'Cat',
                description:
                  "Jojo is a great boy.  He is a very t alkative guy, and wants he getsto know you, he's a big big purring suck..",
                options: ['altered', 'hasShots', 'housetrained'],
                'last-update': '2012-03-09T12:09:44Z',
                status: 'A',
                sex: 'M',
                'shelter-pet-id': 'CBAR0316/11',
                name: 'Jojo'
              },
              {
                breed: 'Shih Tzu',
                mix: 'no',
                animal: 'Dog',
                description:
                  "PLEASE NOTE: Sylvester is available for sponsorship only. Palliative care can be very costly. Compassionate and loving foster parents open their hearts and homes; donating their time, providing nutritious food, and socializing and training the dogs in their care. But,without the financial support of donors, none of this would be possible. Dogs like Sylvester need more than love: they need vital veterinary care. Pomeranian and Small Breed Rescue relies on the generosity of donors to cover the cost of medication and procedures required to keep dogs like Sylvester comfortable during their remaining days. If you would like to make a donation in support of Sylvester's care please let us know!\n\n\n*UPDAYE*\nFebruary 2015\n\nHi,  Silvester here.  Well it is 2015.  My New Year’s resolution is to spend quality time with all of my toys. They  say my heart condition has degraded from a 3 to a 4, but I say what’s in a number. Since I was a death row dog that was granted a pardon because ofPSBR,   I just enjoy every minute of my life. For Christmas I gota new toy to add to my collection.  I have so many that they havetheir own bed, but I love them all.  I share them with my sister Ginger.  Well actually I don’t share them, she comes and takes them right out of my mouth.   In addition to my toys I also love treats.    We have 3 dog cookie jars here, because we all get to have our favorite treat.  Nothing like sitting on Mom or Dads lap, witha toy by my side and a treat in my mouth.  Thank you PSBR for rescuing me and giving me the opportunity to give and receive love.\n\n-----------------------------------------------\n\nFoster ParentReport - May 2013\nHello! Silvester here. Just thought I would drop you all a note to let you know how things are going.  There hasbeen no progression with my heart murmur, even though it is quitesignificant. You would never even know that I had one. Yes, I do snore, but the vet said that is because of my cute little flat face. Yes she did say cute, and also added that I have the most beautiful brown eyes!\nMy favourite activity is visiting the pet store,because I always managed to come home with a new stuffed toy. I like to put them in a circle all around me and then sleep in the middle. I also like to take them for walks.\nI get along really wellwith my foster brothers and sisters. I don’t get upset if they eat my food or land on me when they jump off the bed. I also get along really well with the little human visitors that come to see me.\nI don’t like to get groomed, but I tolerate it. I don’t like to be carried around either, because it makes me feel uncomfortable. But I am OK when I have to be picked up.\nI love to be with my peeps, inside or outside. I will lie quietly in my bed or chase one of my stuffed toys.  I like to go for walks or just hang around on the patio.  I do like to sing a little, but not too much.  \nMy foster family tells me all the time how much they love me and that they wish the other furballs were as well behaved as I am.\nThat isall for now. Catch you later, got to figure out where I left Bullwinkle…\nNote from Silvester's Foster Parents:\nWhile Silvester does have a fairly significant heart murmur, there has been no change in his activity or his appearance of good health while in fostercare. However, we do feel that it is important to make potential adopters aware of the possibility that he may need more medicationto control his heart murmur in the future. We encourage you to speak with you vet to ensure that you have a full and complete understanding of the possible implications of Silvester's heart murmur before apply to adopt.\n\n \nFoster Parent Report - August 2012\nThis pint-sized gem with the huge round eyes is Silvester. He was found as a stray so little is known about his background but the shelter saw his great potential and called PSBR to rescue him.  As we’ve discovered, his Houdini-like skills at escaping a body harness certainly explain how he may have ended up in the shelter in thefirst place.\nNot only is Silvester super cute, he has the personality to match! He is extremely sociable and gets along with everyone, but he needs a bit of time to size-up new friends before feeling comfortable. Not only does he love to intereact with his humanand fur companions, he also knows how to entertain himself and hecan often be found in his dog-bed playing with his toys. Silvester also loves cuddling on the couch, going on car rides and enjoying the outside in general as long as the weather is good. One thinghe is not fond of is being restrained for grooming or vet examinations. Although he does issue warning growls, he has shown a penchant to nip but has never broken skin.\nSilvester is currently being fostered in a rural area and his foster parents learned quickly that he should always be leashed before approaching the door to gooutside. Although he is very obedient in general, he has a very strong desire to chase the wild-life, preferably rabbits, and will bolt like lightening. Silvester is very fast and he is absolutely relentless in trying to catch these critters. When he is not distracted, he walks very nicely on a leash; no pulling or tugging and he stays close to the pack. He is also a part-time fly catcher andwatches them with laser-like focus before snacking on the ones heactually catches, much like a cat. Silvester also knows the basicobedience commands. When he hears the crinkle sound of the treat bag, his rear-end is automatically planted on the floor in anticipation of the reward.\nSilvester has one of the cutest barks ever. He seems to imitate a little wolf by staring up at the sky and howling. He probably wouldn't be an ideal apartment dog as he is veryvocal when he hears the door or noises in the house that he's notquite sure about. An added bonus for his future family is that heis impeccably house-trained and has no separation anxiety to speak of.\nAlthough you'd never guess from the way he behaves, Silvester has a grade 4 heart murmur which is being successfully treated with a daily dose of Fortekor. Despite being a little spitfire, wehave never seen Silvester out-of-breath or coughing excessively; he clearly knows his physical limits and stays within them. He wasalso neutered recently and the pre-op blood tests showed that he is in excellent health otherwise. After his surgery, he was back to his normal self by the next morning.\nIf Silvester sounds like the perfect addition to your family, we’d love to hear from you!\n\nI am - a male Shih Tzu cross (tan and white)\nAge - 6 years\nWeight - 11lbs\nSheds - No\nExercise Needs - Moderate\nBarking - Yes, mainly at unknown noises\nHousetrained? Yes\nGood with\n\nDogs? Yes\nCats? Unknown but probably not\nKids? Not under 12 years\n\nCurrently being fostered in the city of: Caledon\n\n\nNotes from the Rescue \nThis dog's adoption fee is $250.00\nAll applicants must be 25 yrs or older \nApplicants must be within 3 hr driving distance from Hamilton ON, and reside in Canada\nPlease advise your vet and personal reference that we will be calling\n\nPomeranian and Small Breed Rescue is not a kennel facility, all of our dogs live involunteers' homes. For their security, only approved adopters mayvisit the dogs at the foster home. Keep an eye on our website andPetfinder listings for upcoming meet and greet events that are open to the public.\n\nTo complete an adoption application, please visit http://www.psbrescue.com/PSBRescue/Adopt_App_2.html \n\nTo make a donation and assist us with saving future dogs, please visit http://www.psbrescue.com/PSBRescue/Donate.html\n\n\n***********************************************************\nPSBR is urgently looking for new Foster Homes, if you can help us, please visit www.PSBRescue.com and fill in a Foster Application \n***********************************************************",
                options: ['altered', 'hasShots', 'housetrained', 'noKids'],
                'last-update': '2012-08-27T07:10:34Z',
                status: 'A',
                sex: 'M',
                'shelter-pet-id': '',
                name: 'Silvester - sponsorship only',
                'shelter-id': 'ON56',
                id: 23954732,
                size: 'S',
                age: 'Adult',
                photos: [
                  'http://photos.petfinder.com/photos/pets/23954732/1/?bust=1423493588&amp;width=500&amp;-x.jpg',
                  'http://photos.petfinder.com/photos/pets/23954732/2/?bust=1348696504&amp;width=500&amp;-x.jpg',
                  'http://photos.petfinder.com/photos/pets/23954732/3/?bust=1348696514&amp;width=500&amp;-x.jpg'
                ],
                contact: {
                  phone: '',
                  address1: '',
                  fax: '',
                  zip: 'L7E 5T3',
                  address2: '',
                  city: 'Bolton',
                  state: 'ON',
                  email: 'anne@lemontreemarketing.ca'
                }
              },
              {
                mix: 'yes',
                animal: 'Cat',
                description:
                  "Since you're here...... don’t miss out on the love of your life.\n\nIntroducing:\nSummer\n\nApproximate DOB: July 6, 2017\n\nOh those lazy days of our girl “Summer”.She loves to sprawl out on the floor, stretched out to the max, in the warm sunshine. How relaxed and comfortable she is around hertribe (foster family and her other kitty friends). If you find her sprawled out on her back she’s inviting you to give her a gentletummy rub. It will just warm your heart, as it looks like she busts out into the biggest smile.\n\nSummer is a lovely little relaxed tuxedo girl. She sports a fashionable black sable coat paired with snow white accents. A pair of golden amber eyes are so expressive of her loyalty to her favourite person. She’s just gorgeous.\n\nOne of Summer’s favourite past times is to play with her toys. Throw her toy mouse and watch her take off leaving everybody in her dust. Pull a string along the floor and she will relentlessly be in hot pursuit. She just adores playtime and after will longingly look to cuddle with you. She is exceptionally loving and full of personality.\n\nLittle Summer will have some great conversations with you. She has the sweetest meow to let you know she would love togive you some attention and when to feed her.\n\nWouldn't you like to have some Summer fun in your home?\n\nConsider filling out anadoption form for our girl today. 8/27/18 3:26 PM",
                options: ['altered', 'hasShots', 'housetrained'],
                'last-update': '2018-08-28T22:42:33Z',
                status: 'A',
                sex: 'F',
                'shelter-pet-id': 13469401,
                name: 'Summer',
                'shelter-id': 'ON467',
                id: 42595201,
                size: 'S',
                age: 'Young',
                photos: [
                  'http://photos.petfinder.com/photos/pets/42595201/1/?bust=1535510371&amp;width=500&amp;-x.jpg',
                  'http://photos.petfinder.com/photos/pets/42595201/2/?bust=1535510371&amp;width=500&amp;-x.jpg',
                  'http://photos.petfinder.com/photos/pets/42595201/3/?bust=1535510372&amp;width=500&amp;-x.jpg'
                ],
                contact: {
                  phone: '(647) 293-6570',
                  address1: '',
                  fax: '',
                  zip: 'L4C 0C9',
                  city: 'Richmond Hill',
                  address2: '',
                  state: 'ON',
                  email: 'rescueangels@mail.com'
                },
                breed: 'Domestic Short Hair and Tuxedo'
              },
              {
                age: 'Adult',
                photos: [
                  'http://photos.petfinder.com/photos/pets/42595724/1/?bust=1535511156&amp;width=500&amp;-x.jpg'
                ],
                contact: {
                  fax: '',
                  zip: 'M1H 2X4',
                  address2: '',
                  city: 'Toronto',
                  state: 'ON',
                  email: '',
                  phone: '416-338-7539',
                  address1: '821 Progress Avenue'
                },
                breed: 'Siamese',
                mix: 'no',
                animal: 'Cat',
                description: '',
                options: ['altered'],
                'last-update': '2018-08-28T23:10:06Z',
                status: 'A',
                sex: 'M',
                'shelter-pet-id': 'A812273',
                name: 'Simon',
                'shelter-id': 'ON217',
                id: 42595724,
                size: 'L'
              }
            ]
          }
        }
      });
      console.log('returning hardcoded data');
      return;
    }
    const result = await dataHelpers.getUserWithPets(req.params.id);

    const jsonOutput = UserSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  // gets the pets of the user
  router.get('/:id/pets', async (req, res) => {
    try {
      const pets = await dataHelpers.getUserPetsByUserId(req.params.id);
      const jsonOutput = PetsSerializer.serialize(pets);
      // const jsonOutput = result;
      res.json(jsonOutput);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });

  //   THIS MUST BE THE LAST ROUTE!!!!!!!!  ///
  // get details of the user
  router.get('/:id', async (req, res) => {
    try {
      const user = await dataHelpers.getUserDetailsById(req.params.id);
      const jsonOutput = UserSerializer.serialize(user);
      // const jsonOutput = result;
      res.json(jsonOutput);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });
  //   THE ABOVE MUST BE THE LAST ROUTE!!!! ///

  return router;
};
