# AI News Hub

A modern, responsive news aggregator for artificial intelligence news.

## Features

- Latest AI news from multiple categories
- Modern, responsive design
- Real-time news updates
- Category filtering
- Beautiful card layout with images

## Live Demo

[View Live Demo](your-netlify-url-here)

## Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd landing_page
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your News API key:
```
REACT_APP_NEWS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

## Deployment

This site is deployed on Netlify. To deploy your own version:

1. Fork this repository
2. Sign up for a free account on [Netlify](https://www.netlify.com/)
3. Connect your GitHub repository to Netlify
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add your News API key as an environment variable:
   - Key: `REACT_APP_NEWS_API_KEY`
   - Value: Your API key from [NewsAPI.org](https://newsapi.org/)

## Environment Variables

- `REACT_APP_NEWS_API_KEY`: Your News API key (required)

## Technologies Used

- React
- Material-UI
- News API
- Netlify for hosting

## License

MIT
