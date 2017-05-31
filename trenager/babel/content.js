console.log("g start");
/*Generate content*/
function getAjax() {
  var xml = null;

  try { xml = new XMLHttpRequest(); } catch(e) {}
  try { xml = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
  try { xml = new XMLHttpRequest("Microsoft.XMLHTTP"); } catch(e) {}

  return xml;
}

function generatorError() {
  alert("Error request: " + xml.status + " " + xml.statusText);
}

function  generateContent(file, template, output, mark) {
  var xml = getAjax();

  xml.open("GET", file, true);
  xml.onreadystatechange = function() {
    if(xml.readyState == 4) {
      if(xml.status == 200) {
        var json = JSON.parse(xml.responseText),
            templateProduct = document.getElementById(template).innerHTML,
            compileTemplate = Handlebars.compile(templateProduct),
            result = compileTemplate(json),
            content = document.querySelectorAll(output);
        content.forEach(function(item, i, arr) {
          item.innerHTML = result;
        });
        console.log(contentStatus);
        contentStatus = (contentStatus + 1);
        console.log(contentStatus);
        console.log(template + " generated");
        if (contentStatus == 3) {
          castom();
        }
      } else {
        generatorError();
      }
    }
  };

  xml.send(null);
};

var contentStatus = 0;

generateContent("products.json", "template-product", ".js-output-products");
generateContent("feedbacks.json", "template-feedback", ".js-output-feedbacks");
generateContent("gallery.json", "template-gallery", ".js-output-photos");
/*EndGenerate content*/

console.log("g end");