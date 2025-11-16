// Service Workerの登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

window.onload = () => {
    const countInput = document.getElementById("count");
    const priceInput = document.getElementById("price");
    const resultSpan = document.getElementById("result");

    const calculateCostPerBook = () => {
        const count = parseFloat(countInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;

        if (count > 0) {
            const costPerBook = price / count;
            resultSpan.textContent = costPerBook.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            resultSpan.textContent = "0";
        }
    };

    countInput.addEventListener("input", calculateCostPerBook);
    priceInput.addEventListener("input", calculateCostPerBook);

    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => { location.reload(); });
}