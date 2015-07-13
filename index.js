var Request = require('request'),
	Deferred = require('node-defer'),
	normalizeJSON = require('./normalize_json'),
	Message = require('./message');

/**
 * Creates new iqsms JSON API object
 * @param {string} api_login iqsms.ru API login 
 * @param {string} api_password iqsms.ru API password 
 */
var iqsms = function(api_login, api_password) {
	//private:
	var login;
	var	password;
	var request;
	var server_url = 'http://json.gate.iqsms.ru';
	function handleCallback(promise, callback) {
		return function(err, res, data){
			if(err) {
				callback(err);
				promise.reject(err);
			} else {
				callback(null, data);
				promise.resolve(data);
			}
		};
	}
	
	//public:
	/**
	 * Sends sms
	 */
	this.send = function(message, scheduleTime, callback){
		var promise = new Deferred();
		var body = {
			login: login,
			password: password
		};
		if(!(message instanceof Message)) {
			message = new Message(message);
		}
		if('function' === typeof scheduleTime) {
			callback = scheduleTime;
			scheduleTime = null;
		}
		if(scheduleTime) {
			body.scheduleTime = String(scheduleTime);
		}
		body.messages = [message.toJSON()];
		callback = callback || function(){};
		request({
			uri: "/send/",
			body: body
		}, handleCallback(promise, callback));
		return promise;
	};
	/**
	 * Get messages delivery status
	 */
	this.status = function(messages, callback){
		var body = {
			login: login,
			password: password
		};
		var promise = new Deferred();
		if(!Array.isArray(messages)) {
			messages = [messages];
		}
		for(var i in messages) {
			if(!messages[i].clientId || !messages[i].smscId) {
				var err = new Error("clientId and smscId must persist. Message index#" + i);
				callback(err);
				setTimeout(function(){
					promise.reject(err);
				});
				return promise;
			}
		}
		body.messages = messages;
		request({
			uri: "/status/",
			body: body
		}, handleCallback(promise, callback));
		return promise;
	};
	/**
	 * Get messages delivery status by queue name
	 */
	this.statusQueue = function(statusQueueName, statusQueueLimit, callback){
		var body = {
			login: login,
			password: password
		};
		var promise = new Deferred();
		if('function' === typeof statusQueueLimit) {
			callback = statusQueueLimit;
			statusQueueLimit = "100";
		}
		callback = callback || function(){};
		if(!statusQueueName) {
			var err = new Error("statusQueueName must be specified");
			callback(err);
			setTimeout(function(){
				promise.reject(err);
			});
			return promise;
		}
		body.statusQueueName = statusQueueName;
		body.statusQueueLimit = statusQueueLimit;
		request({
			uri: "/statusQueue/",
			body: body
		}, handleCallback(promise, callback));
		return promise;
	};
	/**
	 * Get account sender names
	 */
	this.senders = function(callback){
		var body = {
			login: login,
			password: password
		};
		var promise = new Deferred();
		callback = callback || function(){};
		request({
			uri: "/senders/",
			body: body
		}, handleCallback(promise, callback));
		return promise;
	};
	/**
	 * Check balance
	 */
	 this.balance = function(callback){
		 var promise = new Deferred();
		 callback = callback || function(){};
		 request({
			 uri: "/messages/v2/balance.json",
			 baseUrl: "http://api.iqsms.ru",
			 body: {
				 login: login,
				 password: password
			 }
		 }, handleCallback(promise, callback));
		 return promise;
	 };
	//constructor:
	if('function' === typeof this) {
		throw new Error("Object must be created through new");
	}
	if(!api_login || !api_password) {
		throw new Error("API login and password must be set");
	}
	login = api_login;
	password = api_password;
	request = Request.defaults({
		method: "POST",
		baseUrl: server_url,
		json: true
	});
};

iqsms.Message = Message;

module.exports = iqsms;