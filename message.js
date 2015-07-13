/**
 * Creates message instance
 * @param {string} clientId *requred, client side generated id
 * @param {string} phone *required, recepient phone number
 * @param {string} text *required, message body
 * @param {string} wapurl wap-push link, in case you want to forward wap-push message
 * @param {string} sender Sender signature
 * @param {boolean} flash Shows if sms is flash-sms that displays on the screen
 */
var Message = function(clientId, phone, text, wapurl, sender, flash){
	//public:
	this.toJSON = function(){
		var json = {
			clientId: clientId,
			phone: phone,
			text: text
		};
		if(wapurl) {
			json.wapurl = wapurl;
		}
		if(sender) {
			json.sender = sender;
		}
		if(flash) {
			json.flash = flash;
		}
		return json;
	};
	this.getClientId = function(){
		return clientId;
	};
	this.setClientId = function(client_id){
		clientId = client_id;
	};
	this.getPhone = function(){
		return phone;
	};
	this.setPhone = function(phone_){
		phone = phone_;
	};
	this.getText = function(){
		return text;
	};
	this.setText = function(text_){
		text = text_;
	};
	this.getWapurl = function(){
		return wapurl;
	};
	this.setWapurl = function(wap_url){
		wapurl = wap_url;
	};
	this.getSender = function(){
		return sender;
	};
	this.setSender = function(sender_){
		sender = sender_;
	};
	this.getFlash = function(){
		return flash;
	};
	this.setFlash = function(flash_){
		flash = flash_;
	};
	//constructor:
	if('function' === typeof this) {
		throw new Error("Object must be created through new");
	}
	if('object' === typeof clientId && clientId.clientId) {
		phone = clientId.phone;
		text = clientId.text;
		wapurl = clientId.wapurl;
		sender = clientId.sender;
		flash = clientId.flash;
		clientId = clientId.clientId;
	} else {
		if('boolean' === typeof wapurl) {
			flash = wapurl;
		}
		if('boolean' === typeof sender) {
			flash = sender;
		}
	}
	flash = flash?1:0;
	if(!clientId || !phone || !text) {
		throw new Error("clientId, phone and text parameters are required");
	}
};

module.exports = Message;