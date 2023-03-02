function runContentScript() {
  // Find all the <td> elements with the "data-original-value" attribute
  const productNameCells = document.querySelectorAll('td[data-original-value]');

  // Extract the data from each <td> element and store it in an array
  const productNames = Array.from(productNameCells).map((td, index) => {

    // 제목 추출
    const productName = td.getAttribute('data-original-value');
    const productNumeric = productName.match(/^\d+(?:\.\d+)?/)[0];

    // 최저 판매 목표가 계산
    const productPrice = Math.round((productNumeric * 10000 * 1.1) + 10000);

    // 판매가 추출
    const priceCells = document.querySelectorAll('td.right-align');
    const prices = [];

    for (let i = 0; i < priceCells.length; i += 2) {  
      const priceElement = priceCells[i].querySelector('span');
      if (priceElement) {
        prices.push(priceElement.textContent);
      }
    }

    // 마진 계산하고 수정된 string 생성  
    const numericPrice = prices[index].replace(/[^0-9]/g, '');
    const margin = (numericPrice - productPrice) + 10000;
    const formattedMargin = (margin / 10000).toFixed(2);
    const productNameWithoutNumeric = productName.replace(productNumeric+"만원", '').trim();
    const newProductName = `${productNumeric}만원/${formattedMargin} - ${productNameWithoutNumeric}`;

    // Set the background color of the row to red if formattedMargin is negative
    if (formattedMargin < 0) {
      td.closest('tr').style.backgroundColor = '#faaaaa';
    }

    // Output modified product name to console
    console.log(newProductName);

    return newProductName;
  });

  // Update the product name cells in the table
  const productNameCellsToUpdate = document.querySelectorAll('td[data-original-value]');
  productNameCellsToUpdate.forEach((cell, index) => {
    const productNameDiv = cell.querySelector('div.text-wrapper');
    productNameDiv.querySelector('span').textContent = productNames[index];
  });
}

// Create a new MutationObserver object
const observer = new MutationObserver((mutations) => {
  // Check if the DOM has finished loading
  if (document.readyState === 'complete') {
    // Run your content script code here
    runContentScript();
    observer.disconnect(); // Stop observing the DOM
  }
});

// Start observing the DOM for changes
observer.observe(document, { childList: true, subtree: true });