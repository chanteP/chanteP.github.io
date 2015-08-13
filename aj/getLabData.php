<?php
require('./config.php');

$list = query('select * from lab order by date desc limit 100');
$data = packageData($list);
postJSON($data);