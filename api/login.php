<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/mpk/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// database connection will be here
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);

// check email existence here
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
if (!empty($data->username)) {
    $user->id = $data->username;
    $data_exists = $user->MPKIdExists();
}

if (!empty($data->email)) {
    $user->email = $data->email;
    $data_exists = $user->emailExists();
}


// files for jwt will be here
// generate json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

// generate jwt will be here
// check if email exists and if password is correct
if ($data_exists && password_verify($data->password, $user->password)) {

    $token = array(
        "iss" => $iss,
        "aud" => $aud,
        "iat" => $iat,
        "nbf" => $nbf,
        //    "exp" => $exp,
        "data" => array(
            "id" => $user->id,
            "firstName" => ucfirst($user->firstName),
            "lastName" => ucfirst($user->lastName),
            "email" => $user->email,
            "balance" => $user->balance,
            "comment" => $user->comment,
            "inEvent" => $user->inEvent,
            "inCamping" => $user->inCamping,
            "created" => $user->created,
            "modified" => $user->modified,
            "role" => $user->email == 'admin@mpk.com' ? 'admin' : 'user'
        )
    );

    // set response code
    http_response_code(200);

    // generate jwt
    $jwt = JWT::encode($token, $key);
    echo json_encode(
        array(
            "jwt" => $jwt
        )
    );
}

// login failed will be here
// login failed
else {

    // set response code
    http_response_code(401);

    // tell the user login failed
    echo json_encode(array("message" => "Login failed."));
}
