<?php
$NomServeur = $_SERVER['SERVER_NAME'] ; 
$local = ( (substr($NomServeur, 0, 7) == '192.168') || ($NomServeur == 'localhost') || (substr($NomServeur, 0, 3) == '127') );

$host = $local ? 'localhost' : 'xxxxxx'; 
$user = $local ? 'root' : 'xxxxxx'; 
$pass = $local ? '' : 'xxxxxx'; 
$database = $local ? 'test' : 'xxxxxx'; 
$verbose = $local;

try {
    $base = new PDO('mysql:host='.$host.';dbname='.$database, $user, $pass);

} catch (PDOException $erreur) {
    if ($verbose) {
        echo 'Erreur : '.$erreur->getMessage();
    } else {
        echo 'Ce service est momentanément indisponible. Veuillez nous excuser pour la gêne occasionnée.';
    }
}
?>