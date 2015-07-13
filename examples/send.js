var Iqsms = require('../');

var iqsms = new Iqsms(process.env.IQSMS_API_LOGIN, process.env.IQSMS_API_PASSWORD);

var message = new Iqsms.Message("1", "777777777", "Test message");
message.setSender('inform');
iqsms.send(message, function(err, data){
	console.log(err, data);
}).finally(function(err, data){
	console.log(err, data);
});