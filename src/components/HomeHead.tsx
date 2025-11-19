"use client"
import {
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";

import { FaAngleRight } from "react-icons/fa"
import NextLink from "next/link"

export default function HomeHead() {
  return (
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
  )
}
