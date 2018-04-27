var mysql = require("mysql");

var inquirer = require("inquirer");

require("console.table");

var con = mysql.createConnection(
{
	host: "localhost",
	user: "root",
	port: 3306,
	password: "root",
	database: "bamazon"
});

con.connect(function(err)
{
	if(err)
	{
		console.error(err);
	}
	productsFill();
});

function productsFill()
{
	con.query("SELECT * FROM products", function(err, res)
	{
		if(err) throw err;

		console.table(res);

		getUserInputProduct(res);
	});
}

function getUserInputProduct(inventory)
{
	inquirer
		.prompt([
			{
				type: "input",
				name: "choice",
				message: "Please enter the ID of the item you'd like to buy (To quit, press Q): ",
				validate: function(val)
				{
					return !isNaN(val) || val.toLowerCase() === "q";
				} 
			}

		]).then(function(val)
		{
			programClose(val.choice);
			var chosenId = parseInt(val.choice);
			var product = searchInventory(chosenId, inventory);

			if(product)
			{
				getUserInputQuantity(product);
			}

			else
			{
				console.log("\nWe do not carry this product");
				productsFill();
			}
		});
}

function getUserInputQuantity(product)
{
	inquirer
	.prompt([
		{
			type: "input",
			name: "quantity",
			message: "How many products would you like to buy? [Press Q to quit]",
			validate: function(val)
			{
				return val > 0 || val.toLowerCase() === "q";
			}
		}
	]).then(function(val)
	{
		programClose(val.quantity);
		var quantity = parseInt(val.quantity);

		if(quantity > product.stock_quantity)
		{
			console.log("\nOut of this product, sorry.");
			productsFill();
		}

		else
		{
			buyProduct(product, quantity);
		}
	});
}

function buyProduct(product, quantity)
{
	con.query(
		"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
		[quantity, product.item_id],
		function(err, res)
		{
			console.log("\nYou've bought " + quantity + " " + product.product_name + "'s!");
			productsFill();
		}
	);
}

function searchInventory(choice, inventory)
{
	for(var i = 0; i < inventory.length; i++)
	{
		if(inventory[i].item_id === choice)
		{
			return inventory[i];
		}
	}

	return null;
}

function programClose(choice)
{
	if(choice.toLowerCase() === "q")
	{
		console.log("Probably made the right choice, we're not doing so good right now");
		process.exit(0);
	}
}

module.exports = con;