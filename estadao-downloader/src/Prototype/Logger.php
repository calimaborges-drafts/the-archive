<?php
namespace Prototype;

interface Logger {
    function write($text);
    function flush();
}
