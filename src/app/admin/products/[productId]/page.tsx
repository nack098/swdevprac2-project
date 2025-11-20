"use client";
import { use, useEffect, useState } from "react";
import {
  Box,
  Image,
  HStack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Input,
  Field,
  Textarea,
  NumberInput,
} from "@chakra-ui/react";
import { del, getById, put } from "@/libs/apis/arttoys";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/features/productSlice";

interface Props {
  productId: string;
}

export default function ProductPage({
  params,
}: {
  params: Promise<Props>;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { productId } = use(params);
  const [product, setProduct] = useState();

  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token as string;

  const [sku, setSku] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [availableQuota, setAvailableQuota] = useState<string>(
    ""
  );
  const [posterPicture, setPosterPicture] = useState<string>(
    ""
  );

  useEffect(() => {
    const promise = getById(productId);
    promise.then((res) => {
      const data = res.data;
      console.log(data.data);
      setProduct(data.data);
      setSku(data.data.sku);
      setName(data.data.name);
      setDescription(data.data.description);
      setArrivalDate(data.data.arrivalDate.split("T")[0]);
      setAvailableQuota(data.data.availableQuota);
      setPosterPicture(data.data.posterPicture);
    });
    return () => { Promise.reject(promise) }
  }, [])

  const handleUpdate = async () => {
    // Implement order submission logic here
    try {
      const productData: ArtToysData = {
        sku,
        name,
        description,
        arrivalDate,
        availableQuota: parseInt(availableQuota),
        posterPicture,
      };
      const res = await put(productId, productData, token);

      if (res.status == 400) {
        alert("Arrival date must not be earlier than the current date");
      }
      if (res.status !== 200) {
        console.error("Product update error:", res.statusText);
        return null;
      }

      dispatch(fetchProducts())
      router.replace("/admin/products");
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleDelete = async () => {
    // Implement order deletion logic here
    try {
      const res = await del(productId, token);

      if (res.status !== 200) {
        console.error("Product delete error:", res.statusText);
        return null;
      }
      dispatch(fetchProducts())
      router.replace("/admin/products");
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  return (
    <Box
      paddingX="2rem"
      marginX="10rem"
      paddingY="3rem"
      marginY="2rem"
      rounded="md"
      boxShadow={{ _light: "0 0 0.1rem 0 black", _dark: "0 0 0.1rem 0 white" }}
    >
      <HStack justifyContent="center" gap="2rem" align="start" textAlign="left">
        <Box height="40rem" width="40rem" rounded="md" bg="gray.400">
          <Image
            src={posterPicture}
            height="full"
            width="full"
            objectFit="cover"
          />
        </Box>
        <Box width="35rem" p="1rem" rounded="md">
          <Field.Root>
            <Field.Label>
              SKU <Field.RequiredIndicator />
            </Field.Label>
            <Input value={sku} onChange={(e) => setSku(e.target.value)} />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Toy Name <Field.RequiredIndicator />
            </Field.Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Description <Field.RequiredIndicator />
            </Field.Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Available Quota <Field.RequiredIndicator />
            </Field.Label>
            <NumberInput.Root
              value={availableQuota}
              onValueChange={(e) => setAvailableQuota(e.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Arrival Date <Field.RequiredIndicator />
            </Field.Label>
            <input
              type="date"
              value={arrivalDate}
              min={(new Date()).toISOString().split("T")[0]}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Picture URL <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={posterPicture}
              onChange={(e) => setPosterPicture(e.target.value)}
            />
          </Field.Root>
          <ButtonGroup>
            <Button width="15rem" bg="purple.600" onClick={handleUpdate}>
              Save
            </Button>
            <Button width="15rem" bg="red.600" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </HStack>
    </Box>
  );
}
