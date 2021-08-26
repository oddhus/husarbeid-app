import { Container, Box, Typography } from "@material-ui/core";
import React from "react";

export const LandingPage = () => {
  return (
    <Container sx={{ pt: 2 }}>
      <Typography variant="h6">
        Få oversikten over husarbeid og oppgaver
      </Typography>
      <Typography>Opprett en konto og sett igang!</Typography>
    </Container>
  );
};
