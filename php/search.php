<?php
include("base_modulable.php");
if(!isset($_REQUEST["search"])||trim($_REQUEST["search"])=="")
{
	exit;
}

$sql="SELECT city.Name as city,country.Name as country  FROM city JOIN country on CountryCode=Code where city.Name LIKE \"%".utf8_decode(htmlspecialchars(trim($_REQUEST["search"]),ENT_QUOTES,"UTF-8"))."%\"";

$response=$base->query($sql)or die(print_r($base->errorInfo()));


if($data=$response->rowCount()==0)
{
	echo "<i>No result</i>";
}
$cpt=0;
$max=10;
while($data=$response->fetch())
{
	echo utf8_encode("<div style=\"height: 50px\"><img src=\"http://www.oorsprong.org/WebSamples.CountryInfo/Images/".$data["country"].".jpg\" style=\"vertical-align:middle;height: 30px; width: auto\"><span>".$data["city"].",".$data["country"]."</span></div>\n");
	$cpt++;
	if($cpt == $max)
		break;
}
?>