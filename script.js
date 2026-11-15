const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy-quote");
const status = document.getElementById("status");

let currentIndex = -1;
let statusTimer = null;

// Pick a random quote that is different from the current one
function getRandomIndex() {
  if (quotes.length === 1) return 0;
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === currentIndex);
  return index;
}

function showQuote() {
  currentIndex = getRandomIndex();
  const { text, author } = quotes[currentIndex];
  quoteText.textContent = "\u201C" + text + "\u201D";
  quoteAuthor.textContent = "\u2014 " + author;
  showStatus("");
}

function showStatus(message) {
  status.textContent = message;
  clearTimeout(statusTimer);
  if (message) {
    statusTimer = setTimeout(() => { status.textContent = ""; }, 2000);
  }
}

// Copy the current quote to the clipboard
async function copyQuote() {
  const { text, author } = quotes[currentIndex];
  const content = "\u201C" + text + "\u201D \u2014 " + author;
  try {
    await navigator.clipboard.writeText(content);
    showStatus("Copied to clipboard!");
  } catch (e) {
    showStatus("Could not copy. Please copy it manually.");
  }
}

newBtn.addEventListener("click", showQuote);
copyBtn.addEventListener("click", copyQuote);

showQuote();
