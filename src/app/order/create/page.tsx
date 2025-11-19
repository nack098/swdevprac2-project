"use client";

import { post } from "@/libs/apis/orders";
import {
  Button,
  Heading,
  Input,
  NumberInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateOrderPage() {
  const [toyName, setToyName] = useState("Toy1");
  const toyID = ""; // replace with actual id from the product
  const [amount, setAmount] = useState("1"); // change to number when submit
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token as string;

  const handleOrder = async () => {
    // Implement order submission logic here
    try {
      const orderData: OrderCreateData = {
        artToy: toyID,
        orderAmount: Number(amount),
      };
      const res = await post(orderData, token);

      if (res.status == 400) {
        alert("Order amount must be between 1-5 or quota exceeded");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.error("Order creation error:", res.statusText);
        return null;
      }
      router.replace("/myorders");
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
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
