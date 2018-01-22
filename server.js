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
	
	res.send('Go AWay')
	
});