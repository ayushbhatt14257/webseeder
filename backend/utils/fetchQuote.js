const axios = require('axios');

const fetchMotivationalQuote = async () => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quoteData = response.data[0];
    return {
      quote: quoteData.q,
      author: quoteData.a,
    };
  } catch (error) {
    console.error('Error fetching motivational quote:', error.message);
    return {
      quote: 'Keep going, you are doing great!',
      author: 'Anonymous',
    }; // Fallback quote
  }
};

module.exports = fetchMotivationalQuote;
