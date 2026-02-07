import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{

        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: '0.875rem',
        }}
      >
        © {new Date().getFullYear()} merangzax
      </Typography>
    </Box>
  );
}
