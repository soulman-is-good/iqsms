# iqsms
iqsms.ru JSON API implementation

This package is implementation for service http://iqsms.ru/api/api_about

# TODO

* Sending bulk sms with sms queue name
* API documentation
* Tests

# Installation

```sh
npm install iqsms
```

# Example

```javascript
var Iqsms = require('iqsms');

var iqsms = new Iqsms("your_iqsms_api_login", "your_iqsms_api_password");

//create message
var message = new Iqsms.Message("1", "<phone number>", "Test message");

//make sure this sender name exists
message.setSender('inform');

//send sms
iqsms.send(message).finally(function(err, data){
	console.log(err, data);
});
```

# API

iqsms.send
iqsms.status
iqsms.statusQueue
iqsms.senders
iqsms.balance