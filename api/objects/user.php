<?php

// 'user' object
class User
{

    // database connection and table name
    private $conn;
    private $visitor = "visitor";
    private $camping = "camping";
    private $maxTickets = 29989999;


    // object properties
    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $balance;
    public $modified;
    public $camping_id = null;
    public $comment;
    public $inEvent;
    public $inCamping;
    public $RFID;
    public $paid;
    public $created;

    // constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create() method will be here
    // create new user record
    function create()
    {
        // insert query
        $query = "INSERT INTO " . $this->visitor . "
            SET
                Visitor_ID = :id,
                First_Name = :firstName,
                Last_Name = :lastName,
                Email = :email,
                Password = :password,
                Paid = :paid,
                In_Event = :inEvent,
                In_Camping = :inCamping,
                Camping_ID = :camping_id,
                Created = :created";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->inEvent = htmlspecialchars(strip_tags($this->inEvent));
        $this->inCamping = htmlspecialchars(strip_tags($this->inCamping));
        $this->paid = htmlspecialchars(strip_tags($this->paid));
        $this->camping_id = htmlspecialchars(strip_tags($this->camping_id));
        $this->created = htmlspecialchars(strip_tags($this->created));

        // bind the values
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':firstName', $this->firstName);
        $stmt->bindParam(':lastName', $this->lastName);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':inEvent', $this->inEvent);
        $stmt->bindParam(':inCamping', $this->inCamping);
        $stmt->bindParam(':paid', $this->paid);
        $stmt->bindParam(':camping_id', $this->camping_id);
        $stmt->bindParam(':created', $this->created);


        // hash the password before saving to database
        $this->password = htmlspecialchars(strip_tags($this->password));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);


        if ($this->camping_id == null) {
            $this->camping_id = null;
        }

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function createId()
    {

        // query get last record ID
        $query = "SELECT Visitor_ID FROM " . $this->visitor . " ORDER BY Visitor_ID DESC LIMIT 1";

        $stmt = $this->conn->prepare($query);

        // execute the query
        $stmt->execute();

        // get record details / values
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return empty($row['Visitor_ID']) ? $this->maxTickets : $row['Visitor_ID'] + 1;
    }

    // emailExists() method will be here
    // check if given email exist in the database
    function emailExists()
    {

        // query to check if email exists
        $query = "SELECT Visitor_ID, First_Name, Last_Name, Password, Comment, Balance, In_Event, In_Camping,
	         RFID, Paid, Camping_ID, Created, Modified
            FROM " . $this->visitor . "
            WHERE Email = ?
            ORDER BY Visitor_ID ASC LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind given email value
        $stmt->bindParam(1, $this->email);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();


        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['Visitor_ID'];
            $this->firstName = $row['First_Name'];
            $this->lastName = $row['Last_Name'];
            $this->balance = $row['Balance'];
            $this->password = $row['Password'];
            $this->created = $row['Created'];
            $this->comment = $row['Comment'];
            $this->modified = $row['Modified'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    // MPKIdExists() method will be here
    // check if given mpkId exist in the database
    function MPKIdExists()
    {

        // query to check if id exists
        $query = "SELECT Visitor_ID, First_Name, Last_Name, Password
            FROM " . $this->visitor . "
            WHERE Visitor_ID = ?
            LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));

        // bind given ID value
        $stmt->bindParam(1, $this->id);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if id exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['Visitor_ID'];
            $this->firstName = $row['First_Name'];
            $this->lastName = $row['Last_Name'];
            $this->password = $row['Password'];

            // return true because ID exists in the database
            return true;
        }

        // return false if ID does not exist in the database
        return false;
    }

    // update() method will be here
    // update a user record
    public function update()
    {

        // if password needs to be updated
        $password_set = !empty($this->password) ? ", Password = :password" : "";

        // if no posted password, do not update the password
        $query = "UPDATE " . $this->visitor . "
                SET
                First_Name = :firstName,
                Last_Name = :lastName,
                    Email = :email,
                    Balance = :balance,
                    Modified = :modified,
                    {$password_set}
                WHERE Visitor_ID = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->balance = htmlspecialchars(strip_tags($this->balance));
        $this->modified = htmlspecialchars(strip_tags($this->modified));


        // bind the values from the form
        $stmt->bindParam(':firstName', $this->firstName);
        $stmt->bindParam(':lastName', $this->lastName);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':balance', $this->balance);
        $stmt->bindParam(':modified', $this->modified);

        // hash the password before saving to database
        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }

        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function setBalance()
    {
        // if update balance account
        $query = "UPDATE " . $this->visitor . "
                SET
                Balance = :balance,
                Modified = :modified
                WHERE Visitor_ID = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->balance = htmlspecialchars(strip_tags($this->balance));
        $this->modified = htmlspecialchars(strip_tags($this->modified));

        $stmt->bindParam(':balance', $this->balance);

        // bind the values from the form
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':modified', $this->modified);


        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Set camping Id
    public function setCamping()
    {
        // query to get last inserted camping
        $query = "SELECT Camping_ID
            FROM " . $this->camping . " ORDER BY Camping_ID DESC LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // execute the query
        $stmt->execute();

        // get record details / values
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // assign values to object properties
        $this->camping_id = $row['Camping_ID'] + 1;

        // insert query
        $query = "INSERT INTO " . $this->camping . "
            SET Camping_ID = :camping_id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $stmt->bindParam(':camping_id', $this->camping_id);

        // execute the query
        $stmt->execute();

        // return true
        return $this->camping_id;
    }


    // Set camping Id
    public function setComment()
    {
        // insert query
        $query = "UPDATE " . $this->visitor . "
                SET
                    Comment = :comment,
                    Modified = :modified
                WHERE Visitor_ID = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->comment = htmlspecialchars(strip_tags($this->comment));
        $this->modified = htmlspecialchars(strip_tags($this->modified));


        // bind the values from the form
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':comment', $this->comment);
        $stmt->bindParam(':modified', $this->modified);

        // execute the query
        if ($stmt->execute()) {
            // return true
            return true;
        }
        return false;
    }

    /**
     * Get balance by Visitor ID
     * @return mixed
     */
    public function getBalance()
    {
        $query = "SELECT Balance
            FROM " . $this->visitor . "
            WHERE Visitor_ID = ?
            LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));

        // bind given visitor ID value
        $stmt->bindParam(1, $this->id);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties

            $this->balance = $row['Balance'];

            // return balance
            return $this->balance;
        }
        return false;
    }

    public function getAllData()
    {
        $totalInCamping = 0;
        $totalInEvent = 0;
        $totalSpot = 0;

        // query get All data
        $query = "SELECT Visitor_ID, First_Name, Last_Name, Email, Comment, Balance, In_Event, In_Camping,
	         RFID, Paid, Camping_ID, Created, Modified
            FROM " . $this->visitor . "
            ORDER BY Visitor_ID ASC ";

        // prepare the query
        $stmt = $this->conn->prepare($query);


        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        $visitors_arr = array();
        $visitors_arr["data"] = array();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // assign values to object properties
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);

                $visitors = array(
                    // assign values to object properties
                    'id' => $row['Visitor_ID'],
                    'firstName' => $row['First_Name'],
                    'lastName' => $row['Last_Name'],
                    'email' => $row['Email'],
                    'balance' => $row['Balance'] == null ? 0 : $row['Balance'],
                    'comment' => $row['Comment'],
                    'location' => $row['In_Event'] == 0 ? 'Out Of The Event' : ($row['In_Camping'] == 0 ? 'Event area' : 'Camping area'),
                    'RFID' => $row['RFID'],
                    'paid' => $row['Paid'],
                    'Camping_ID' => $row['Camping_ID'] == null ? 'No' : $row['Camping_ID'],
                    'created' => $row['Created'],
                    'modified' => $row['Modified'],
                );

                $totalInCamping += $row['In_Camping'];
                $totalInEvent += $row['In_Camping'] == 1 ? 0 : $row['In_Event'];
                $totalSpot += $row['Camping_ID'] != null ? 1 : 0;

                array_push($visitors_arr["data"], $visitors);
            }

            // query get Sales Shop data
            $querySale =
                "SELECT i.Sale_Item_Number, i.Sale_Item_Name, i.Sale_Item_Price,
                    IFNULL((
                    SELECT SUM(Quantity) FROM sale_t WHERE Sale_Item_Number = i.Sale_Item_Number
                    GROUP BY Sale_Item_Number
                    ), 0) AS Quantity
                     FROM sale_item i";

            // prepare the query
            $stmtSale = $this->conn->prepare($querySale);

            // execute the query
            $stmtSale->execute();

            $numSale = $stmtSale->rowCount();

            $sales_arr = array();
            $sales_arr["sales"] = array();

            $totalSaleShops = 0;

            // echo $numSale;
            if ($numSale > 0) {

                // assign values to object properties
                while ($row = $stmtSale->fetch(PDO::FETCH_ASSOC)) {
                    // extract row
                    // this will make $row['name'] to
                    // just $name only
                    extract($row);

                    $sales = array(
                        // assign values to object properties
                        'id' => $row['Sale_Item_Number'],
                        'saleItemName' => $row['Sale_Item_Name'],
                        'saleItemPrice' => $row['Sale_Item_Price'],
                        'quantity' => $row['Quantity'],
                        'total' => $row['Quantity'] * $row['Sale_Item_Price'],
                    );

                    $totalSaleShops += $row['Quantity'] * $row['Sale_Item_Price'];

                    array_push($sales_arr["sales"], $sales);
                }
            }

            // query get Souvenir Shop data
            $querySouvenir =
                "SELECT i.Item_Number, i.Item_Name, i.Item_Price,
                    IFNULL((SELECT SUM(Quantity) FROM souvenir_t
                    WHERE Item_Number = i.Item_Number
                    GROUP BY Item_Number),0) AS Quantity
                    FROM souvenir_item i";

            // prepare the query
            $stmtSouvenir = $this->conn->prepare($querySouvenir);

            // execute the query
            $stmtSouvenir->execute();

            $numSouvenir = $stmtSouvenir->rowCount();

            $souvenir_arr = array();
            $souvenir_arr["souvenir"] = array();
            $totalSouvenirShop = 0;

            // echo $numSale;
            if ($numSouvenir > 0) {

                // assign values to object properties
                while ($row = $stmtSouvenir->fetch(PDO::FETCH_ASSOC)) {
                    // extract row
                    // this will make $row['name'] to
                    // just $name only
                    extract($row);

                    $salesSouvenir = array(
                        // assign values to object properties
                        'id' => $row['Item_Number'],
                        'souvenirItemName' => $row['Item_Name'],
                        'souvenirItemPrice' => $row['Item_Price'],
                        'quantity' => $row['Quantity'],
                        'total' => $row['Quantity'] * $row['Item_Price'],
                    );
                    $totalSouvenirShop += $row['Quantity'] * $row['Item_Price'];

                    array_push($souvenir_arr["souvenir"], $salesSouvenir);
                }
            }

            // query get Loan Shop data
            $queryLoan =
                "SELECT (SUM((SELECT L_Item_Price FROM loan_item
                WHERE L_Item_Number = T.L_Item_Number AND Return_Time IS NULL))
                -SUM((SELECT L_Item_Price/2 FROM loan_item WHERE L_Item_Number = T.L_Item_Number
                 AND Created IS NULL))) AS loan FROM loan_t T";

            // prepare the query
            $stmtLoan = $this->conn->prepare($queryLoan);

            // execute the query
            $stmtLoan->execute();

            $numLoan = $stmtLoan->rowCount();

            $loan_arr = array();
            $loan_arr["loan"] = array();

            $totalLoanShop = 0;

            if ($numLoan > 0) {

                // get record details / values
                $row = $stmtLoan->fetch(PDO::FETCH_ASSOC);
                $totalLoanShop = (int)$row['loan'];
            }

            // return data if it does exists in the database
            return array(
                'totalLoanShop' => $totalLoanShop,
                'totalSaleShops' => $totalSaleShops,
                'totalSouvenirShop' => $totalSouvenirShop,
                'souvenir' => $souvenir_arr,
                'sales' => $sales_arr,
                'data' => $visitors_arr,
                'totalVisitors' => $num,
                'totalInCamping' => $totalInCamping,
                'totalInEvent' => $totalInEvent,
                'totalSpot' => $totalSpot,
                'ticketPrice' => 50,
                'spotPrice' => 20,
                'CapacityOfVisitors' => 10000,
            );
        }
        // return null if no data does not exist in the visitors tables
        return null;
    }

    public
    function getComments()
    {
        // query to check if email exists
        $query = "SELECT Visitor_ID, First_Name, Last_Name, Comment 
            FROM " . $this->visitor . "
            WHERE Comment IS NOT NULL
            ORDER BY Visitor_ID  ASC ";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();


        // if there is any record, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // comments array
            $comments_arr = array();
            $comments_arr["data"] = array();

            // assign values to object properties
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);

                $comments = array(
                    'id' => $row['Visitor_ID'],
                    "firstName" => $row['First_Name'],
                    "lastName" => $row['Last_Name'],
                    "comment" => $row['Comment'],
                );

                array_push($comments_arr["data"], $comments);
            }

            // return true because email exists in the database
            return $comments_arr;
        }

        // return null if no data does not exist
        return null;
    }

}
