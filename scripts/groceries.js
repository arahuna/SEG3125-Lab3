// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var productCategories = [
	{
		name: 'Fruits and Vegetables',
		products: [
			{
				name: 'Broccoli',
				vegetarian: true,
				glutenFree: true,
				organic: true,
				price: 1.99,
			},
			{
				name: 'Tomato',
				vegetarian: true,
				glutenFree: true,
				organic: false,
				price: 2.5,
			},
			{
				name: 'Apple',
				vegetarian: true,
				glutenFree: true,
				organic: false,
				price: 1.25,
			},
		],
	},
	{
		name: 'Bakery',
		products: [
			{
				name: 'Bread',
				vegetarian: true,
				glutenFree: false,
				organic: false,
				price: 2.35,
			},
		],
	},
	{
		name: 'Meat & Seafood',
		products: [
			{
				name: 'Salmon',
				vegetarian: false,
				glutenFree: true,
				organic: true,
				price: 10.0,
			},
			{
				name: 'Steak',
				vegetarian: false,
				glutenFree: true,
				organic: false,
				price: 15.0,
			},
			{
				name: 'Hotdogs',
				vegetarian: false,
				glutenFree: true,
				organic: false,
				price: 7.0,
			},
		],
	},
	{
		name: 'Dairy',
		products: [
			{
				name: 'Butter',
				vegetarian: false,
				glutenFree: true,
				organic: false,
				price: 4.5,
			},
			{
				name: 'Milk',
				vegetarian: true,
				glutenFree: true,
				organic: true,
				price: 5.0,
			},
		],
	},
	{
		name: 'Snacks',
		products: [
			{
				name: 'Soda',
				vegetarian: true,
				glutenFree: true,
				organic: false,
				price: 1.0,
			},

			{
				name: 'Tortilla Chips',
				vegetarian: true,
				glutenFree: false,
				organic: false,
				price: 4.0,
			},
		],
	},
]

var restrictions = {
	vegetarian: false,
	glutenFree: false,
	organic: false,
}


// Using the restrictions, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function filterProducts() {
	var avail_products = [...this.productCategories]
	// Go through each product category to filter out and sort them by price
	avail_products.forEach((p) => {
		// If any of the restrictions have been applied, we filter them out
		if (
			restrictions.vegetarian ||
			restrictions.glutenFree ||
			restrictions.organic
		) {
			p.products = p.products.filter(function (prod) {
				return (
					(!this.restrictions.vegetarian
						? true
						: prod.vegetarian == this.restrictions.vegetarian) &&
					(!this.restrictions.glutenFree
						? true
						: prod.glutenFree == this.restrictions.glutenFree) &&
					(!this.restrictions.organic
						? true
						: prod.organic == this.restrictions.organic)
				)
			})
		}
		// Sort by price
		if (p.products?.length != 0) {
			p.products.sort(function (a, b) {
				if (a.price < b.price) {
					return -1
				}
				if (a.price > b.price) {
					return 1
				}
				return 0
			})
		}
	})

	return avail_products
}


//Setters for restrictions
function setVegetarian(selection) {
	this.restrictions.vegetarian = selection
}

function setGlutenFree(selection) {
	this.restrictions.glutenFree = selection
}

function setOrganic(selection) {
	this.restrictions.organic = selection
}
