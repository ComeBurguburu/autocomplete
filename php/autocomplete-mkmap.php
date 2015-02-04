<?php
/*!
Autocomplete a input Ajax wrapper for jQuery 
by Côme BURGUBURU

Version 1.14.0
Full source at https://github.com/ComeBurguburu/autocomplete
Copyright (c) 2015-2042

*/
function mkmap($dir){

	$folder = opendir ($dir);
 
		if (count(scandir($dir)) <= 2){
			echo realpath($dir)."/<br/>";
		}
 
		while ($file = readdir ($folder)) {
				if ($file != "." && $file != "..") {
					$pathfile = $dir.'/'.$file; 
 
					if(@filetype($pathfile) == 'dir'){ 
						mkmap($pathfile); 
					} 
					else{
						echo realpath($pathfile)."<br/>" ;
					}
				} 
		}
	closedir ($folder);
}
$path="..";
mkmap($path);
?>
