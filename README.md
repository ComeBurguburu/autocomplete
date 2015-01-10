Ajax-search
===========

Autocomplete result when use search bar from database utf-8 support 
Demo at: http://come.burguburu.free.fr/projet/ajax/search/

$(selector).autocomplete();

You can use options :

<table>
<tr><th>Options </th><th>Value</th><th>default</th></tr>
<tr><td> link </td><td>link to the script<br/>which make the request </td><td>php/search.php</td></tr>
<tr><td>autohide</td><td>boolean hide result when empty</td><td> false</td></tr>
<tr><td>callback</td><td>a pointer to a function<br/>first parameter is the result</td><td>null</td></tr>
<tr><td>className</td><td>the class name when element is highlighted (without dot)</td><td> select-autocomplete <br/>(defined in style.autocomplete.css)</td></tr>
</table>

example : 
<pre>
var f = function(a){
		alert(a);
		}
		$("#search_field").autocomplete({callback: f, autohide: true, className: "perso"});
		</pre>
