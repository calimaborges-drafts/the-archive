<?php
namespace Prototype;

interface Mailer {
    function subject($subject);
    function body($body);
    function add($to);
    function send();
}
