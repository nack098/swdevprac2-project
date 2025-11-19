"use client"
import { Box, Heading, HStack, Link, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link"

export default function AdminPage() {
  return (
    <Box w="full" marginTop="3rem" paddingX="15rem" h="full">
      <Box h="25rem">
        <HStack justifyContent="space-between">
          <Heading as="h1">Latest Product</Heading>
          <Link as={NextLink} href="/admin/products">All Products</Link>
        </HStack>
        <SimpleGrid minChildWidth="20rem" gap="3rem" paddingX="5rem" marginY="2rem">
          {/* Show 5 newest products (also change this shit to for loop or I will kill you */}
          {/* <ProductCard /> */}
        </SimpleGrid>
      </Box>
      <Box h="10rem">
        <HStack justifyContent="space-between">
          <Heading as="h1">Latest Orders</Heading>
          <Link as={NextLink} href="/admin/orders">All Orders</Link>
        </HStack>
        <SimpleGrid minChildWidth="20rem" gap="3rem" paddingX="5rem" marginY="2rem">
          {/* Show 5 newest orders (also change this shit to for loop or I will kill you */}
          {/* <ProductCard /> */}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
