var pg = require('pg');
var config = {
	user:'postgres',
	password:'postgres',
	database:'tuv',
	port:5432
}

var pool = new pg.Pool(config);

pool.connect(function(err,client,done){
	if(err){
		return console.error('DB Connection Error!',err);
	}

	var watch_query = 'LISTEN watchers';
	
	client.on('notification', function(msg) {
    		console.log(msg);
	});
	
	client.query(watch_query, function(err,result){
		//done();
		if(err){
			return console.error('Error in search',err);
		}
		console.log(result.rows[0]);
	});
	
});

