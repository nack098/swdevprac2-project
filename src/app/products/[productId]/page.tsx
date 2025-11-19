"use client"
import { use } from "react"
import { Box, Image, HStack, Heading, Text, Button } from "@chakra-ui/react";

interface Props {
  productId: string
}

const test: ProductDetail = {
  _id: "abc",
  sku: "abc",
  name: "Abc",
  description: "blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla",
  arrivalDate: "09/12/2003",
  availableQuota: 0,
  posterPicture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsuperdeep.org%2Fwp-content%2Fuploads%2F2021%2F03%2FKaws-Gone-Companion-Vinyl-Figure-Art-Toy-2.jpg&f=1&nofb=1&ipt=1a08d2aff1c2977443752862d546e21e0879cc0ec8f67af97f164ea377cd4ee9",
  createdAt: "2025-11-19T10:54:29.654Z",
  updatedAt: "2025-11-19T10:54:29.654Z"
}

export default function ProductPage({ params }: { params: Promise<Props> }) {
  const { productId } = use(params);
  const product = test
  return (
    <Box paddingX="2rem" marginX="10rem" paddingY="3rem" marginY="2rem" rounded="md"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
    >
      <HStack justifyContent="center" gap="12rem" align="start" textAlign="left">
        <Image src={product.posterPicture} height="50rem" width="50rem" objectFit="cover" rounded="md" />
        <Box width="35rem" rounded="md">
          <Text>
            {product.sku}
          </Text>
          <Heading as="h1" fontSize="5xl" fontWeight="bold" lineHeight="3rem">
            {product.name}
          </Heading>
          <Text as="h2" fontSize="2xl" marginBottom="0.5rem">
            {product.arrivalDate}
          </Text>
          <hr />
          <Text height="39rem" width="30rem" marginTop="1rem">
            {product.description}
          </Text>
          <Button width="15rem">Order</Button>
        </Box>
      </HStack>
    </Box>
  )
}
