<?php
namespace App;


use Prototype\Mailer;

class LocalMailer implements Mailer {

    protected $subject;
    protected $body;
    protected $to = [];

    function subject($subject)
    {
        $this->subject = $subject;
    }

    function body($body)
    {
        $this->body = $body;
    }

    function add($to)
    {
        $this->to[] = $to;
    }

    function send()
    {
        echo "To: " . implode(", ", $this->to) . "\n";
        echo "Subject: " . $this->subject . "\n\n";
        echo $this->body;
        echo "\n-----------------------------------\n";
    }
}