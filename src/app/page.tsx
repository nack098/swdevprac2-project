"use client"
import {
  Box,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import HomeCarousel from "@/components/Carousel";
import HomeHead from "@/components/HomeHead";
import { useAppSelector } from "@/redux/store";

function getSortedProducts(products: any) {
  const sortedProducts = [...products].sort(
    (a: any, b: any) =>
      new Date(b.arrivalDate
      ).getTime() - new Date(a.arrvialDate).getTime()
  );
  return sortedProducts
}

export default function Home() {
  const data = useAppSelector((state) => state.productSlice.products);
  const sortedFive = getSortedProducts(data).slice(0, 5);
  return (
    <>
      <HomeCarousel />
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
      <HomeHead />
      <SimpleGrid
        minChildWidth="20rem"
        gap="3rem"
        paddingX="5rem"
        marginY="2rem"
      >
        {/* Show 5 newest products (also change this shit to for loop or I will kill you */}
        {sortedFive.map((product: any) => (
          <ProductCard data={product} link={`/products/${product._id}`} />
        ))}
      </SimpleGrid>
    </>
  );
}
