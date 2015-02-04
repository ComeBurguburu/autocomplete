function mkmap($dir){

	$folder = opendir ($dir);
 
		if (count(scandir($dir)) <= 2){
			echo realpath($dir)"/<br/>";
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

mkmap("..");
