function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
module.exports = function normalizeJSON(str) {
	str = str || "";
	if(isJSON(str)) {
		return str;
	}
	return str.replace(/(\w+)\s*:/g,'"$1":').replace(/'(\w+)'\s*([:,}\n])/g,'"$1"$2');
};