<?php

$data = json_decode(file_get_contents("php://input"), true);

$formData = [
    "firstName" => $data['firstName'],
    "lastName" => $data['lastName'],
    "email" => $data['email'],
    "phone" => $data['phone'],
    "offer" => $data['offer'],
    "buyer" => $data['buyer'],
    "target" => $data['target'],
    "creo" => $data['creo'],
    "ip" => $data['ip'],
    "country" => $data['country'],
    "source" => $data['source'],
    "lang" => $data['lang'],
    "quiz" => $data['quiz'],
    "clickId" => $data['clickId'],
    "idpxl" => $data['idpxl'],
    "fbclid" => $data['fbclid'],
    "token" => $data['token'], 
    "eventID" => $data['eventID'],
    "city" => $data['city'],
    "userAgent" => $_SERVER['HTTP_USER_AGENT'],
  ];

$url = 'https://sultingsolution.com/api/v1/leads';

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 2);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_USERAGENT, 'LANDING');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($formData));
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Accept: application/json",
]);

$result = curl_exec($curl);

curl_close($curl);

$response = json_decode($result, true);
if (isset($response['errors'])) {
    $response['saved'] = 'false';
    
    foreach ($response['errors'] as $key => $errorCodes) {
        
        $response['errors'] = array_merge($response['errors'], $errorCodes);

        unset($response['errors'][$key]);
    }
}

echo json_encode($response);