import { Box, Heading } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)">
      <Heading as="h1">
        Unknown Page
      </Heading>
    </Box>
  )
}
