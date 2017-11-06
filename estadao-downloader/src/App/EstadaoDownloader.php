<?php
namespace App;

use Carbon\Carbon;
use iio\libmergepdf\Merger;

use Prototype\Downloader;
use Prototype\Logger;
use Prototype\Filesystem;

use Exception\NotFoundException;
use Exception\NotPdfException;
use Exception\WrongStatusCodeException;
use Exception\NotAvailableException;
use Exception\EstadaoFailureException;

class EstadaoDownloader {

    protected $kBaseUrl;
    protected $kLetters;
    protected $kTimeFormat;
    protected $kFileExtension;

    protected $downloader;
    protected $logger;
    protected $fs;

    protected $date;
    protected $files;

    protected function constants() {
        $this->kBaseUrl = "http://digital.estadao.com.br/servicos/downloadpdf.asp?pdf=";
        $this->kLetters = array_merge(range('A','Z'), ['PME', 'guia']);
        $this->kTimeFormat = "Y_m_d";
        $this->kFileExtension = ".pdf";
    }

    public function __construct(Downloader $downloader, Logger $logger, Filesystem $fs, Carbon $date) {
        $this->downloader = $downloader;
        $this->logger = $logger;
        $this->fs = $fs;

        $this->date = $date;
        $this->files = [];
        $this->constants();
    }

    public function downloadAll() {
        $it_counter = 0;
        foreach ($this->kLetters as $letter) {
            $this->downloadPagesForLetter($letter);

            $it_counter++;
            if ($it_counter > 5 && count($this->files) == 0) {
                throw new EstadaoFailureException();
            }
        }

        if (count($this->files) < 1) {
            throw new NotAvailableException('Jornal não disponível ainda');
        }
    }

    public function generatePdf() {
        $m = new Merger();
        foreach ($this->files as $file) {
    		$m->addFromFile($file);
    	}
        $output = $m->merge();

        foreach ($this->files as $file) {
            if (file_exists($file)) unlink($file);
        }

        return $output;
    }

    public function downloadAndGenerate() {
        $this->downloadAll();
        $output = $this->generatePdf();
        $this->fs->save($output, 'estadao-' . $this->date->format('Y-m-d') . $this->kFileExtension);
    }

    protected function downloadPagesForLetter($letter) {
        $number = 1;
        $invalid_count = 0;

        while (true) {
            $pageCode = $letter . $number;
            $url = $this->kBaseUrl . $this->date->format($this->kTimeFormat) . "_" . $pageCode . $this->kFileExtension;
            $this->logger->write("GET {$url}", "DEBUG");
            $number++;

            $this->logger->write($pageCode);

            try {
                $this->files[] = $this->downloader->download($url);
                $this->logger->write('OK');

                $invalid_count = 0;
            } catch (WrongStatusCodeException $wsce) {
                $this->logger->write($wsce->getMessage());
                return;
            } catch (NotPdfException $npe) {
                $this->logger->write('INVALID FORMAT');
                $invalid_count++;

                if ($invalid_count > 2) return;
            } catch (NotFoundException $nfe) {
                $this->logger->write('NOT FOUND');
                return;
            }
        }
    }
}
