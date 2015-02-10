<?php
/*!
Autocomplete a input Ajax wrapper for jQuery 
by Côme BURGUBURU

Version 1.20
Full source at https://github.com/ComeBurguburu/autocomplete
Copyright (c) 2015-2042

*/
function insensitive_accent($input) {
	return preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', iconv("utf-8", "ascii//TRANSLIT//IGNORE", $input));
}
function LIKE($string, $substring){
	return stripos(insensitive_accent($string),insensitive_accent($substring))!== false;
}
function extension($pathfile){
	return pathinfo($pathfile, PATHINFO_EXTENSION);
}

function mkmap($fullpath,$subpath,$find){
	global $cpt,$max;

	$folder = opendir ($fullpath);

	if(LIKE($subpath,$find) || (isset($_REQUEST["show_all"]) && $_REQUEST["show_all"]==="true" && $find ==="")){
		if (count(scandir($fullpath)) <= 2 || isset($_REQUEST["folder"]) ){
			echo "<div><img src=\"icon/folder.png\" alt=\"folder\" />".$subpath.DIRECTORY_SEPARATOR."</div>";
			$cpt++;
			if($cpt == $max){
				exit;
			}
		}}

	while ($file = readdir ($folder)) {
		if ($file != "." && $file != "..") {
			$pathfile = $fullpath.DIRECTORY_SEPARATOR.$file; 

			if(@filetype($pathfile) == 'dir'){ 
				mkmap($pathfile,$subpath.DIRECTORY_SEPARATOR.$file,$find); 
			} 
			else{
				if(LIKE($subpath.DIRECTORY_SEPARATOR.$file,$find) || (isset($_REQUEST["show_all"]) && $_REQUEST["show_all"]==="true" && $find==="")){
					echo"<div>";

					$extension=extension($pathfile);

					if(file_exists("../icon/$extension.png")){
						echo "<img src=\"icon/$extension.png"."\" alt=\"$extension\" />";
					}
					else{
						echo "<img src=\"icon/_blank.png\" alt=\"blank\" />";
					}

					echo $subpath.DIRECTORY_SEPARATOR.$file."</div>\n";
					$cpt++;

					if($cpt==$max){
						exit;
					}
				}
			}
		} 
	}
	closedir ($folder);
}
if(!isset($_REQUEST["path"])){
	die("<strong style=\"color:red\">no param</strong>");
}
$find=$_REQUEST["path"];
$cpt=0;
$max=isset($_REQUEST["max_values"])?$_REQUEST["max_values"]:null;

if(file_exists("config.php")){
	include("config.php");
}else{
	die("<strong style=\"color:red\">config.php is missing</strong></i>");
}
/*global $path, $subpath;
$path="..\..\sources";
$subpath="sources";*/
if(!isset($path) || !isset($subpath)){
	die("<strong style=\"color:red\">config file is wrong</strong>");
}
if(realpath($path)===false){
	die("<strong style=\"color:red\">path wrong or file access right wrong</strong>");
}
mkmap($path, $subpath, $find);
?>