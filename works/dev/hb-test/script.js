function getAjax() {
	var xml = null;

	try { xml = new XMLHttpRequest(); } catch(e) {}
	try { xml = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
	try { xml = new XMLHttpRequest("Microsoft.XMLHTTP"); } catch(e) {}

	return xml;
}

var xml = getAjax();

xml.open("GET", "data.json", true);
xml.onreadystatechange = function() {
	if(xml.readyState == 4) {
		if(xml.status == 200) {
			var json = JSON.parse(xml.responseText),
					templateArticle = document.getElementById("template-article").innerHTML,
					compileTemplate = Handlebars.compile("templateArticle"),
					result = compileTemplate(json),
					content = document.getElementById("content");
			content.innerHTML = result;
		} else {
			alert("Error request: " + xml.status + " " + xml.statusText);
		}
	}
};
xml.send(null);