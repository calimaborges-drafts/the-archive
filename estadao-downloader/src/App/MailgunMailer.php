<?php
namespace App;


use Prototype\Mailer;
use Mailgun\Mailgun;

class MailgunMailer implements Mailer {

    protected $subject;
    protected $body;
    protected $to = [];
    protected $domain;

    protected $mg;

    public function __construct($key, $domain) {
        $this->domain = $domain;
        $this->mg = new Mailgun($key);
    }

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
        $this->mg->sendMessage($this->domain, [
           'from' => 'no-reply@' . $this->domain,
            'to'  => implode(",", $this->to),
            'subject' => $this->subject,
            'text' => $this->body
        ]);
    }
}