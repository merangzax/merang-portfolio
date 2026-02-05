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
    <div>
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
          right: 50,
          zIndex: 999,
          mt: 4, 
          color:"white", 
          cursor:"pointer"
         }}
        onClick={() => navigate(-1)}
      >
        <Typography
   variant='h5'
   align='center'
   mb={2}
   >
  {"X"}
  </Typography>
      </Button>


    {/* Thumbnail strip */}
<Box
  sx={{
    position: "fixed", 
    bottom: 0,           
    display: "flex",
    overflowX: "auto",
    mt: 4,
    width: "90vw",
    gap: 1,
    py: 1,
    px: 0.5,
    backgroundColor: "#111", 
    borderRadius: 1,
  }}
>
  {itemData.map((item, index) => (
    <Box
      key={item.id}
      onClick={() => setCurrentIndex(index)}
      sx={{
        flex: "0 0 auto",
        width: 60,
        height: 60,
        borderRadius: 1.5,
        border: currentIndex === index ? "2px solid white" : "2px solid transparent",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border 0.2s",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  ))}
</Box>


    </Box>
    </div>
  );
}

export default Preview;
