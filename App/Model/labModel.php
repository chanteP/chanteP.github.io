<?php
class labModel extends Model{
	public function getLabData(){
		// $list = $lab->where('private=0')->order('id desc')->select();
		$list = $this->query('select * from lab order by date desc limit 100');
		return $list;
	}
	public function getIDData($id){
		$id = addslashes($id);
		// $list = $lab->where('private=0')->order('id desc')->select();
		$list = $this->query("select * from lab where id = $id order by id desc limit 1");
		return $list[0];
	}

	public function addLabData($formdata){
		$title = addslashes($formdata['title']);
		$tags = addslashes($formdata['tags']);
		$image = addslashes($formdata['image']);
		$link = addslashes($formdata['link']);
		$about = addslashes($formdata['about']);
		
		$this->sql("
			insert into lab 
				(title, tags, image, link, about)
			value 
				('$title', '$tags', '$image', '$link', '$about')
			");
		return $this->error ? 0 : 1;
	}
}
