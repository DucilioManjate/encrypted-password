import React from "react";
import {
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";

export default function HeaderComponents() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="orange.600"
      color="white"
      borderRadius={10}
      h={10}
      transitionProperty="all"
      mt={10}
      w="60%"
      margin="auto"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
        <Text fontSize={'md'} mt={-2}>Password</Text>
        </Heading>
      </Flex>
    </Flex>
  );
};
