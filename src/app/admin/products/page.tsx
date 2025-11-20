"use client";
import ProductCard from "@/components/ProductCard";
import { useAppSelector } from "@/redux/store";
import NextLink from "next/link";
import {
  Heading,
  SimpleGrid,
  Box,
  Link,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";

export default function ProductPage() {
  const products = useAppSelector((store) => store.productSlice.products);
  return (
    <Box paddingX={{ base: "2rem", md: "10rem" }} paddingY="5rem">
      <Stack direction="row" justifyContent="space-between" marginBottom="2rem">
        <Heading as="h1" fontWeight="bold" fontSize="3xl">
          All Products
        </Heading>
        <Link as={NextLink} href="/admin/products/create" fontSize="xl">
          Create New Product
        </Link>
      </Stack>
      <SimpleGrid
        minChildWidth={{ md: "20rem" }}
        gap={{ base: "2rem", md: "5rem" }}
      >
        {products.map((product: any) => (
          <ProductCard data={product} link={`/admin/products/${product._id}`} key={product._id}></ProductCard>
        ))}
      </SimpleGrid>
    </Box>
  );
}
