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
	// res.writeHead(200, {'Content-Type': 'text/html'}); 

	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

	const screen_name = 'Amazon';
	
	const T = new Twit( {
	  consumer_key: process.env.twitter_consumer_key,
	  consumer_secret: process.env.twitter_consumer_secret,
	  access_token: process.env.twitter_access_token,
	  access_token_secret: process.env.twitter_access_token_secret
	} );

	const command = 'followers/list';
	const options = { "screen_name": screen_name, "include_entities": false, "count": 5, "skip_status": 1 };	

	T.get( command, options,  function (error, data, response) {
							      					            
			    if(error != undefined || response.statusCode != 200 ){
					console.log("Something went wrong!");
					console.log(error);
					console.log(response.statusCode);			
			   
			    }else{
					// console.log(data);
					res.end( JSON.stringify(data) );
				}
				
	}); 

}); // end followers/list


app.get('/friends/list', function(req, res) {
	// res.writeHead(200, {'Content-Type': 'text/html'}); 

	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

	const screen_name = 'Amazon';
	
	const T = new Twit( {
	  consumer_key: process.env.twitter_consumer_key,
	  consumer_secret: process.env.twitter_consumer_secret,
	  access_token: process.env.twitter_access_token,
	  access_token_secret: process.env.twitter_access_token_secret
	} );

	const command = 'friends/list';
	const options = { "screen_name": screen_name, "include_entities": false, "count": 5, "skip_status": 1 };	

	T.get( command, options,  function (error, data, response) {
							      					            
			    if(error != undefined || response.statusCode != 200 ){
					console.log("Something went wrong!");
					console.log(error);
					console.log(response.statusCode);			
			   
			    }else{
					// console.log(data);
					res.end( JSON.stringify(data) );
				}
				
	}); 

}); // end friends/list
