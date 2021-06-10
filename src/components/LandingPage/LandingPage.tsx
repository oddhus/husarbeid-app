import { Container, Heading, Text } from "@chakra-ui/layout";
import { Box, Center } from "@chakra-ui/react";
import React from "react";

export const LandingPage = () => {
  return (
    <Container maxW="lg">
      <Box pt={10}>
        <Center>
          <Heading size="lg">Få oversikten over husarbeid og oppgaver</Heading>
        </Center>
      </Box>
      <Box pt={5}>
        <Text>Opprett en konto og sett igang!</Text>
      </Box>
    </Container>
  );
};
