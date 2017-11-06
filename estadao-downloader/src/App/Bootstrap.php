<?php

namespace App;

use Dotenv\Dotenv;
use Prototype\Downloader;
use Prototype\Filesystem;
use Prototype\Logger;
use Prototype\Mailer;

class Bootstrap {

    /** @var  Dotenv */
    public $dotenv;

    /** @var  Mailer */
    public $mailer;

    /** @var  Downloader */
    public $downloader;

    /** @var  Logger */
    public $logger;

    /** @var  Filesystem */
    public $fs;

    public $estadao;

    public function init() {
        $this->initDotenv();
        $this->initBasicDependencies();
    }

    private function initDotenv() {
        $this->dotenv = new Dotenv(__DIR__ . '/../..');

        if(getenv('APP_ENV') !== 'production') {
            $this->dotenv->load();
        }

        $this->dotenv->required('AWS_ACCESS_KEY_ID');
        $this->dotenv->required('AWS_SECRET_ACCESS_KEY');
        $this->dotenv->required('S3_BUCKET');
        $this->dotenv->required('ADMIN_EMAIL');
        $this->dotenv->required('USERS_EMAIL');
        $this->dotenv->required('PORTAL_AUTH');
        $this->dotenv->required('OESP_GRANT');
        $this->dotenv->required('APP_URL');
        $this->dotenv->required('MAILGUN_SECRET_API_KEY');
        $this->dotenv->required('MAILGUN_DOMAIN');
    }

    private function initBasicDependencies() {
        $this->mailer = new MailgunMailer(getenv('MAILGUN_SECRET_API_KEY'), getenv('MAILGUN_DOMAIN'));
//        $this->mailer = new LocalMailer();
        $this->downloader = new PdfDownloader(getenv('PORTAL_AUTH'), getenv('OESP_GRANT'));
        $this->logger = new QueueLogger();
        $this->fs = new S3Filesystem();
    }
}