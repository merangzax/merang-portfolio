import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Box, Typography,} from '@mui/material';


function Header() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "sticky",
        top:0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        zIndex: 999,
        backgroundColor: "#000000"
        // borderBottom: '1px solid #e0e0e0',
      }}
    >
      {/* Left: Name */}
      <Typography
      onClick={() => navigate("/")}
        sx={{
          fontWeight: 700,
          fontSize: '1.25rem',
          cursor:"pointer"
        }}
      >
        merangzack <span style={{ color: '#ff6b6b' }}>™</span>
      </Typography>

      {/* Right: Directory */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
        }}
      >
        <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</Typography>
        <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate("/projects")}>Projects</Typography>
        <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate("/gallery")}>Gallery</Typography>
      </Box>
    </Box>
  );
}

export default Header;
