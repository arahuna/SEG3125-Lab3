var cart = []

// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
function openInfo(evt, tabName) {
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName('tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName('tablinks')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}

	// If we are navigating to the products page, we want to populate the products
	if (tabName == 'Products') {
		populateListProductChoices('displayProduct')
	}

	if (tabName == 'Cart') {
		selectedItems();
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = 'block'
	evt.currentTarget.className += ' active'
}

// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct2) {
	var s2 = document.getElementById(slct2)

	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
	s2.innerHTML = ''

	// obtain a reduced list of products based on restrictions
	var optionArray = filterProducts()

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	for (i = 0; i < optionArray.length; i++) {
		var productCategory = optionArray[i]

		// If the product category has no products, we don't want to include it
		if (productCategory.products.length === 0) {
			continue
		}

		var button = document.createElement('button')
		button.className = 'accordion'
		button.appendChild(document.createTextNode(productCategory.name))
		button.addEventListener('click', function () {
			this.classList.toggle('active')

			var panel = this.nextElementSibling
			if (panel.style.display === 'block') {
				panel.style.display = 'none'
			} else {
				panel.style.display = 'block'
			}
		})
		s2.appendChild(button)

		var div = document.createElement('div')
		div.className = 'panel'

		productCategory.products.forEach((p) => {
			var productDiv = document.createElement('div')
			productDiv.className = 'productDiv'

			var image = document.createElement('img')
			image.src = 'images/' + p.name + '.JPG'
			div.appendChild(image)

			var label = document.createElement('label')
			label.htmlFor = p.name
			label.id = p.name
			label.className = 'productName'
			label.appendChild(document.createTextNode(p.name))
			productDiv.appendChild(label)

			productDiv.appendChild(document.createElement('br'))

			var price = document.createElement('label')
			price.htmlFor = p.price
			price.className = 'productPrice'
			price.appendChild(document.createTextNode('$' + p.price))
			productDiv.appendChild(price)

			productDiv.appendChild(document.createElement('br'))

			var addToCart = document.createElement('button')
			addToCart.className = 'block'
			addToCart.type = 'button'
			addToCart.id = 'addCart'
			addToCart.appendChild(document.createTextNode('Add to cart'))
			addToCart.addEventListener('click', function () {
				if (!cart.includes(p)) {
					cart.push(p)
					productDiv.appendChild(document.createElement('br'))
					var success = document.createElement('label')
					success.appendChild(
						document.createTextNode(
							'Success, ' + p.name + ' has been added to your cart.'
						)
					)
					productDiv.appendChild(success)
				}
			})
			productDiv.appendChild(addToCart)

			div.appendChild(productDiv)

			div.appendChild(document.createElement('br'))
		})
		s2.appendChild(div)
	}
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph)
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {

	var c = document.getElementById('displayCart')
	c.innerHTML = ''


	// build list of selected item
	var para = document.createElement('P')
	para.innerHTML = 'You selected : '
	para.appendChild(document.createElement('br'))
	for (i = 0; i < cart.length; i++) {
		para.appendChild(document.createTextNode(cart[i].name))
		para.appendChild(document.createElement('br'))
	}

	// add paragraph and total price
	c.appendChild(para)
	c.appendChild(
		document.createTextNode('Total Price is ' + getTotalPrice(cart))
	)
}

// Calculate the total price 
function getTotalPrice(cart) {
	var sum = 0
	cart.forEach(p => {
		sum += p.price;
	})
	return sum
}

function setRestriction(restriction) {
	var selection =
		document.getElementById(restriction).value === 'true' ? true : false
	console.log(selection)
	if (restriction === 'vegetarian') {
		setVegetarian(selection)
	} else if (restriction === 'gluten-free') {
		setGlutenFree(selection)
	} else if (restriction === 'organic') {
		setOrganic(selection)
	}
}
