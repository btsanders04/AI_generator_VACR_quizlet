'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Typography, Box, Grid } from '@mui/material';

interface ImageData {
  url: string;
  answer: string;
}

export default function ImageRandomizer() {
  const [randomizedImages, setRandomizedImages] = useState<ImageData[]>([]);

  const fetchRandomImages = async () => {
    try {
      const response = await fetch('/api/images');
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const images = await response.json();
      setRandomizedImages(images);
    } catch (error) {
      console.error('Error fetching random images:', error);
    }
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Randomized Aircraft Images
      </Typography>
      <Button variant="contained" onClick={fetchRandomImages} sx={{ marginBottom: 2 }}>
        Randomize Again
      </Button>
      <Grid container spacing={2}>
        {randomizedImages.map((image, index) => (
          <Grid item key={image.url} xs={12} sm={6} md={4}>
            <Image 
              src={image.url} 
              alt={`Random aircraft ${index + 1}`} 
              width={200} 
              height={300} 
              style={{ width: '100%', height: 'auto' }}
            />
            <Typography variant="subtitle1">{image.answer}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
