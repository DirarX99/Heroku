<?php

require("dbinfo.php");

// Start XML file, create parent node

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a MySQL server

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Select all the rows in the markers table



$sql = "select * from mesure";
$result = $conn->query($sql);



if ($result->num_rows > 0) {
  

while ($row = $result->fetch_assoc()){
  // ADD TO XML DOCUMENT NODE
  $node = $dom->createElement("marker");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("nom", $row['nom']);
  $newnode->setAttribute("latitude", $row['latitude']);
  $newnode->setAttribute("longitude", $row['longitude']);
  $newnode->setAttribute("antenne", $row['antenne']);
  
}
   header ("Content-Type:text/xml");
  echo $dom->saveXML();
} else {
    echo "0 results";
}
$conn->close();

?>