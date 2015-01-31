<?php
require("base_modulable.php");
if(!isset($_REQUEST["search"]))
{
	exit;
}
if(trim($_REQUEST["search"])==""){
	if(!(isset($_REQUEST["show_all"]) && $_REQUEST["show_all"]=="true")){
	die("");
	}
}

$sql="SELECT city.Name as city,country.Name as country  FROM city JOIN country on CountryCode=Code WHERE city.Name LIKE \"%".utf8_decode(htmlspecialchars(trim($_REQUEST["search"]),ENT_QUOTES,"UTF-8"))."%\"";
if(isset($_GET["debug"])){
	echo $sql;
}
$response=$base->query($sql)or die(print_r($base->errorInfo()));


if($data=$response->rowCount()==0)
{
	die("");
}
$cpt=0;
$max=isset($_REQUEST["max_values"])?$_REQUEST["max_values"]:null;
while($data=$response->fetch())
{
	echo utf8_encode("<div style=\"height: 50px\"><img src=\"http://www.oorsprong.org/WebSamples.CountryInfo/Images/".$data["country"].".jpg\" style=\"vertical-align:middle;height: 30px; width: auto\"><span>".$data["city"].",".$data["country"]."</span></div>\n");
	$cpt++;
	if($cpt == $max)
		break;
}
?>