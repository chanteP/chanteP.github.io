<?php
class Folder{
    public static function findAll($dir, $deep, $callback){
    	$targetDir = dir($dir);
	    while($file = $targetDir->read()){
	    	if($file == "." || $file == ".."){
	    		continue;
	    	}
	        if($deep && is_dir("$dir/$file")){
	            tree("$dir/$file");
	        }
	        else{
				// echo "checking file  . $dir . / . $file .  ---------------------------------<br />\n";
	        	$callback($dir, $file);
	        	// echo $dir . '/' . $file . "<br />\n";
	        }
	    }
	    $targetDir->close();
    }
}
