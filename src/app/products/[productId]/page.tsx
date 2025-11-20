"use client";
import { use, useEffect, useState } from "react";
import { Box, Image, HStack, Heading, Text, Button, Field, NumberInput } from "@chakra-ui/react";
import { getById } from "@/libs/apis/arttoys";
import { useSession } from "next-auth/react";
import { post } from "@/libs/apis/orders";

interface Props {
  productId: string;
}

export default function ProductPage({
  params,
}: {
  params: Promise<Props>;
}) {
  const { productId } = use(params);
  const { data: session, status } = useSession();
  const token = session?.user.token as string;
  const [data, setData] = useState<any>(null);
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const product = data?.data;
  useEffect(() => {
    const res = getById(productId);
    res.then(data => { setData(data.data); console.log(data) })
    return () => { Promise.reject(res) }
  }, [])
  return (
    <Box
      paddingX="2rem"
      marginX="10rem"
      paddingY="3rem"
      marginY="2rem"
      rounded="md"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
    >
      {data ?
        <HStack
          justifyContent="center"
          gap="12rem"
          align="start"
          textAlign="left"
        >
          <Image
            src={product.posterPicture}
            height="50rem"
            width="50rem"
            objectFit="cover"
            rounded="md"
          />
          <Box width="35rem" rounded="md">
            <Text>{product.sku}</Text>
            <Heading as="h1" fontSize="5xl" fontWeight="bold" lineHeight="3rem">
              {product.name}
            </Heading>
            <Text as="h2" fontSize="2xl" marginBottom="0.5rem">
              {product.arrivalDate}
            </Text>
            <hr />
            <Text height="39rem" width="30rem" marginTop="1rem">
              {product.description}
            </Text>
            <Box display="flex" flexDirection="row">
              <NumberInput.Root defaultValue="1" height="2rem" width="6rem" min={1} max={product.availableQuota} onValueChange={({ valueAsNumber }) => { setAmount(valueAsNumber) }}>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
              <Button disabled={status !== "authenticated" && product.availableQuota > 0} onClick={(e) => { e.preventDefault(); post({ artToy: product._id, orderAmount: amount }, token).then(result => { setMessage(result.data.message) }) }} width="15rem">{product.availableQuota > 0 ? "Order" : "Out of stock"}</Button>
              <Text color="red" textAlign={"center"} height="full"> {message} </Text>
            </Box>
          </Box>
        </HStack> :
        <></>
      }
    </Box >
  );
}
