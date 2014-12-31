<?php
include("base_modulable.php");
if(!isset($_POST["search"])||trim($_POST["search"])=="")
{
	exit;
}

$sql="SELECT city.Name as city,country.Name as country  FROM city JOIN country on CountryCode=Code where city.Name LIKE \"%".utf8_decode(htmlspecialchars(trim($_POST["search"]),ENT_QUOTES,"UTF-8"))."%\"";

$response=$base->query($sql)or die(print_r($base->errorInfo()));


if($data=$response->rowCount()==0)
{
	echo "<i>No result</i>";
}

while($data=$response->fetch())
{
	echo utf8_encode("<div>".$data["city"].",".$data["country"]."</div>");
}
?>