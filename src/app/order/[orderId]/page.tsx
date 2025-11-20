"use client";

import { getById } from "@/libs/apis/arttoys";
import { del, put } from "@/libs/apis/orders";
import {
  Button,
  ButtonGroup,
  Heading,
  Input,
  NumberInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default async function EditOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const toyData = await getById(orderId);
  const toyName = toyData.data.name;
  const [amount, setAmount] = useState<string>(toyData.data.orderAmount); // change to number when submit
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token as string;

  const handleUpdate = async () => {
    // Implement order submission logic here
    try {
      const orderData: OrderPutData = {
        orderAmount: parseInt(amount),
      };
      const res = await put(orderId, orderData, token);

      if (res.status == 400) {
        alert("Order amount must be between 1-5 or quota exceeded");
      }
      if (res.status !== 200) {
        console.error("Order update error:", res.statusText);
        return null;
      }

      router.replace("/myorders");
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleDelete = async () => {
    // Implement order deletion logic here
    try {
      const res = await del(orderId, token);

      if (res.status !== 200) {
        console.error("Order deletion error:", res.statusText);
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
