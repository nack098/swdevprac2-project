"use client";

import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  NumberInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function EditOrderPage() {
  const [toyName, setToyName] = useState("Toy1");
  const toyID = ""; // replace with actual id from the product
  const [amount, setAmount] = useState("1"); // change to number when submit

  const handleUpdate = async () => {
    // Implement order submission logic here
    console.log(`Ordering ${amount} of ${toyName}`);
  };
  const handleDelete = async () => {
    // Implement order deletion logic here
    console.log(`Deleting order of ${toyName}`);
  };
  return (
    <VStack>
      <Heading as="h2" size="2xl" fontWeight="bold" mb="2rem">
        Update Your Order
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
      <ButtonGroup mt="2rem">
        <Button bg="purple.600" onClick={handleUpdate}>
          Save
        </Button>
        <Button bg="red.600" onClick={handleDelete}>
          Delete
        </Button>
      </ButtonGroup>
    </VStack>
  );
}
