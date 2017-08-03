<?php
   $target_dir    = '../file/';
   $tempPath      = $_FILES[ 'file' ][ 'name' ];
   $target_file   = $target_dir . basename($tempPath);
   move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
   echo "ok in upload file tks";

 ?>