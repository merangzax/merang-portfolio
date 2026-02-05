import { useState, useEffect } from 'react';
import './App.css';
import { Box, Typography, ImageList, ImageListItem, useTheme, useMediaQuery } from '@mui/material';
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));



function App() {

const [hoveredIndex, setHoveredIndex] = useState(null);
const [itemData, setItemData] = useState([]);

useEffect(() => {
  const data = images.map((img, index) => ({
    id: index,
    img,
    title: `Image ${index + 1}`,
    cols: Math.floor(Math.random() * 2) + 1,
    rows: Math.floor(Math.random() * 2) + 1,
  }));

  // shuffle once
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  setItemData(data);
}, []); // ← runs ONCE


const theme = useTheme();
const sm = useMediaQuery(theme.breakpoints.up('sm'));   // ≥600px
const md = useMediaQuery(theme.breakpoints.up('md'));   // ≥900px
const lg = useMediaQuery(theme.breakpoints.up('lg'));   // ≥1200px

let cols = 2;
if (sm) cols = 4;
if (md) cols = 6;
if (lg) cols = 8;

let rowHeight = 200;
if (sm) rowHeight = 200;
if (md) rowHeight = 200;
if (lg) rowHeight = 250;
  
  return (
   <div className='black-page'>

   <Typography
   variant='h1'
   fontWeight="bold"
   align='center'
   mb={2}
   >
  [ARTWORK GALLERY]
  </Typography>

  <Box display="flex" justifyContent="center">
  <ImageList
      sx={{ width: "90vw", height: "100wh", overflow: 'visible',  }}
      variant="quilted"
      cols={cols}
      rowHeight={rowHeight}
      
    >
      {itemData.map((item, index) => {
      
      const isHovered = hoveredIndex === index;
      const isDimmed = hoveredIndex !== null && !isHovered;

      return (
     
        <ImageListItem 
        key={item.img} 
        cols={item.cols || 1} 
        rows={item.rows || 1}

      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}

      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease",
        transform: isHovered ? "scale(1.02)" : isDimmed ? "scale(0.93)" : "scale(0.96)",
        opacity: isDimmed ? 0.7 : 1,
        boxShadow: isHovered ? "0 0 30px rgba(255, 255, 255, 0.93)" : "none",
        zIndex: isHovered ? 10 : 1,
      }}
      >

      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >

          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.35s ease",
          }}
          />
          </Box>
        </ImageListItem>

      )
})}
    </ImageList>
    </Box>
   </div>

  );
}

export default App;
