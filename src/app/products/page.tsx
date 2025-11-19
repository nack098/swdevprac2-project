"use client";
import ProductCard from "@/components/ProductCard";
import { get } from "@/libs/apis/arttoys";
import { Heading, SimpleGrid, Box, Link, Text, Image } from "@chakra-ui/react";

const items = ["/carousel1.webp", "/carousel2.webp", "/carousel3.webp"];

export default async function ProductPage() {
  const res = await get();
  const products = res.data;
  return (
    <Box paddingX={{ base: "2rem", md: "10rem" }} paddingY="5rem">
      <Heading as="h1" fontWeight="bold" fontSize="3xl" marginBottom="2rem">
        All Products
      </Heading>
      <SimpleGrid
        minChildWidth={{ md: "20rem" }}
        gap={{ base: "2rem", md: "5rem" }}
      >
        {products.data.map((product: any) => (
          <Link href={`/products/${product._id}`}>
            <ProductCard data={product}></ProductCard>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
