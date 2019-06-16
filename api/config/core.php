<?php
// show error reporting
error_reporting(E_ALL);
 
// set your default time-zone
date_default_timezone_set('Asia/Manila');
 
// variables used for jwt
$key = "MPK";
$iss = "http://mpk.com";
$aud = "http://mpk.com";
$iat = 1356999524;
$nbf = 1357000000;
$exp = 1516239022;
?>