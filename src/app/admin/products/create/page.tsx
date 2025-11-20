"use client";
import { use, useState } from "react";
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
import { create } from "@/libs/apis/arttoys";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addProduct } from "@/redux/features/productSlice";

interface Props {
  productId: string;
}

export default function ProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token as string;
  const dispatch = useDispatch<AppDispatch>();

  const [sku, setSku] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [posterPicture, setPosterPicture] = useState<string>("");
  const [availableQuota, setAvailableQuota] = useState<string>("1");

  const handleCreate = async () => {
    try {
      const productData: ArtToysData = {
        sku,
        name,
        description,
        arrivalDate,
        availableQuota: 0,
        posterPicture,
      };
      const res = await create(productData, token);
      console.log(res);

      if (res.status == 400) {
        alert("Arrival date must not be earlier than the current date");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.error("Product update error:", res.statusText);
        return null;
      }

      const data = res.data.data;
      const retProd: ProductDetail = {
        _id: data._id,
        sku: data.sku,
        name: data.name,
        description: data.description,
        arrivalDate: data.arrivalDate,
        availableQuota: data.availableQuota,
        posterPicture: data.posterPicture,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
      dispatch(addProduct(retProd));

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
      <HStack
        justifyContent="center"
        gap="12rem"
        align="start"
        textAlign="left"
      >
        <Box height="50rem" width="50rem" rounded="md" bg="gray.400">
          <Image
            src={posterPicture}
            height="full"
            width="full"
            objectFit="cover"
          />
        </Box>
        <Box
          as="form"
          width="35rem"
          p="1rem"
          rounded="md"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <Field.Root>
            <Field.Label>
              SKU <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={sku}
              required
              onChange={(e) => setSku(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Toy Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Description <Field.RequiredIndicator />
            </Field.Label>
            <Textarea
              value={description}
              required
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
            <Input
              type="date"
              value={arrivalDate}
              required
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Picture URL <Field.RequiredIndicator />
            </Field.Label>
            <Input
              value={posterPicture}
              required
              onChange={(e) => setPosterPicture(e.target.value)}
            />
          </Field.Root>
          <Button width="15rem" bg="purple.600" type="submit">
            Create
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}
