<?php
require 'vendor/autoload.php';


date_default_timezone_set('America/Sao_Paulo');
error_reporting(-1);

$kCertificateLocation = '../certs/server_certificates_bundle_sandbox.pem';
$kRootCertificateLocation = '../certs/entrust_root_certification_authority.pem';
$kDeviceToken = '7604F994FD08A7F6CA45A90EEDBB22E197779E6C70AECD9891DC5E41E8F3304F';

$push = new ApnsPHP_Push(
    ApnsPHP_Abstract::ENVIRONMENT_SANDBOX,
    $kCertificateLocation
);

$push->setRootCertificationAuthority($kRootCertificateLocation);
$push->connect();

$message = new ApnsPHP_Message($kDeviceToken);
$message->setCustomIdentifier(uniqid());
$message->setText('Hello APNs-enabled device!');
$push->add($message);
$push->send();
$push->disconnect();

// Examine the error message container
$aErrorQueue = $push->getErrors();
if (!empty($aErrorQueue)) {
    var_dump($aErrorQueue);
}
