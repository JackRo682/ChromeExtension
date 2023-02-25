// Find all the <td> elements with the "data-original-value" attribute
const productNameCells = document.querySelectorAll('td[data-original-value]');

// Extract the data from each <td> element and store it in an array
const productNames = Array.from(productNameCells).map(td => td.getAttribute('data-original-value'));

// Find all the <td> elements with the "class" attribute
const priceCells = document.querySelectorAll('td.right-align');

// Extract the data from each <td> element and store it in an array
const prices = [];
for (let i = 0; i < priceCells.length; i += 2) {  
  const priceElement = priceCells[i].querySelector('span');
  if (priceElement) {
    prices.push(priceElement.textContent);
  }
}

// Extract only the numeric part of the price
const numericPrices = prices.map(price => price.replace(/[^0-9]/g, ''));


// Iterate over the arrays and log the values
for (let i = 0; i < productNames.length; i++) {
  // Extract the numeric part of the first element in the productName string
  const productNumeric = productNames[i].match(/\d+(?:\.\d+)?/);

  // Multiply by 10000 and 1.1, and add 10000 to get the final price
  const productPrice = Math.round((productNumeric * 10000 * 1.1) + 10000);

  const margin = (numericPrices[i] - productPrice);

  // Log the product name and its corresponding price
  console.log(`${productPrice} \t ${numericPrices[i]} \t ${margin}`);
}