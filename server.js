/*!
 * Twitter Backend 
 *
 * Copyright(c) 2017 Bradford Knowlton
 * MIT Licensed
 *
 * Version 1.1.5
 */

'use strict';

const express = require('express');
const app = express();
const Twit = require('twit');
const { Client } = require('pg');

// default age for active cache entries
const cacheLifetime = '128 hours';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect(function(err, res){ });

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
	res.writeHead(403, {'Content-Type': 'text/html'}); 
	
	res.end('Go Away')
	
});

app.get('/followers/list', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'}); 

	const screen_name = 'Amazon'
	
	const T = new Twit( {
	  consumer_key: process.env.twitter_consumer_key,
	  consumer_secret: process.env.twitter_consumer_secret,
	  access_token: process.env.twitter_access_token,
	  access_token_secret: process.env.twitter_access_token_secret
	} );

	const command = 'followers/list';
	const options = { "screen_name": screen_name, "include_entities": false, count: 5 };	

	T.get( command, options,  function (error, data, response) {
							      					            
			    if(error != undefined || response.statusCode != 200 ){
					console.log("Something went wrong!");
					console.log(error);
					console.log(response.statusCode);			
			   
			    }else{
					// console.log(data);
					res.end(data);
				}
				
			}); 
}); // end followers/list
