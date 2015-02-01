<?php
/*!
Autocomplete a input Ajax wrapper for jQuery 
phpLIKE equivalent of SQL LIKE in PHP
by Côme BURGUBURU

Version 1.8.0
Full source at https://github.com/ComeBurguburu/autocomplete
Copyright (c) 2015-2042
*/
/*
return $input string without all accents
*/
function insensitive_accent($input) {
	return preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', iconv("utf-8", "ascii//TRANSLIT//IGNORE", $input));
}
/*
detect if $substring is contained in $string
case insensitive
accent insensitive
return boolean
*/
function LIKE($string, $substring){
	return stripos(insensitive_accent($string),insensitive_accent($substring))!== false;
}