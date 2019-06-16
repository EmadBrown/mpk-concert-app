<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/map/api/");
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

// submitted data will be here
// get posted data
$data = json_decode(file_get_contents("php://input"));

// Get new camping id if visitor booked a spot
$setCampingId = null;

$user = new User($db);

$totalTickets = 0;
$paidId = 0;

if (!empty($data->spot)) {
    $setCampingId = $user->setCamping();
}

if (sizeof($data->firstName) > 1) {
    $paidId = $user->createId();
}


// set product property values
for ($i = 0; $i < sizeof($data->firstName); $i++) {
    // instantiate product object
    $user->id = $user->createId();
    $user->firstName = $data->firstName[$i];
    $user->lastName = $data->lastName[$i];
    $user->email = $data->email;
    $user->password = uniqid();
    $user->paid = $paidId != 0 && $i > 0 ? $paidId : 0;
    $user->inEvent = 0;
    $user->inCamping = 0;
    $user->created = $data->createdAt;
    $user->camping_id = $data->spot[$i] ? $setCampingId : null;
    $totalTickets += $user->create() ? 1 : 0;

}
if ($totalTickets == sizeof($data->firstName)) {

    // set response code
    http_response_code(200);

    // display message: user was created
    echo json_encode(array("message" => "Your reservation was successfully completed.", "status" => true));
} // message if unable to reservation
else {

    // set response code
    http_response_code(400);

    // display message: unable to create user
    echo json_encode(array("message" => "Oops, something went wrong, you are not able to make reservation.", "status" => false));
}


// use the create() method here
// create the user
// if ($user->emailExists()) {
//     // set response code
//     http_response_code(400);

//     // display message: unable to create user
//     echo json_encode(array("message" => "Unable to create user. The email is already existed!"));
// } else 

// if ($user->create()) {
//     // set response code
//     http_response_code(200);

//     // display message: user was created
//     echo json_encode(array("message" => "User was created."));
// }

// // message if unable to create user
// else {

//     // set response code
//     http_response_code(400);

//     // display message: unable to create user
//     echo json_encode(array("message" => "Unable to book tickets."));
// }
