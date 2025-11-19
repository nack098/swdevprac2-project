import {
  Box,
  Carousel,
  For,
  Heading,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { get } from "@/libs/apis/arttoys";
import ProductCard from "@/components/ProductCard";

async function getSortedProducts() {
  const res = await get();
  const products = res.data;
  if (!res.data) return []
  const sortedProducts = products.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sortedProducts;
}

export default async function Home() {
  const sortedFive = await getSortedProducts().then((data) => data.slice(0, 5));
  return (
    <>
      <Heading
        as="h1"
        justifyContent="center"
        display="flex"
        width="full"
        fontWeight="bold"
        fontSize="2xl"
        textAlign="center"
        marginTop="2rem"
      >
        Welcome to Drunkman Art Toys Shop!!
      </Heading>
      <Heading
        as="h4"
        justifyContent="center"
        display="flex"
        width="full"
        fontWeight="normal"
        fontSize="md"
        textAlign="center"
        marginBottom="3rem"
      >
        We are so drunk that's why we open an art toys shop
      </Heading>
      <Box paddingX="7rem">
        <hr />
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingX="3rem"
        marginTop="2rem"
      >
        <Heading as="h1" fontWeight="bold">
          Our New Products
        </Heading>
        <Link
          as={NextLink}
          href="/products"
          textDecorationColor="bg"
          transitionTimingFunction="ease-out"
          transition="colors"
          transitionDuration="300ms"
          _hover={{ textDecorationColor: "inherit" }}
        >
          All Products
          <FaAngleRight />
        </Link>
      </Stack>
      <SimpleGrid
        minChildWidth="20rem"
        gap="3rem"
        paddingX="5rem"
        marginY="2rem"
      >
        {/* Show 5 newest products (also change this shit to for loop or I will kill you */}
        {sortedFive.map((product: any) => (
          <ProductCard data={product} />
        ))}
      </SimpleGrid>
    </>
  );
}
