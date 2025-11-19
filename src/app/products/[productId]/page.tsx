"use client"
import { use } from "react"
import { Box } from "@chakra-ui/react";

interface Props {
  productId: string
}

export default function ProductPage({ params }: { params: Promise<Props> }) {
  const { productId } = use(params);
  return (
    <Box>
      this is a product page
    </Box>
  )
}
