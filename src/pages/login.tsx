import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import ChurchIcon from "@mui/icons-material/Church";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "white",
        }}
      >
        <ChurchIcon sx={{ fontSize: 64, color: "#555" }} />
        <Typography variant="h5" fontWeight="bold" color="#333">
          Sistem Informasi Jemaat Kemah Airnona
        </Typography>

        <Button
          sx={{
            width: "240px",
            py: 1.5,
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: 2,
            backgroundColor: "#1976d2",
            color: "white",
            transition: "0.3s",
            '&:hover': {
              backgroundColor: "#1565c0",
            },
          }}
          size="large"
          variant="contained"
          onClick={() => loginWithRedirect()}
        >
          Masuk
        </Button>
      </Box>
    </Container>
  );
};
