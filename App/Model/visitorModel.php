<?php
class visitorModel extends Model{
	/*chart ------------------------------*/
	public function getVisitData($page){
		$page = isset($page) ? $page - 1 : 0; 
		$nextpage = $page + 1;
		$step = 100;
		$page = $page * $step;
		$nextpage = $nextpage * $step;

        $list = $this->query("
        	select * from `visitor`
        	order by vid desc
        	limit $page, $nextpage
        	");
	
        return $list;
	}
	public function addVisitData(){
		if(isset($_SESSION['haslog'])){
			exit;
		}
		$ip = addslashes(getIp());
		$ipData = Request::get('http://ip.taobao.com/service/getIpInfo.php', 'ip='.$ip);
		$decodeIpData = json_decode($ipData);
		$ipData = addslashes($ipData);
		$city = $decodeIpData->data->country . ' ' . $decodeIpData->data->city . ' ' . $decodeIpData->data->county;

		$referrer = addslashes($_SERVER['HTTP_REFERER']);
		$requesturl = addslashes($_SERVER['REQUEST_URI']);
		$ua = addslashes((is_mobile()?'mobile':'pc') . $_SERVER['HTTP_USER_AGENT']);
		// $data['vip'] = $ip;
		// $data['vaddr'] = $ipData;
		// $data['vcity'] = $city;
		// $data['referrer'] = $server['HTTP_REFERER'];
		// $data['requesturl'] = $server['REQUEST_URI'];
		// $data['useragent'] = $ua;

		$this->sql("
			insert into `visitor` 
			(vip, vaddr, vcity, referrer, requesturl, useragent)
			value
			('$ip', '$ipData', '$city', '$referrer', '$requesturl', '$ua');
			");

		$_SESSION['haslog'] = 1;
	}
}
