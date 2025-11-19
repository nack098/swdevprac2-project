"use client";
import ProductCard from "@/components/ProductCard";
import { useAppSelector } from "@/redux/store";
import { Heading, SimpleGrid, Box, Link, Text, Image } from "@chakra-ui/react";


export default function ProductPage() {
  const products = useAppSelector((store) => store.productSlice.products);
  return (
    <Box paddingX={{ base: "2rem", md: "10rem" }} paddingY="5rem">
      <Heading as="h1" fontWeight="bold" fontSize="3xl" marginBottom="2rem">
        All Products
      </Heading>
      <SimpleGrid
        minChildWidth={{ md: "20rem" }}
        gap={{ base: "2rem", md: "5rem" }}
      >
        {products.map((product: any) => (
          <Link href={`/products/${product._id}`}>
            <ProductCard data={product}></ProductCard>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
