<?php
    $Host = "localhost";
    $User = "root";
    $Pass = "";
    $Dbs = "pm_dbs";

    $conn = new mysqli($Host, $User, $Pass,$Dbs);
    if(!$conn){
        die("Connection refused by dbs" . $conn->connect_error);
    }

    $sql = "SELECT * FROM gebruikers";

    $result = $conn->query($sql);

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $tem = $row; 
            $json = json_encode($tem);
        }
    }

    else {
        echo "No results";
    }
    echo $json;
    $conn->close();

?>