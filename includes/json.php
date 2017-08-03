<?php
// include('config.php');

// $query="select * from vacantes";
// $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

// $arr = array();
// if($result->num_rows > 0) {
// 	while($row = $result->fetch_assoc()) {
// 		$arr[] = $row;	
// 	}
// }
// # JSON-encode the response
// $json_response = json_encode($arr);

// // # Return the response
// echo $json_response;
//---------------------------------------------------------
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
 
  // Conectamos a la base de datos y hacemos un select
  $conn = new mysqli("localhost", "root", "", "bolsa");
 
  $result = $conn->query("SELECT * FROM vacantes");
 
  $outp = "";
  
  // Formateamos nuestro JSON
  while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{"fecha":"'  . $rs["fecha"] . '",';
      $outp .= '"puesto":"'   . $rs["puesto"]        . '",';
      $outp .= '"tiempo":"'   . $rs["tiempo"]        . '",';
      $outp .= '"lugar":"'. $rs["lugar"]     . '"}';
  }
  $outp ='{"records":['.$outp.']}';
  $conn->close();
 
  echo($outp);

?>
