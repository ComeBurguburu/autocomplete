AutoComplete
===========

Autocomplete result when use search bar from database utf-8 support 

$(selector).autocomplete();

You can use options :

<table>
<tr><th>Options </th><th>Value</th><th>Default</th></tr>
<tr><td> url </td><td>link to the script<br/>which make the request </td><td>php/search.php</td></tr>
<tr><td>param_name</td><td> the GET or POST parameter use by the PHP script</td><td>search</td></tr>
<tr><td>show_all</td><td>boolean display all values on focus </td><td>false</td></tr>
<tr><td>callback</td><td>a pointer to a function<br/>first parameter is the result<br/>second parameter is a pointer to the  autocomplete wrapper</td><td>null</td></tr>
<tr><td>onclear</td><td>function call when clear button is pressed</td><td>null</td></tr>
<tr><td>className</td><td>the class name when element is highlighted (without dot)</td><td> select-autocomplete <br/>(defined in style.autocomplete.css)</td></tr>
<tr><td>max_values</td><td>the maximum number of result display<p>set to <code>null</code> to disable limit (can reduice performance</td><td>10</td></tr>
<tr><td>no_result</td><td>text display when there are no result</td><td>no result</td></tr>
<tr><td>key</td><td> an array of param</td><td>null</td></tr>
<tr><td>value</td><td> an array of value<p>param1=value1&param2=value2...</p></td><td>null</td></tr>
</table>

<u>example : </u>
<pre>
var f = function(a,b){
		alert(a);
		}
		$("#search_field").autocomplete({url: "php/search.php", callback: f, className: "perso"});
		</pre>
