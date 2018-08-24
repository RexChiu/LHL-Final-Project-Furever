import express from 'express';
import parser from 'fast-xml-parser';

import PetsSerializer from '../serializers/pets';
import sanitizePetfinder from '../helpers/sanitize-petfinder';
import firebaseConverter from '../helpers/convert-json-to-firebase';
import petfinder from '../api/petfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', (req, res) => {
    const result = dataHelpers.findAll();

    const jsonOutput = PetsSerializer.serialize(result);
    res.json(jsonOutput);
  });

  router.get('/test', async (req, res) => {
    const result = await dataHelpers.returnAll();

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/populate', async (req, res) => {
    const options = {
      location: 'toronto,ontario',
      output: 'full'
    };
    let result = await petfinder('pet.find', options);
    result = firebaseConverter(result);

    res.json(result);
  });

  router.get('/parse', (req, res) => {
    const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
    <petfinder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://api.petfinder.com/schemas/0.9/petfinder.xsd">
        <header>
            <version>0.1</version>
            <timestamp>2018-08-24T16:08:00Z</timestamp>
            <status>
                <code>100</code>
                <message />
            </status>
        </header>
        <lastOffset>5</lastOffset>
        <pets>
            <pet>
                <id>42376725</id>
                <shelterId>ON218</shelterId>
                <shelterPetId>A812017</shelterPetId>
                <name>MIKEE</name>
                <animal>Cat</animal>
                <breeds>
                    <breed>Domestic Short Hair</breed>
                </breeds>
                <mix>no</mix>
                <age>Young</age>
                <sex>F</sex>
                <size>S</size>
                <options>
                    <option>altered</option>
                </options>
                <description>
                    <![CDATA[i am available for adoption with my sister, we are a bonded pair, at Laird and Eglinton, 835 Eglinton Ave East!]]>
                </description>
                <lastUpdate>2018-08-03T22:28:41Z</lastUpdate>
                <status>A</status>
                <media>
                    <photos>
                        <photo id="1" size="pnt">http://photos.petfinder.com/photos/pets/42376725/1/?bust=1533347536&amp;width=60&amp;-pnt.jpg</photo>
                        <photo id="1" size="fpm">http://photos.petfinder.com/photos/pets/42376725/1/?bust=1533347536&amp;width=95&amp;-fpm.jpg</photo>
                        <photo id="1" size="x">http://photos.petfinder.com/photos/pets/42376725/1/?bust=1533347536&amp;width=500&amp;-x.jpg</photo>
                        <photo id="1" size="pn">http://photos.petfinder.com/photos/pets/42376725/1/?bust=1533347536&amp;width=300&amp;-pn.jpg</photo>
                        <photo id="1" size="t">http://photos.petfinder.com/photos/pets/42376725/1/?bust=1533347536&amp;width=50&amp;-t.jpg</photo>
                    </photos>
                </media>
                <contact>
                    <address1>1300 Sheppard Avenue West</address1>
                    <address2 />
                    <city>Toronto</city>
                    <state>ON</state>
                    <zip>M3K 2A6</zip>
                    <phone>416-338-8723</phone>
                    <fax />
                    <email />
                </contact>
            </pet>
            <pet>
                <id>42376726</id>
                <shelterId>ON218</shelterId>
                <shelterPetId>A812018</shelterPetId>
                <name>MILLO</name>
                <animal>Cat</animal>
                <breeds>
                    <breed>Domestic Short Hair</breed>
                </breeds>
                <mix>no</mix>
                <age>Young</age>
                <sex>F</sex>
                <size>M</size>
                <options>
                    <option>altered</option>
                </options>
                <description>
                    <![CDATA[i am available for adoption with my sister, we are a bonded pair, at Laird and Eglinton, 835 Eglinton Ave East!]]>
                </description>
                <lastUpdate>2018-08-03T22:28:41Z</lastUpdate>
                <status>A</status>
                <media>
                    <photos>
                        <photo id="1" size="pnt">http://photos.petfinder.com/photos/pets/42376726/1/?bust=1533347533&amp;width=60&amp;-pnt.jpg</photo>
                        <photo id="1" size="fpm">http://photos.petfinder.com/photos/pets/42376726/1/?bust=1533347533&amp;width=95&amp;-fpm.jpg</photo>
                        <photo id="1" size="x">http://photos.petfinder.com/photos/pets/42376726/1/?bust=1533347533&amp;width=500&amp;-x.jpg</photo>
                        <photo id="1" size="pn">http://photos.petfinder.com/photos/pets/42376726/1/?bust=1533347533&amp;width=300&amp;-pn.jpg</photo>
                        <photo id="1" size="t">http://photos.petfinder.com/photos/pets/42376726/1/?bust=1533347533&amp;width=50&amp;-t.jpg</photo>
                    </photos>
                </media>
                <contact>
                    <address1>1300 Sheppard Avenue West</address1>
                    <address2 />
                    <city>Toronto</city>
                    <state>ON</state>
                    <zip>M3K 2A6</zip>
                    <phone>416-338-8723</phone>
                    <fax />
                    <email />
                </contact>
            </pet>
            <pet>
                <id>42187854</id>
                <shelterId>ON218</shelterId>
                <shelterPetId>A809907</shelterPetId>
                <name>BOBBY</name>
                <animal>Cat</animal>
                <breeds>
                    <breed>Domestic Short Hair</breed>
                </breeds>
                <mix>no</mix>
                <age>Adult</age>
                <sex>M</sex>
                <size>M</size>
                <options>
                    <option>altered</option>
                </options>
                <description>
                    <![CDATA[I'm waiting at Petsmart, 700 Lawrence Ave. W. (Allen/Lawrence).]]>
                </description>
                <lastUpdate>2018-07-15T03:11:44Z</lastUpdate>
                <status>A</status>
                <media>
                    <photos>
                        <photo id="1" size="pnt">http://photos.petfinder.com/photos/pets/42187854/1/?bust=1531632625&amp;width=60&amp;-pnt.jpg</photo>
                        <photo id="1" size="fpm">http://photos.petfinder.com/photos/pets/42187854/1/?bust=1531632625&amp;width=95&amp;-fpm.jpg</photo>
                        <photo id="1" size="x">http://photos.petfinder.com/photos/pets/42187854/1/?bust=1531632625&amp;width=500&amp;-x.jpg</photo>
                        <photo id="1" size="pn">http://photos.petfinder.com/photos/pets/42187854/1/?bust=1531632625&amp;width=300&amp;-pn.jpg</photo>
                        <photo id="1" size="t">http://photos.petfinder.com/photos/pets/42187854/1/?bust=1531632625&amp;width=50&amp;-t.jpg</photo>
                    </photos>
                </media>
                <contact>
                    <address1>1300 Sheppard Avenue West</address1>
                    <address2 />
                    <city>Toronto</city>
                    <state>ON</state>
                    <zip>M3K 2A6</zip>
                    <phone>416-338-8723</phone>
                    <fax />
                    <email />
                </contact>
            </pet>
            <pet>
                <id>20217192</id>
                <shelterId>ON94</shelterId>
                <shelterPetId />
                <name>Peaches</name>
                <animal>Cat</animal>
                <breeds>
                    <breed>Domestic Short Hair</breed>
                </breeds>
                <mix>no</mix>
                <age>Senior</age>
                <sex>F</sex>
                <size>M</size>
                <options>
                    <option>altered</option>
                    <option>housetrained</option>
                </options>
                <description>
                    <![CDATA[Peaches is a GORGEOUS cat who is very sweet and affectionate.  However, she has kidney disease so will need an experienced cat home who can give her the extra special care she deserves.  Alternatively, if you are interested in sponsoring Peaches please contact us!!]]>
                </description>
                <lastUpdate>2011-07-12T16:45:09Z</lastUpdate>
                <status>A</status>
                <media>
                    <photos>
                        <photo id="1" size="pnt">http://photos.petfinder.com/photos/pets/20217192/1/?bust=1310489109&amp;width=60&amp;-pnt.jpg</photo>
                        <photo id="1" size="fpm">http://photos.petfinder.com/photos/pets/20217192/1/?bust=1310489109&amp;width=95&amp;-fpm.jpg</photo>
                        <photo id="1" size="x">http://photos.petfinder.com/photos/pets/20217192/1/?bust=1310489109&amp;width=500&amp;-x.jpg</photo>
                        <photo id="1" size="pn">http://photos.petfinder.com/photos/pets/20217192/1/?bust=1310489109&amp;width=300&amp;-pn.jpg</photo>
                        <photo id="1" size="t">http://photos.petfinder.com/photos/pets/20217192/1/?bust=1310489109&amp;width=50&amp;-t.jpg</photo>
                    </photos>
                </media>
                <contact>
                    <address1>2300 Lawrence Avenue East</address1>
                    <address2>Box 73039</address2>
                    <city>Toronto</city>
                    <state>ON</state>
                    <zip>M5M 1S8</zip>
                    <phone>416-520-7995   </phone>
                    <fax />
                    <email>marisa@pawscanada.org</email>
                </contact>
            </pet>
            <pet>
                <id>20217221</id>
                <shelterId>ON94</shelterId>
                <shelterPetId />
                <name>Pumpkin</name>
                <animal>Cat</animal>
                <breeds>
                    <breed>Domestic Long Hair</breed>
                </breeds>
                <mix>no</mix>
                <age>Adult</age>
                <sex>M</sex>
                <size>L</size>
                <options>
                    <option>altered</option>
                    <option>housetrained</option>
                </options>
                <description>
                    <![CDATA[Pumpkin is fairly reserved until you make the effort to approach and give him attention.  Then he loves to lie back as you lavish him with the love and care he so richly deserves.  Pumpkin must go to a home with a very dedicated cat lover as he is having litter issues at the moment and will need a patient person to work on this with him.  He also needs to be adopted with his best pal, Faye, who he has grown very close to.]]>
                </description>
                <lastUpdate>2011-07-12T16:47:39Z</lastUpdate>
                <status>A</status>
                <media>
                    <photos>
                        <photo id="1" size="pnt">http://photos.petfinder.com/photos/pets/20217221/1/?bust=1310489259&amp;width=60&amp;-pnt.jpg</photo>
                        <photo id="1" size="fpm">http://photos.petfinder.com/photos/pets/20217221/1/?bust=1310489259&amp;width=95&amp;-fpm.jpg</photo>
                        <photo id="1" size="x">http://photos.petfinder.com/photos/pets/20217221/1/?bust=1310489259&amp;width=500&amp;-x.jpg</photo>
                        <photo id="1" size="pn">http://photos.petfinder.com/photos/pets/20217221/1/?bust=1310489259&amp;width=300&amp;-pn.jpg</photo>
                        <photo id="1" size="t">http://photos.petfinder.com/photos/pets/20217221/1/?bust=1310489259&amp;width=50&amp;-t.jpg</photo>
                    </photos>
                </media>
                <contact>
                    <address1>2300 Lawrence Avenue East</address1>
                    <address2>Box 73039</address2>
                    <city>Toronto</city>
                    <state>ON</state>
                    <zip>M5M 1S8</zip>
                    <phone>416-520-7995   </phone>
                    <fax />
                    <email>marisa@pawscanada.org</email>
                </contact>
            </pet>
        </pets>
    </petfinder>`;

    let jsonOutput = parser.parse(xml);
    jsonOutput = jsonOutput.petfinder.pets;
    const santizedJson = sanitizePetfinder(jsonOutput);

    dataHelpers.insertMultiple(santizedJson);

    res.json(santizedJson);
  });

  return router;
};
