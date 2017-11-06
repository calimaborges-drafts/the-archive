<?php
namespace App;


use Prototype\Filesystem;

class LocalFilesystem implements Filesystem {

    protected $lastSaved;

    public function lastSaved() {
        return $this->lastSaved;
    }

    public function save($output, $filename = null) {
        $this->lastSaved = tempnam(sys_get_temp_dir(), 'localfsphp');
        file_put_contents($this->lastSaved, $output);
    }

    public function ls() {
        $files = scandir(sys_get_temp_dir());

        $actualFiles = [];
        foreach ($files as $file) {
            if ($this->startsWith($file, 'localfsphp')) {
                $actualFiles[$file] = [
                    'url' => 'file://' . sys_get_temp_dir() . '/' . $file,
                    'date' => ''
                ];
            }
        }

        return $actualFiles;
    }


    private function startsWith($haystack, $needle) {
        return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== false;
    }
}