import { Link, Image, Box, Heading, Text } from "@chakra-ui/react"
import NextLink from "next/link"
interface Props {
  data: ProductDetail
}

export default function ProductCard({ data }: Props) {
  return (
    <Link as={NextLink}
      href="/"
      transition="colors"
      transitionDuration="300ms"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
      padding="1rem"
      rounded="sm"
      display="block"
      _hover={{ bg: { _light: "blackAlpha.200", _dark: "whiteAlpha.300" } }}
      textDecoration="none"
    >
      <Image src="/carousel2.webp" objectFit="cover" height="25rem" rounded="sm" />
      <Box padding="0.5rem" marginTop="0.5rem">
        <Heading fontWeight="medium">{data.name}</Heading>
        <Text fontSize="sm">{data.arrivalDate}</Text>
      </Box>
    </Link>
  )
}
