Ajax-search
===========

Autocomplete result when use search bar from database utf-8 support 
Demo at: http://come.burguburu.free.fr/projet/ajax/search/

$(selector).autocomplete();

You can use options :

<table>
<tr><th>Options </th><th>Value</th><th>Default</th></tr>
<tr><td> link </td><td>link to the script<br/>which make the request </td><td>php/search.php</td></tr>
<tr><td>param_name</td><td> the GET or POST parameter use by the PHP script</td><td>search</td></tr>
<tr><td>autohide</td><td>boolean hide result when empty(true to debug css)</td><td> false</td></tr>
<tr><td>show_all<td><td>boolean display all values on focus </td><td>false</td></tr>
<tr><td>callback</td><td>a pointer to a function<br/>first parameter is the result</td><td>null</td></tr>
<tr><td>className</td><td>the class name when element is highlighted (without dot)</td><td> select-autocomplete <br/>(defined in style.autocomplete.css)</td></tr>
<tr><td>dataSelector</td><td>css selector where the value return is contained<br/>to use a value different than the text display add display:none to this selector <td>span</td></tr>
<tr><td>max_values</td><td>the maximum number of result display<p>set to <code>null</code> to disable limit (can reduice performance</td><td>10</td></tr>
<tr><td>no_result</td><td>text display when there are no result</td><td>no result</td></tr>
</table>

example : 
<pre>
var f = function(a,b){
		alert(a);
		}
		$("#search_field").autocomplete({callback: f, autohide: true, className: "perso"});
		</pre>
