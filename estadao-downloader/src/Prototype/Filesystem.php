<?php
namespace Prototype;

interface Filesystem {
    function save($output, $filename = null);
    function ls();
    function lastSaved();
}
