import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Typography variant="h4" component="div" gutterBottom>
          Sign In
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginWithRedirect()}
          style={{ width: "240px" }}
        >
          Sign in
        </Button>
        <Typography variant="body2" color="textSecondary">
          Powered by Auth0
        </Typography>
      </Box>
    </Container>
  );
};
