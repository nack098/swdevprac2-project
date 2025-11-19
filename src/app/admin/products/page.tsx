"use client"
import { Heading, SimpleGrid, Box, Link, Text, Image } from "@chakra-ui/react";
import NextLink from "next/link"

const items = [
  "/carousel1.webp",
  "/carousel2.webp",
  "/carousel3.webp",
]

export default function ProductPage() {
  return (
    <Box paddingX={{ base: "2rem", md: "10rem" }} paddingY="5rem">
      <Heading as="h1" fontWeight="bold" fontSize="3xl" marginBottom="2rem">
        All Products
      </Heading>
      <SimpleGrid minChildWidth={{ md: "20rem" }} gap={{ base: "2rem", md: "5rem" }}>
        {/*<ProductCard />*/}
      </SimpleGrid>
    </Box>
  )
}
