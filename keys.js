
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");

exports.twitterKeys = new Twitter({
  consumer_key: 'JTkOo91RaKWRvxfKTcyTn26mt',
  consumer_secret: 'AOLHo01Uw2Z2RWuae1vaKaMgwRvm1khD2JekZhjeUYn1ILx3Bo',
  access_token_key: '882820097269788673-eulQfo46NrRn7bCdWXdqW2mzHoayqpO',
  access_token_secret: 'jsL0qDtx8GbeqHar7CpZrm9V0fvug2tCfqffSUVFEaB8b'
});

exports.spotifyKeys = new Spotify({
  id: 'e00236bf6f66419c9da539b5ef2dd515',
  secret: '311dd4bf38f0413b88eecc55f4b8c6e8'
});

