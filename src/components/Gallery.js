import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, ImageList, ImageListItem, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));



function Gallery() {

const navigate = useNavigate()
const [hoveredIndex, setHoveredIndex] = useState(null);
const [itemData, setItemData] = useState([]);

useEffect(() => {
  const data = images.map((img, index) => ({
    id: index,
    img: img,
    title: img.split("/").pop().split(".")[0],
    cols: Math.floor(Math.random() * 1) + 1,
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
if (sm) cols = 2;
if (md) cols = 4;
if (lg) cols = 6;

let rowHeight = 200;
// if (sm) rowHeight = 200;
// if (md) rowHeight = 200;
// if (lg) rowHeight = 250;
  
  return (
   <div className='black-page'>

  <Header/>

  <Box display="flex" justifyContent="center">
  <Typography
   variant='h4'
  //  fontWeight="bold"
   align='center'
   mt={8}
   mb={11}
   ml={5}
   >
  {"Artwork Gallery"}
  </Typography>

  <Typography
   variant='captions'
  //  fontWeight="bold"
   align='center'
   mt={8}
   mb={11}
   ml={1}
   >
  {"(All)"}
  </Typography>

</Box>
 

  <Box display="flex" justifyContent="center">
  <ImageList
      sx={{ width: "90vw", height: "100wh", overflow: 'visible',  }}
      variant="masonry"
      cols={cols}
      rowHeight={rowHeight}
      gap={20}
      
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
      onClick={() => navigate(`/preview/${item.title}`, {state: {itemData}}  )}

      sx={{
        borderRadius: 5,
        overflow: "hidden",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease",
        transform: isHovered ? "scale(1.08)" : isDimmed ? "scale(1)" : "scale(1)",
        opacity: isDimmed ? 0.9 : 1,
        boxShadow: isHovered ? "0 0 30px rgba(255, 255, 255, 0.93)" : "none",
        zIndex: isHovered ? 10 : 0,
        cursor:"pointer"
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

    <Footer/>
   </div>

  );
}

export default Gallery;
