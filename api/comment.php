<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// files for decoding jwt will be here
// required to encode json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

// database connection will be here
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';


// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new User($db);


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (!empty($user->getComments())) {
        header('Content-Type: application/json');

        // set response code
        http_response_code(200);
        echo json_encode($user->getComments());

        // display message: user was created
//        echo json_encode(array("message" => "successfully completed.", "status" => true));
    } // message if unable to reservation
    else {
        // set response code
        http_response_code(400);

        // display message: unable to create user
        echo json_encode(array("message" => "Oops, There is no comments", "status" => false));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // retrieve given jwt here
// get posted data
    $data = json_decode(file_get_contents("php://input"));

// set user property values
    $user->id = $data->id;
    if (!empty($data->comment)) {
        $user->comment = $data->comment;
    }

    $user->modified = $data->modified;

// get jwt
    $jwt = isset($data->jwt) ? $data->jwt : "";


    // decode jwt here
// if jwt is not empty
    if ($jwt) {

        // if decode succeed, show user details
        try {

            // decode jwt
            $decoded = JWT::decode($jwt, $key, array('HS256'));

            // update balance will be here
            // create the product

            if ($user->setComment()) {
                // regenerate jwt will be here
                // we need to re-generate jwt because user details might be different

                $token = array(
                    "iss" => $iss,
                    "aud" => $aud,
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "data" => array(
                        "id" => $user->id,
                        "balance" => $user->comment,
                        "modified" => $user->modified
                    )
                );
                $jwt = JWT::encode($token, $key);

                // set response code
                http_response_code(200);

                // response in json format
                echo json_encode(
                    array(
                        "message" => "Adding balance was successfully completed.",
                        "status" => true,
                        "jwt" => $jwt,

                    )
                );
            } // message if unable to update user
            else {
                // set response code
                http_response_code(401);

                // show error message
                echo json_encode(array("message" => "Oops, something went wrong, you are not able to recharge",
                    "status" => false,
                ));
            }
        }

            // catch failed decoding will be here
            // if decode fails, it means jwt is invalid
        catch (Exception $e) {

            // set response code
            http_response_code(401);

            // show error message
            echo json_encode(array(
                "message" => "Access denied.",
                "status" => false,
                "error" => $e->getMessage()
            ));
        }
    }

// error message if jwt is empty will be here
// show error message if jwt is empty
    else {

        // set response code
        http_response_code(401);

        // tell the user access denied
        echo json_encode(array("message" => "Access denied.", "status" => false));
    }
}
