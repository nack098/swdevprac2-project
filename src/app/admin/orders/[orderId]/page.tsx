"use client";

import { getById, del, put } from "@/libs/apis/orders";
import {
  Box,
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
    promise.then((data) => {
      setToyData(data.data);
      setAmount(data.data.orderAmount);
      console.log(data);
    });
    return () => {
      Promise.reject(promise);
    };
  }, [token]);

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
    <Box display="flex" width="full" justifyContent="center" marginTop="2rem">
      <VStack
        width="full"
        maxWidth="30rem"
        paddingY="3rem"
        paddingX="4rem"
        bg={{ _dark: "gray.900", _light: "gray.100" }}
        boxShadow={{
          _light: "0 0 0.1rem 0 black",
          _dark: "0 0 0.1rem 0 white",
        }}
        rounded="md"
      >
        {toyData ? (
          <>
            <Heading as="h2" size="2xl" fontWeight="bold" mb="2rem">
              Update Your Order
            </Heading>
            <Text fontSize="sm">Toy</Text>
            <Input
              disabled
              value={toyData.data.artToy.name}
              type="text"
              width="100%"
            />
            <Text fontSize="sm" mt="1rem">
              Amount (1-5)
            </Text>
            <NumberInput.Root
              defaultValue={toyData.data.orderAmount}
              width="30%"
              disabled={
                toyData.data.artToy.availableQuota + toyData.data.orderAmount <
                1
              }
              min={1}
              max={Math.min(
                toyData.data.artToy.availableQuota + toyData.data.orderAmount,
                5
              )}
              onValueChange={({ valueAsNumber }) => setAmount(valueAsNumber)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
            <ButtonGroup mt="2rem">
              <Button bg="purple.600" color="gray.200" onClick={handleUpdate}>
                Save
              </Button>
              <Button bg="red.600" color="gray.200" onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <></>
        )}
      </VStack>
    </Box>
  );
}
