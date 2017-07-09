var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");

var liriCommand = process.argv[2];

// console.log(process.argv);
var arr = [];

for (var i = 3; i < process.argv.length; i++) {
  arr.push(process.argv[i]);
}

var name = arr.join("-");
console.log(name);

if (liriCommand === "my-tweets") {
  tweets();
} else if (liriCommand === "movie-this") {
  omdb();
} else if (liriCommand === "spotify-this-song") {
  getSong();
} else if (liriCommand === "do-what-it-says") {
  doSomething();
} else {
  console.log("Undefined argument");
}

function tweets() {
  //Display last 20 Tweets
  // console.log(name.replace(/"/g,''));'onepannnman'
  var params = {
    screen_name: name.replace(/"/g, "")
  };
	if (name === ""){
		params.screen_name = "onepannnman"
	}
  keys.twitterKeys.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
			appendData(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log('-------------Tweet ' + (i + 1) + "-------------");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
  });
}

function omdb() {
  if (name === "") {
    name = "Mr. Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
			appendData(body);
      console.log(JSON.parse(body).Title);
      console.log(JSON.parse(body).Year);
      console.log(JSON.parse(body).imdbRating);
      console.log(JSON.parse(body).Ratings[1]);
      console.log(JSON.parse(body).Country);
      console.log(JSON.parse(body).Language);
      console.log(JSON.parse(body).Plot);
      console.log(JSON.parse(body).Actors);
    }

  })
}

function getSong() {
  var obj = {
    type: "track",
    query: name
  }
  if (name === "") {
		obj.query = "Ace-of-Base";
  }

  keys.spotifyKeys.search(obj, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
		appendData(data);
		//name of the artist
    console.log(data.tracks.items[0].album.artists[0].name);
		//name of the album
    console.log(data.tracks.items[0].album.name);
		//name of the song
    console.log(data.tracks.items[0].name);
		//link to song
    console.log(data.tracks.items[0].external_urls.spotify);
  });
}

function doSomething() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // We will then print the contents of data
    // console.log(data);
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    // We will then re-display the content as an array for later use.
    // console.log(dataArr);

    liriCommand = dataArr[0];
    // console.log(liriCommand);
    name = dataArr[1];
    if (liriCommand === "spotify-this-song") {
      getSong();
    } else if (liriCommand === "movie-this") {
      omdb();
    } else if (liriCommand === "my-tweets") {
      tweets();
    } else {
      console.log("invalid entry");
    }
  });

}

// As always, we grab the fs package to handle read/write
// We then store the textfile filename given to us from the command line
// We then append the contents "Hello Kitty" into the file
// If the file didn't exist then it gets created on the fly.
function appendData(commandData){
	fs.appendFile('log.txt', JSON.stringify(commandData) + '\n\n\n\n', function(err) {
	  // If an error was experienced we say it.
	  if (err) {
	    console.log(err);
	  }
	  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
	  else {
	    console.log("Content Added!");
	  }
	});
}


// TODO: BONUS
// NOTE:Take data that's logged in terminal and append to log.txt
