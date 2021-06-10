import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { removeToken } from "../../utils/tokenUtils";
import { userState } from "../Authentication/authAtom";
import { isLoggedInState } from "../Authentication/authSelector";

export const NavBarButtonGroup = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setUser = useSetRecoilState(userState);

  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={"flex-end"}
      direction={"row"}
      spacing={6}
    >
      {!isLoggedIn ? (
        <>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"auth"}
          >
            Sign In
          </Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </>
      ) : (
        <Button
          fontSize={"sm"}
          fontWeight={400}
          variant="link"
          onClick={() => {
            removeToken();
            setUser(undefined);
          }}
        >
          Sign Out
        </Button>
      )}
    </Stack>
  );
};
