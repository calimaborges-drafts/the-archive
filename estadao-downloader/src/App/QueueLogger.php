<?php
namespace App;


use Prototype\Logger;

class QueueLogger implements Logger
{

    protected $logs = [];

    public function write($text, $type = "INFO") {
        error_log($text);

        if ($type != "DEBUG") $this->logs[] = $text;
    }

    public function flush() {
        return implode(" ", $this->logs);
    }
}