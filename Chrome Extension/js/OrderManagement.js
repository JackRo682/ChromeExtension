// Wait for the page to finish loading
window.addEventListener("load", function() {

    // Find the button element
    const button = document.querySelector("article[data-v-eae4563e] strong[data-v-eae4563e] span[data-v-8b1803ce]:first-child");

    // Click the button
    button.click();

    // Wait for the table to appear
    const table = document.querySelector("table[data-v-xyz]");
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.addedNodes[0].nodeName === 'TBODY') {
                observer.disconnect();
                const tbody = mutation.addedNodes[0];
                const rows = tbody.querySelectorAll('tr');
                rows.forEach((row) => {
                    const columns = row.querySelectorAll('td');
                    const data = Array.from(columns).map((column) => column.innerText.trim());
                    console.log(data);
                });
            }
        }
    });
    observer.observe(table, { childList: true });

});