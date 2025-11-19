"use client";

import { Box, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
  toyName: string;
  amount: number;
  member?: string;
}

function OrderCard(props: Props) {
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
      width="44rem"
      height="12rem"
      position="relative"
    >
      <Heading as="h3" size="xl" fontWeight="bold" color="black" mb="0.5rem">
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

export default function MyOrdersPage() {
  return (
    <SimpleGrid minChildWidth="40rem" columns={2} gap="2rem">
      <OrderCard toyName="Toy1" amount={2} member="Alice" />
      <OrderCard toyName="Toy2" amount={1} member="Bob" />
      <OrderCard toyName="Toy3" amount={3} />
      <OrderCard toyName="Toy4" amount={1} />
    </SimpleGrid>
  );
}
