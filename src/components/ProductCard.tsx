import { Link, Image, Box, Heading, Text } from "@chakra-ui/react"
import NextLink from "next/link"
interface Props {
  data: ProductDetail
  link?: string
}

export default function ProductCard({ data, link }: Props) {
  return (
    <Link as={NextLink}
      href={link ? link : "/"}
      transition="colors"
      transitionDuration="300ms"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
      maxWidth="30rem"
      padding="1rem"
      rounded="sm"
      display="block"
      _hover={{ bg: { _light: "blackAlpha.200", _dark: "whiteAlpha.300" } }}
      textDecoration="none"
    >
      <Image src={data.posterPicture} objectFit="cover" height="25rem" rounded="sm" />
      <Box padding="0.5rem" marginTop="0.5rem">
        <Heading fontWeight="medium">{data.name}</Heading>
        <Text fontSize="sm">{data.arrivalDate}</Text>
      </Box>
    </Link>
  )
}
