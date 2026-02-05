import {useState, useEffect} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";


function Preview() {

  const {title} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(null);

  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context("../img", false, /\.(png|jpe?g|svg)$/));
  const itemDataNew = images.map((img, index) => ({
  id: index,
  img,
  title: img.split("/").pop().split(".")[0],
}));

  const itemData = location.state?.itemData || itemDataNew // get itemData from state

  useEffect(() => {
    const idx = itemData.findIndex(item => item.title === title);
    setCurrentIndex(idx !== -1 ? idx : null)
  }, [title]);


  if (currentIndex === null) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "grey",
      }}
    >
      <Typography variant="h5">[404 Image Not Found]</Typography>
    </Box>
  );
}

  const imageItem = itemData[currentIndex];

 const goPrev = () => {
  const nextIndex = currentIndex === 0 ? itemData.length - 1 : currentIndex - 1;
  setCurrentIndex(nextIndex);
  navigate(`/preview/${itemData[nextIndex].title}`, { replace: true, state: { itemData }, });
};

const goNext = () => {
  const nextIndex = currentIndex === itemData.length - 1 ? 0 : currentIndex + 1;
  setCurrentIndex(nextIndex);
  navigate(`/preview/${itemData[nextIndex].title}`, { replace: true, state: { itemData }, });
};


  return (
    <Box
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: 2,
        position:"relative"
      }}
    >
      {/* Small text at top */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        {imageItem.title}
      </Typography>



      {/* Big image */}
      <Box
        component="img"
        src={imageItem.img}
        alt={imageItem.title}
        sx={{
          maxWidth: "90vw",
          maxHeight: "80vh",
          objectFit: "contain",
          borderRadius: 2,
          
        }}
      />

      {/* Left button */}
      <Button
       onClick={goPrev}
        align='center'
        mb={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: 50,
          transform: "translateY(-50%)",
          color: "white",
          cursor:"pointer"
        }}
      >
      <Typography 
      variant='h4'
      >
        {"<"}
        </Typography>  
        </Button>


      {/* Right button */}
     <Button
       onClick={goNext}
        align='center'
        mb={2}
        sx={{
          position: "absolute",
          top: "50%",
          right: 50,
          transform: "translateY(-50%)",
          color: "white",
          cursor:"pointer"
        }}
      >
      <Typography 
      variant='h4'
      >
        {">"}
        </Typography>  
        </Button>


      {/* Back button */}
      <Button
        sx={{ 
          position: "fixed",     
          top: 16,              
          left: 35,
          zIndex: 999,
          mt: 4, 
          color:"white", 
          cursor:"pointer"
         }}
        onClick={() => navigate(-1)}
      >
        <Typography
   variant='h6'
   align='center'
   mb={2}
   >
  {"< Back"}
  </Typography>
      </Button>
    </Box>
  );
}

export default Preview;
