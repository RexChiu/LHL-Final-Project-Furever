import rp from 'request-promise-native';
import cheerio from 'cheerio';

const mapper = {
  'American Bulldog': 'Bulldog',
  Corgi: 'Pembroke Welsh Corgi',
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
