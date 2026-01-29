import './App.css';
import { Box, Typography, ImageList, ImageListItem, useTheme, useMediaQuery } from '@mui/material';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));


function App() {



const shuffleArray = (array) => {
  const arr = [...array]; // copy the array so you don't mutate the original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

let itemData = images.map((img, index) => ({
  img,
  title: `Image ${index + 1}`,
  cols: Math.floor(Math.random() * 2) + 1, // random 1, 2, or 3
  rows: Math.floor(Math.random() * 2) + 1, // random 1 or 2
}));

itemData = shuffleArray(itemData);

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
      sx={{ width: "90vw", height: "100wh" }}
      variant="quilted"
      cols={cols}
      rowHeight={rowHeight}
      gap={10}
    >
      {itemData.map((item) => (
        <ImageListItem 
        key={item.img} 
        cols={item.cols || 1} 
        rows={item.rows || 1}
        sx={{ overflow:"hidden", borderRadius:3}}
        >
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Box>
  

   </div>


  );
}

export default App;
