
var mysql = require('mysql');
var inquirer = require('inquirer');

var response = [];

var connection = mysql.createConnection({
    // user credentials
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'

});

connection.connect(function (err) {
    if (err) throw err;

    console.log("Connection succesfull!");
    populateTable();
   


})


function populateTable() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' + res[i].department_name +
                ' | ' + res[i].price + ' | ' + res[i].stock_quantity + ' | ' + "\n");
        };

        promptCustomer(res);


    })
}

    var promptCustomer = function (res) {

        inquirer.prompt([{
            type: 'input',
            name: 'choice',
            message: 'what would you want to purchase?'

        }]).then(function (answer) {

            var order = false;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name == answer.choice) {
                    order = true;
                    var product = answer.choice;
                    var id = i;
                    inquirer.prompt({
                        type: 'input',
                        name: 'quantity',
                        message: 'how many would you like to buy?',
                        validate: function (value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function (answer) {
                        if ((res[id].stock_quantity - answer.quantity) > 0) {
                            connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.quantity)+"'" +
                                "WHERE product_name='" + product + "'", function (err, res2) {
                                    populateTable();
                                })
                        } else {
                            console.log('Not a valid selection');
                            promptCustomer(res);
                        }
                    })
                }
            }
        })
    }