"use client";

import { getById, del, put } from "@/libs/apis/orders";
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
import { use, useEffect, useState } from "react";

export default function EditOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [toyData, setToyData] = useState<any>(null);
  const [amount, setAmount] = useState<number>(1);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token as string;
  useEffect(() => {
    if (!token) return;
    const promise = getById(orderId, token);
    promise.then(data => { setToyData(data.data); setAmount(data.data.orderAmount); console.log(data) });
    return (() => { Promise.reject(promise) })
  }, [token])

  const handleUpdate = async () => {
    // Implement order submission logic here
    try {
      const orderData: OrderPutData = {
        orderAmount: amount,
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
      {toyData ?
        <>
          <Heading as="h2" size="2xl" fontWeight="bold" mb="2rem">
            Update Your Order
          </Heading>
          <Text fontSize="sm">Toy</Text>
          <Input disabled value={toyData.data.artToy.name} type="text" width="30%" />
          <Text fontSize="sm" mt="1rem">
            Amount (1-5)
          </Text>
          <NumberInput.Root
            defaultValue={toyData.data.orderAmount}
            width="30%"
            disabled={toyData.data.artToy.availableQuota + toyData.data.orderAmount < 1}
            min={1}
            max={Math.min(toyData.data.artToy.availableQuota + toyData.data.orderAmount, 5)}
            onValueChange={({ valueAsNumber }) => setAmount(valueAsNumber)}
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
        </> : <></>}
    </VStack>
  );
}
