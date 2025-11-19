"use client";
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
import { useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import NextLink from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { get } from "@/libs/apis/arttoys";
import ProductCard from "@/components/ProductCard";

const items = ["/carousel1.webp", "/carousel2.webp", "/carousel3.webp"];

async function getSortedProducts() {
  const res = await get();
  const products = res.data;
  const sortedProducts = products.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sortedProducts;
}

export default async function Home() {
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const sortedFive = await getSortedProducts().then((data) => data.slice(0, 5));
  return (
    <>
      <Carousel.Root
        slideCount={items.length}
        allowMouseDrag
        slidesPerMove={1}
        autoplay={{ delay: 4000 }}
        loop
        onDragStatusChange={(details) =>
          !details.isDragging ? playButtonRef.current?.click() : null
        }
      >
        <Carousel.ItemGroup>
          {items.map((link, index) => (
            <Carousel.Item key={index} index={index}>
              <Image src={link} height="35rem" width="full" objectFit="cover" />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control justifyContent="center" gap="4">
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.Indicators />

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>

          <Carousel.AutoplayTrigger asChild>
            <IconButton
              aria-label="Toggle autoplay"
              size="sm"
              display="none"
              ref={playButtonRef}
            />
          </Carousel.AutoplayTrigger>
        </Carousel.Control>
      </Carousel.Root>
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
