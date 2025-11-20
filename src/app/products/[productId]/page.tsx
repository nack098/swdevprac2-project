"use client";
import { use, useEffect, useState } from "react";
import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Field,
  NumberInput,
} from "@chakra-ui/react";
import { getById } from "@/libs/apis/arttoys";
import { useSession } from "next-auth/react";
import { post } from "@/libs/apis/orders";

interface Props {
  productId: string;
}

export default function ProductPage({ params }: { params: Promise<Props> }) {
  const { productId } = use(params);
  const { data: session, status } = useSession();
  const token = session?.user.token as string;
  const [data, setData] = useState<any>(null);
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("");
  const product = data?.data;
  useEffect(() => {
    const res = getById(productId);
    res.then((data) => {
      setData(data.data);
      console.log(data);
    });
    return () => {
      Promise.reject(res);
    };
  }, []);
  return (
    <Box
      paddingX={{ base: "2rem", md: "10rem" }}
      paddingY="3rem"
      marginY="2rem"
      width="full"
      rounded="md"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
    >
      {data ? (
        <Stack
          direction={{ base: "column", xl: "row" }}
          justifyContent="center"
          width="full"
          height="full"
          gap="2rem"
          align="start"
          textAlign="left"
        >
          <Box height="40rem" maxWidth="40rem" rounded="md" bg="gray.400">
            <Image
              src={product.posterPicture}
              height="full"
              width="full"
              objectFit="cover"
            />
          </Box>
          <Box maxWidth="35rem" rounded="md">
            <Text>{product.sku}</Text>
            <Heading as="h1" fontSize={{ base: "2xl", sm: "5xl" }} fontWeight="bold" lineHeight="3rem" textWrap="pretty">
              {product.name}
            </Heading>
            <Text as="h2" fontSize={{ base: "md", sm: "2xl" }} marginBottom="0.5rem">
              Quota: {product.availableQuota}
            </Text>
            <Text as="h2" fontSize={{ base: "md", sm: "2xl" }} marginBottom="0.5rem">
              {product.arrivalDate}
            </Text>
            <hr />
            <Text height="26.5rem" fontSize={{ base: "sm", sm: "md" }} maxWidth="30rem" marginTop="1rem">
              {product.description}
            </Text>
            <Box display="flex" flexDirection="row" gap="2rem">
              <NumberInput.Root
                defaultValue="1"
                height="2rem"
                maxWidth="6rem"
                min={1}
                max={product.availableQuota}
                onValueChange={({ valueAsNumber }) => {
                  setAmount(valueAsNumber);
                }}
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
              <Button
                disabled={
                  status !== "authenticated" && product.availableQuota > 0
                }
                onClick={(e) => {
                  e.preventDefault();
                  post(
                    { artToy: product._id, orderAmount: amount },
                    token
                  ).then((result) => {
                    setMessage(result.data.message);
                  });
                }}
                maxWidth="15rem"
              >
                {product.availableQuota > 0 ? "Order" : "Out of stock"}
              </Button>
              <Text
                color="red"
                fontSize="sm"
                textAlign={"center"}
                height="full"
              >
                {" "}
                {message}{" "}
              </Text>
            </Box>
          </Box>
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
