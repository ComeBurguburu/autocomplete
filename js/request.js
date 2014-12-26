var http;
var search=null;
search=document.getElementById("search_field")

search.onkeyup=ajaxCall;

function createRequestObject()
{
    var http;
    if(window.XMLHttpRequest)
    { // Mozilla, Safari, ...
        http = new XMLHttpRequest();
    }
    else if(window.ActiveXObject)
    { // Internet Explorer
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return http;
}

function ajaxCall()
{
    http = createRequestObject();

    http.open('POST', 'php/search.php', true);
	http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.onreadystatechange = handleAJAXReturn;
    http.send("search="+encodeURI(search.value));
	console.log(search.value);
}

function handleAJAXReturn()
{
    if(http.readyState == 4)
	{
		if(http.status == 200)
        {
		var data=http.responseText;
        document.getElementById("result").innerHTML=data;
		}
        else
        {
		  alert('erreur');
        }
	}
    
}