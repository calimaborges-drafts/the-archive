<?php
namespace App;


use Aws\Api\DateTimeResult;
use Aws\S3\S3Client;
use Exception;
use Prototype\Filesystem;

class S3Filesystem implements Filesystem {

    protected $kBaseUrl = 'https://s3.amazonaws.com/estadao-downloader';

    protected $client;
    protected $bucket;
    protected $lastSaved;

    public function __construct($region = null, $version = null, $bucket = null) {
        if (!$region) $region = 'us-east-1';
        if (!$version) $version = '2006-03-01';
        if (!$bucket) $bucket = getenv('S3_BUCKET');
        if (!$bucket) throw new Exception('S3_BUCKET env var not set');
        $this->bucket = $bucket;

        $this->client = new S3Client([
            'region' => $region,
            'version' => $version
        ]);
    }

    public function save($output, $filename = null) {
        if (!$filename) $filename = uniqid();
        $file = $this->client->upload($this->bucket, $filename, $output, 'public-read');
        $this->lastSaved = $file->get('ObjectURL');
    }

    public function ls() {
        $files = $this->client->getIterator('ListObjects', array('Bucket' => $this->bucket));

        $actualFiles = [];

        foreach ($files as $file) {
            $key = $file['Key'];
            /** @var DateTimeResult $date */
            $date = $file['LastModified'];
            $date = $date->format('d/m/Y');

            $actualFiles[$key] = [
                'url' => $this->kBaseUrl . '/' . $key,
                'date' => $date
            ];
        }

        return $actualFiles;
    }

    public function lastSaved() {
        return $this->lastSaved;
    }
}