<?php




require("dbinfo.php");

$dom = new DOMDocument("1.0");
$node = $dom->createElement("coords");
$parnode = $dom->appendChild($node);


$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$value= $_COOKIE["v"];
   
$antenne='';

$sql = "select antenne from station where nom='$value' ";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  

while ($row = $result->fetch_assoc()){
 
 $antenne=$row["antenne"];
}
 
} else {
    echo "0 results";
}






$sql = "select * from antennes where nom='$antenne' ";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  

while ($row = $result->fetch_assoc()){
 
  $node = $dom->createElement("Acoords");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("latitude",$row['latitude']);
	$newnode->setAttribute("longitude",$row['longitude']);	
}
   header ("Content-Type:text/xml");
  echo $dom->saveXML();
} else {
    echo "0 results";
}
$conn->close();





?>