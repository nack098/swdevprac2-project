"use client"
import { Box, Heading, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
  toyName: string;
  amount: number;
  member?: string;
}

export default function OrderCard(props: Props) {
  const router = useRouter();
  const handleEdit = () => {
    router.push("/order/edit");
  };
  return (
    <Box
      bg="purple.200"
      borderRadius="md"
      shadow="lg"
      padding="1.5rem"
      margin="1rem"
      maxWidth="44rem"
      height="12rem"
      position="relative"
    >
      <Heading as="h1" size="xl" fontWeight="bold" color="black" mb="0.5rem">
        {props.toyName}
      </Heading>
      <Text fontSize="md" color="black">
        Amount ordered: {props.amount}
      </Text>
      {props.member && (
        <Text fontSize="md" color="black">
          Ordered by: {props.member}
        </Text>
      )}
      <Button
        colorPalette="gray"
        bottom="2rem"
        position="absolute"
        onClick={handleEdit}
      >
        Edit
      </Button>
    </Box>
  );
}
