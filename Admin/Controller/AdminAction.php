<?php
class AdminAction extends Action{
    function _init($data){
    	// $_SESSION['admin']['login'] = 0;

        $this->assign('root', ROOTPATH);
    	$this->assign('respath', ROOTPATH . '/Template/admin/resources');

    	if(!$_SESSION['admin']['login']){
    		$this->login();
			die();
    	}
    	$act = $data['data'] ? $data['data'] : 'index';
        if(!method_exists($this, $act)){
            $act = 'index';
        }
        $this->$act($data);
    }
    public function login(){
        if(isset($_POST['user']) || isset($_POST['pwd'])){
            if($_POST['user'] == '123' && $_POST['pwd'] == '123'){
                $_SESSION['admin']['login'] = 1;
                $this->redirect('Admin');
                exit();
            }
            else{
                $this->assign('user', $_POST['user']);
                $this->assign('errmsg', 'username or password error');
            }
        }
        $this->display('admin/login.html');
    }
    public function logout(){
        $_SESSION['admin']['login'] = 0;
        $this->redirect(ROOTPATH . '/Admin');
    }
    /* index ################################################################*/
	public function index($data){
        $this->assign('navcurrent', 'index');
		$this->assign('template', $this->fetch('admin/pages/index.html'));
		$this->display('admin/index.html');
	}
    /* visitor ################################################################*/
    public function datavisit($data){
        $page = $_GET['page'] ? $_GET['page'] : 1;
        $visitor = $this->M('visitor');
        $rs = $visitor->getVisitData($page);

        $this->assign('navcurrent', 'datavisit');
        $this->assign('visitdata', $rs);
        $this->assign('curpage', $page);        
        $this->assign('template', $this->fetch('admin/pages/datavisit.html'));
        $this->display('admin/index.html');
    }

    /* lab ####################################################################*/
    public function addlab($data){
        if(count($_POST)){
            if(!$_POST['title'] || !$_POST['tags'] || !$_POST['image'] || !$_POST['link'] || !$_POST['about']){
                Route::status403();
                exit();
            }
            $formdata = array(
                'title'     => $_POST['title'],
                'tags'      => $_POST['tags'],
                'image'     => $_POST['image'],
                'link'      => $_POST['link'],
                'about'     => $_POST['about']
            );
            $lab = $this->M('lab');
            $rs = $lab->addLabData($formdata);
            if($rs){
                Route::status403();
            }
        }
        else{
            $this->assign('navcurrent', 'addlab');
            $this->assign('template', $this->fetch('admin/pages/addlab.html'));
            $this->display('admin/index.html');
        }
    }
    public function editlab($data){
        $this->assign('navcurrent', 'editlab');
        $this->assign('template', $this->fetch('admin/pages/editlab.html'));
        $this->display('admin/index.html');
    }
}