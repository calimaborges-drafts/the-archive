<?php
namespace App;

use Exception;
use Exception\NotAuthorizedException;
use Exception\NotFoundException;
use Exception\WrongStatusCodeException;
use iio\libmergepdf\Merger;
use GuzzleHttp\Client;

use Prototype\Downloader;
use Exception\CantWriteFileException;
use Exception\NotPdfException;

class PdfDownloader implements Downloader {

    /** @var  Client */
    protected $client;


    public function __construct($portalAuth, $oespGrant) {
        $this->initClient($portalAuth, $oespGrant);
    }

    public function initClient($portalAuth, $oespGrant) {
        $this->client = new Client([
        	'debug' => false,
        	'allow_redirects' => false,
        	'headers' => [
        		'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        		'Accept-Encoding' => 'gzip, deflate, sdch',
        		'Accept-Language' => 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4',
        		'User-Agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
        		'Cookie' => 'PORTAL_AUTH=' . $portalAuth . '; OESP_GRANT=' . $oespGrant . ';'
        	]
        ]);
    }

    public function saveToDisk($output) {
        $path = tempnam(sys_get_temp_dir(), 'estadao');
        if (file_exists($path)) unlink($path);
        $isOk = file_put_contents($path, $output);

        if (!$isOk) {
            throw new CantWriteFileException('Não foi possível criar arquivo local');
        }

        return $path;
    }

    public function isPdf($path) {
        try {
            $m = new Merger();
            $m->addFromFile($path);
            $m->merge();
            return true;
        } catch (Exception $ex) {
            return false;
        }
    }


    public function download($url) {
        try {
            $response = $this->client->get($url);
        } catch (Exception $ex) {
            throw new WrongStatusCodeException('500');
        }

        $output = $response->getBody();
        $path = $this->saveToDisk($output);

        if ($response->getStatusCode() == 302) {
            throw new NotAuthorizedException("Não autorizado. Verifique os Cookies de aunteticação");
        }

        if ($response->getStatusCode() == 404) {
            throw new NotFoundException("Arquivo $url não encontrado");
        }

        if ($response->getStatusCode() != 200) {
            throw new WrongStatusCodeException($response->getStatusCode());
        }

        if (!$this->isPdf($path)) {
            throw new NotPdfException("Arquivo em $url não apresenta formato válido");
        }

        return $path;
    }
}
