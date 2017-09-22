var pg = require('pg');
var config = {
	user:'postgres',
	password:'postgres',
	database:'tuv',
	port:5432
}

var pool = new pg.Pool(config);

var request = require('request');

var site_root = 'http://192.168.1.144:3000';
// var testj = { reference_id:33, name:'AK_BP', data:666};

pool.connect(function(err,client,done){
	if(err){
		return console.error('DB Connection Error!',err);
	}

	var watch_query = 'LISTEN watchers';
	
	client.on('notification', function(msg) {
    		console.log(msg);
		var var1 = JSON.parse(msg.payload);
		console.log(var1);	
		var var2 = JSON.stringify(var1);
		console.log(var2);

		request({
			url: site_root + '/categories',
        		method: 'POST',
			json: true, 
			body: var2,
			headers: {
                		"content-type": "application/json;charset=utf-8",
            		}
		},
        	function(err, res, body) {
			if(!err){
                		console.log(res);
        		}
			console.log(body);
		
		});
	});
	
	client.query(watch_query, function(err,result){
		//done();
		if(err){
			return console.error('Error in search',err);
		}
		console.log(result.rows[0]);
	});
	
});

