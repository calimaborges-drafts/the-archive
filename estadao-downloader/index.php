<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Estadão Downloader</title>

        <!-- Google Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">

        <!-- CSS Reset -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">

        <!-- Milligram CSS minified -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.1.0/milligram.min.css">
    </head>
    <body>
    <?php
    require_once "vendor/autoload.php";

    use App\Bootstrap;

    $app = new Bootstrap();
    $app->init();
    ?>
    
    <!--
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Link</th>
                </tr>
            </thead>

            <tbody>
            <?php foreach ($app->fs->ls() as $file => $fileInfo): ?>
                <tr>
                    <td><?php echo $fileInfo['date'] ?></td>
                    <td><?php echo $file; ?></td>
                    <td><a href="<?php echo $fileInfo['url'] ?>" target="_blank"><?php echo $fileInfo['url'] ?></a></td>
                </tr>
            <?php endforeach ?>
            </tbody>
        </table>
    </div>
    -->
    </body>
</html>
