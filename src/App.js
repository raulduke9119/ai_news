import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActionArea,
  CardMedia,
  CircularProgress,
  Alert,
  Chip,
  Tabs,
  Tab,
  Fade,
  Skeleton
} from '@mui/material';
import { 
  AutoStories as NewsIcon,
  AccessTime as TimeIcon,
  Source as SourceIcon,
  SmartToy as RoboticsIcon,
  Psychology as LLMIcon,
  Code as DevelopmentIcon,
  Science as ResearchIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import axios from 'axios';
import NoImage from './assets/no-image.svg';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || '78ec130bdfe24dc8a5f048b288345888';
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';

const categories = [
  { id: 'all', label: 'All AI News', icon: <NewsIcon />, query: 'artificial intelligence' },
  { id: 'llm', label: 'LLMs & ChatGPT', icon: <LLMIcon />, query: 'large language models OR chatgpt' },
  { id: 'robotics', label: 'Robotics & Automation', icon: <RoboticsIcon />, query: 'AI robotics OR automation' },
  { id: 'development', label: 'AI Development', icon: <DevelopmentIcon />, query: 'AI development tools OR coding' },
  { id: 'research', label: 'AI Research', icon: <ResearchIcon />, query: 'artificial intelligence research breakthroughs' },
  { id: 'business', label: 'AI Business', icon: <BusinessIcon />, query: 'AI business applications OR industry' }
];

function App() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(NEWS_API_ENDPOINT, {
        params: {
          q: query,
          sortBy: 'publishedAt',
          apiKey: NEWS_API_KEY,
          pageSize: 6
        }
      });

      setHeadlines(response.data.articles);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news headlines. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(categories[activeTab].query);
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2c2c2c 100%)',
      py: 8,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 50%, transparent 100%)',
        pointerEvents: 'none'
      }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 6 
        }}>
          <NewsIcon sx={{ 
            fontSize: 40, 
            color: '#1976d2',
            mr: 2 
          }} />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white',
              textAlign: 'center',
              fontWeight: 900,
              background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(25, 118, 210, 0.3)',
              letterSpacing: '-1px'
            }}
          >
            AI News Hub
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#1976d2',
                },
              },
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 2,
              padding: 1,
            }}
          >
            {categories.map((category, index) => (
              <Tab 
                key={category.id}
                icon={category.icon} 
                label={category.label}
                sx={{
                  minHeight: 72,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#1976d2',
                    opacity: 0.8
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: 3 
          }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <Skeleton 
                  variant="rectangular" 
                  height={200} 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'none'
                  }} 
                />
                <CardContent>
                  <Skeleton 
                    variant="text" 
                    height={32} 
                    width="80%" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'none'
                    }} 
                  />
                  <Skeleton 
                    variant="text" 
                    height={20} 
                    width="100%" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'none',
                      mt: 1
                    }} 
                  />
                  <Skeleton 
                    variant="text" 
                    height={20} 
                    width="90%" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'none'
                    }} 
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: '#ff5252',
              border: '1px solid rgba(211, 47, 47, 0.2)',
              '& .MuiAlert-icon': {
                color: '#ff5252'
              }
            }}
          >
            {error}
          </Alert>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: 3 
          }}>
            {headlines.map((article, index) => (
              <Fade in={true} timeout={300 + index * 100}>
                <Card 
                  key={index}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      '& .news-title': {
                        color: '#1976d2'
                      },
                      '& .news-image': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  <CardActionArea 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ height: '100%' }}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                      <CardMedia
                        component="img"
                        image={article.urlToImage || NoImage}
                        alt={article.title}
                        className="news-image"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.src = NoImage;
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          height: '50%',
                          pointerEvents: 'none'
                        }}
                      />
                    </Box>
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom
                        className="news-title"
                        sx={{ 
                          color: '#fff',
                          transition: 'color 0.3s ease',
                          fontWeight: 600,
                          lineHeight: 1.4,
                          mb: 2
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          mb: 2,
                          flexGrow: 1
                        }}
                      >
                        {article.description}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        flexWrap: 'wrap',
                        mt: 'auto'
                      }}>
                        <Chip
                          icon={<TimeIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
                          label={new Date(article.publishedAt).toLocaleDateString()}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                          size="small"
                        />
                        <Chip
                          icon={<SourceIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />}
                          label={article.source.name}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Fade>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
