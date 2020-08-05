// Define Variables for the Id elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get Quote from API
async function getQuote() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://favqs.com/api/qotd';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    const {
      quote: {
        body,
        author
      }
    } = data;
    // If author is blank add unknown
    authorText.innerText = author === '' ? 'Unknown' : author;
    // Reduce font-size for long quote
    if (body.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = body;
  } catch (error) {
    getQuote();
    console.log('whoops, no quote', error);
  }
}

// Send quote to Twitter
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  // open in a new tab
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();