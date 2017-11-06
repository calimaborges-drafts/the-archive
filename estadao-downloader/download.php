#!/usr/bin/env php

<?php
require_once "vendor/autoload.php";

use App\Bootstrap;
use App\EstadaoDownloader;

$app = new Bootstrap();
$app->init();


ini_set('memory_limit', '512M');

try {
    $appUrl = getenv('APP_URL');

    $date = null;
    if (count($argv) > 1) {
        $date = new Carbon\Carbon($argv[1], 'America/Sao_Paulo');
    }
    if (!$date) $date = new Carbon\Carbon();

    $estadao = new EstadaoDownloader($app->downloader, $app->logger, $app->fs, $date);

    $fail = false;

    $estadao->downloadAndGenerate();
} catch (Exception $e) {
    $fail = true;
    $app->logger->write($e->getMessage());
}

$app->mailer->subject('Estadão ' . $date->format('d/m/Y'));

foreach (explode(",", getenv('USERS_EMAIL')) as $email) {
    $app->mailer->add($email);
}


if (!$fail) {
    $message  = "Bom dia!\n";
    $message .= "Sua cópia do Estadão do dia " . $date->format('d/m/Y') . " está pronta.\n";
    $message .= "Para baixa-la acesse " . $app->fs->lastSaved();
} else {
    $message  = "Bom dia!\n";
    $message .= "Infelizmente não foi possível baixar sua cópia do Estadão do dia " . $date->format('d/m/Y') . ".\n";
    $message .= "Já estamos analisando e corrigiremos o problema em breve.";
    $app->mailer->add(getenv('ADMIN_EMAIL'));
}

$message .= "\n\n";
$message .= "O log do download foi: ";
$message .= "\n\n";
$message .= "--------------------------\n";
$message .= $app->logger->flush();
$message .= "\n--------------------------";
$message .= "\n\n";
$message .= "Atenciosamente,\n";
$message .= "Estadão Downloader ($appUrl)";

$app->mailer->body($message);
$app->mailer->send();