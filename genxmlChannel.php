<?php




require("dbinfo.php");

$dom = new DOMDocument("1.0");
$node = $dom->createElement("chaines");
$parnode = $dom->appendChild($node);


$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$value= $_COOKIE["v"];
 /*  
$antenne='';

$sql = "select antenne from mesure where id='$value' ";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  

while ($row = $result->fetch_assoc()){
 
 $antenne=$row["antenne"];
}
 
} else {
    echo "0 results";
}


$latitude='';
$longitude='';
	
$sql = "select latitude,longitude from antennes where nom='$antenne' ";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  

while ($row = $result->fetch_assoc()){
 $latitude=$row["latitude"];	
 $longitude=$row["longitude"];
 setcookie("latitude",$latitude);
 setcookie("longitude",$longitude);	
}
 
} else {
    echo "0 results";
}

*/

$sql = "select * from mesure where nom='$value' ";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  

while ($row = $result->fetch_assoc()){
 
  $node = $dom->createElement("chaine");
  $newnode = $parnode->appendChild($node);

  $newnode->setAttribute("chaine",$row['chaine']);
	$newnode->setAttribute("antenne",$row['antenne']);
	$newnode->setAttribute("FS",$row['FS']);	
	
}
   header ("Content-Type:text/xml");
  echo $dom->saveXML();
} else {
    echo "0 results";
}
$conn->close();





?>