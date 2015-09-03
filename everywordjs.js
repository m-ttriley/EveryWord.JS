var http = require('http');
var fs = require('fs');
var readline = require('readline');
var everyword = [];
var index = 0;

// creates the twitter bot using Twit
var Bot = require('./twitbot/bot')
  , config1 = require('./twitterKey');
var bot = new Bot(config1);
console.log('EverywordJS: Running.');



readline.createInterface({
	input: fs.createReadStream("everyword.txt"),
	terminal: false
}).on('line', function(line) {

	// places all words into an array

	everyword.push(line + '.js');
	console.log(line + '.js');
}).on('close', function() {

	// once the text file is done being looked at - we can start tweeting!

	console.log('tweets loaded');
	setInterval(function() {
		console.log('Current index: ' + index + '. Word: ' + everyword[index]);
		bot.tweet(everyword[index], function(err, reply) {
			if(err) return handleError(err);

        	console.log('\nTweet: ' + (reply ? reply.text : reply));
		});
		index = index + 1;
	}, 1800000);
});

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}

http.createServer(function (request, response) {
	// do nothing
}).listen(process.env.PORT || 5000);