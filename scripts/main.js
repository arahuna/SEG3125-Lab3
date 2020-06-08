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
			continue;
		}


		var button = document.createElement("button");
		button.className = "accordion";
		button.appendChild(document.createTextNode(productCategory.name));
		button.addEventListener("click", function() {
			this.classList.toggle("active");

			var panel = this.nextElementSibling;
			if(panel.style.display === "block"){ 
				panel.style.display = "none";
			} else {
				panel.style.display = "block";
			}
		});
		s2.appendChild(button);


		var div = document.createElement("div")
		div.className = "panel";

		productCategory.products.forEach((p) => {

			var image = document.createElement('img')
			image.src = "images/" + p.name + '.JPG'
			div.appendChild(image)

			var checkbox = document.createElement('input')
			checkbox.type = 'checkbox'
			checkbox.name = 'product'
			checkbox.value = p.name
			div.appendChild(checkbox)

			// create a label for the checkbox, and also add in HTML DOM
			var label = document.createElement('label')
			label.htmlFor = p.name
			label.appendChild(
				document.createTextNode(p.name + ' $' + p.price)
			)
			div.appendChild(label)

			div.appendChild(document.createElement('br'))
		})
		s2.appendChild(div);
	}
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph)
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {
	var ele = document.getElementsByName('product')
	var chosenProducts = []

	var c = document.getElementById('displayCart')
	c.innerHTML = ''

	var d = document.getElementById('success')
	d.innerHTML = ''

	// build list of selected item
	var para = document.createElement('P')
	para.innerHTML = 'You selected : '
	para.appendChild(document.createElement('br'))
	for (i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value))
			para.appendChild(document.createElement('br'))
			chosenProducts.push(ele[i].value)
		}
	}

	d.appendChild(
		document.createTextNode('Success, your items have been added to your cart.')
	)

	// add paragraph and total price
	c.appendChild(para)
	c.appendChild(
		document.createTextNode('Total Price is ' + getTotalPrice(chosenProducts))
	)
}

function setRestriction(restriction) {
	var selection = document.getElementById(restriction).value === "true" ? true : false;
	console.log(selection);
	if(restriction === "vegetarian"){
		setVegetarian(selection);
	} else if (restriction === "gluten-free"){
		setGlutenFree(selection);
	} else if (restriction === "organic") {
		setOrganic(selection);
	}

}
