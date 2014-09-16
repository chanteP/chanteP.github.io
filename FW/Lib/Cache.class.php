<?php
class Cache{
    public static function set($file, $data){
    	$file = PATH_CACHE . 'file/' . $file;
		if(PLATFORM == 'SAE'){
			$mc = memcache_init();
			memcache_set($mc, $file, $data);
		}
		else{
			return file_put_contents($file, $data);
		}
    }
    
    public static function get($file, $require){
    	$file = PATH_CACHE . 'file/' . $file;
		if(PLATFORM == 'SAE'){
			$mc = memcache_init();
			return memcache_get($mc, $file);
		}
		else{
			if($require){
				require($file);
			}
			else{
				return file_get_contents($file, $data);
			}
		}
    }
    public static function check($file){
		$data = self::get($file);
		return !!$file;
    }
}
