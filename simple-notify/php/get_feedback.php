<?php
require 'vendor/autoload.php';


date_default_timezone_set('America/Sao_Paulo');
error_reporting(-1);

$kCertificateLocation = '../certs/server_certificates_bundle_sandbox.pem';
$kRootCertificateLocation = '../certs/entrust_root_certification_authority.pem';
$kDeviceToken = '7604F994FD08A7F6CA45A90EEDBB22E197779E6C70AECD9891DC5E41E8F3304F';

$feedback = new ApnsPHP_Feedback(
    ApnsPHP_Abstract::ENVIRONMENT_SANDBOX,
    $kCertificateLocation
);

$feedback->setRootCertificationAuthority($kRootCertificateLocation);

$feedback->connect();

$aDeviceTokens = $feedback->receive();
if (!empty($aDeviceTokens)) {
    var_dump($aDeviceTokens);
}

$feedback->disconnect();