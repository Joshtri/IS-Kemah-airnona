import { Link } from "react-router";
import Box from "@mui/material/Box";

import { Typography } from "@mui/material";

import { ChurchRounded } from "@mui/icons-material";

type TitleProps = {
    collapsed: boolean;
}


import React from 'react'

export const Title : React.FC<TitleProps> = ({collapsed}) => {
  return (
    <Link to="/" style={{textDecoration: "none"}}>
      <Box
        display="flex"
        alignItems="center"
        gap={"12px"}
        sx={{
          color: "text.primary",
          "&:hover": {
            opacity: 0.8, // Efek hover untuk interaktivitas
          },
        }}
      >
        {collapsed ? (
          <ChurchRounded fontSize="large" sx={{ color: "primary.main" }} />
        ) : (
          <>
            <ChurchRounded fontSize="large" sx={{ color: "primary.main" }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Poppins", sans-serif', // Gunakan font Poppins
                fontWeight: 600, // Tebal sedang
                fontSize: "1rem", // Ukuran font yang tidak terlalu besar
                color: "primary.main", // Warna teks sesuai tema
              }}
            >
              Kemah Airnona
            </Typography>
          </>
        )}
      </Box>
    </Link>
  )
}
