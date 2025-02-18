// Sample presidential quotes
const quotes = [
    "Sample quote 1",
    "Sample quote 2",
    "Sample quote 3"
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.querySelector("#presidential-quote p").textContent = quotes[randomIndex];
}

// quiz functionality - implement soon