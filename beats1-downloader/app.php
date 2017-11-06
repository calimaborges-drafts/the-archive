<?php
require_once "vendor/autoload.php";

$base = "http://itsliveradio.apple.com/streams/hub01/session01/256k/";
$prefix = "prog-";
$sufix = ".aac";
//$startTimeString = "20150630T160016Z";
$startTimeString = "20150630T181333Z";
$timeFormat = "Ymd\THis\Z";
$outputFolder = "/tmp";
$outputPrefix = "beats";
$outputSufix = ".aac";

$continue = true;

$currentTime = new Carbon\Carbon($startTimeString);

while (true) {
	$url = $base . $prefix . $currentTime->format($timeFormat) . $sufix;
	$output = $outputFolder . "/" . $outputPrefix . $currentTime->format($timeFormat) . $outputSufix;
	
	echo ".";

	$aac = @file_get_contents($url);

	if ($aac) {
		if (file_put_contents($output, $aac)) {
			echo "\nDownloaded " . $url . "... ";
			echo "Done\n";
		} else {
			echo "\nError writing\n";
		}
	} else {
		//echo "Error reading\n";
		echo ",";
		$continue = false;
	}

	$currentTime = $currentTime->addSecond(1);
}
