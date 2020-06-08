	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "brocoli",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 1.99
	},
	{
		name: "bread",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 10.00
	},
	{
		name: "steak",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 15.00
	},
	{
		name: "soda",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 1.00
	},
	{
		name: "rice",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 1.50
	},
	{
		name: "milk",
		vegetarian:true,
		glutenFree:true,
		organic: true,
		price:5.00
	},
	{
		name:"tomato",
		vegetarian:true,
		glutenFree:true,
		organic:false,
		price:2.50
	},
	{
		name:"frozen hotdogs",
		vegetarian:false,
		glutenFree:true,
		organic:false,
		price:7.00
	},
	{
		name:"corn tortillas",
		vegetarian:true,
		glutenFree:false,
		organic: true,
		price:4.00
	}
	
];

var restrictions = {
	vegetarian: false,
	glutenFree: false,
	organic: false
}


// Using the restrictions, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function filterProducts() {

	var avail_products = [...this.products];

	// If any of the restrictions have been applied, we filter them out, otherwise we can keep the list as is
	if(restrictions.vegetarian || restrictions.glutenFree || restrictions.organic) {
		avail_products = avail_products.filter(function(prod) {
			return (!this.restrictions.vegetarian ? true : prod.vegetarian == this.restrictions.vegetarian) &&
				   (!this.restrictions.glutenFree ? true : prod.glutenFree == this.restrictions.glutenFree) &&
				   (!this.restrictions.organic ? true : prod.organic == this.restrictions.organic)
		});
	}

	// Sort by price
	avail_products.sort(function(a,b) {
		if (a.price < b.price) {
			return -1;
		}
		if (a.price > b.price) {
			return 1;
		}
		return 0;
	});
	return avail_products;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}
