"use client"
import { Heading, SimpleGrid, Box, Link, Text, Image } from "@chakra-ui/react";
import NextLink from "next/link"

const items = [
  "/carousel1.webp",
  "/carousel2.webp",
  "/carousel3.webp",
]

function ProductCard() {
  /*TODO: Finish this thing */
  return (
    <Link as={NextLink}
      href="/"
      transition="colors"
      transitionDuration="300ms"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
      padding="1rem"
      rounded="sm"
      display="block"
      _hover={{ bg: { _light: "blackAlpha.200", _dark: "whiteAlpha.300" } }}
      textDecoration="none"
    >
      <Image src="/carousel2.webp" objectFit="cover" height="25rem" rounded="sm" />
      <Box padding="0.5rem" marginTop="0.5rem">
        <Heading fontWeight="medium">Name</Heading>
        <Text fontSize="sm">DD/MM/YYYY</Text>
        <Text display="flex" marginTop="2rem" fontSize="lg" textAlign="right" justifyContent="end">###.##฿</Text>
      </Box>
    </Link>
  )
}

export default function ProductPage() {
  return (
    <Box paddingX={{ base: "2rem", md: "10rem" }} paddingY="5rem">
      <Heading as="h1" fontWeight="bold" fontSize="3xl" marginBottom="2rem">
        All Products
      </Heading>
      <SimpleGrid minChildWidth={{ md: "20rem" }} gap={{ base: "2rem", md: "5rem" }}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </SimpleGrid>
    </Box>
  )
}
