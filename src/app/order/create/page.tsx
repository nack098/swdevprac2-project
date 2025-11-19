"use client";

import {
  Button,
  Heading,
  Input,
  NumberInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function CreateOrderPage() {
  const [toyName, setToyName] = useState("Toy1");
  const toyID = ""; // replace with actual id from the product
  const [amount, setAmount] = useState("1"); // change to number when submit

  const handleOrder = async () => {
    // Implement order submission logic here
    console.log(`Ordering ${amount} of ${toyName}`);
  };
  return (
    <VStack>
      <Heading as="h2" size="2xl" fontWeight="bold" mb="2rem">
        Order Your Art Toys
      </Heading>
      <Text fontSize="sm">Toy</Text>
      <Input disabled value={toyName} type="text" width="30%" />
      <Text fontSize="sm" mt="1rem">
        Amount (1-5)
      </Text>
      <NumberInput.Root
        defaultValue="1"
        width="30%"
        min={1}
        max={5}
        value={amount}
        onValueChange={(e) => setAmount(e.value)}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Button bg="purple.600" mt="2rem" onClick={handleOrder}>
        Save
      </Button>
    </VStack>
  );
}
