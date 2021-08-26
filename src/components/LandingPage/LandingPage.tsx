import { Container, Box, Typography } from "@material-ui/core";
import React from "react";

export const LandingPage = () => {
  return (
    <Container>
      <Box sx={{ pt: 10 }}>
        <Typography variant="h1">
          Få oversikten over husarbeid og oppgaver
        </Typography>
      </Box>
      <Box sx={{ pt: 5 }}>
        <Typography>Opprett en konto og sett igang!</Typography>
      </Box>
    </Container>
  );
};
