"use client";
import { use, useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppSelector } from "@/redux/store";
import { Box, Heading, HStack, Link, SimpleGrid } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { get } from "@/libs/apis/orders";
import OrderCard from "@/components/OrderCard";

function getSortedProducts(products: any) {
  const sortedProducts = [...products].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sortedProducts;
}

export default function AdminPage() {
  const { data } = useSession();
  const [orders, changeOrders] = useState<any>(null);
  const products = useAppSelector((state) => state.productSlice.products);

  useEffect(() => {
    if (data?.user.token) {
      const promise = get(data.user.token);

      promise.then((value) => {
        changeOrders(value.data);
        console.log(value.data);
      });

      return () => {
        Promise.reject(promise);
      };
    }
  }, [data]);

  console.log(products);

  const sortedFive = getSortedProducts(products).slice(0, 5);
  if (data?.user.role !== "admin") {
    return (
      <Heading as="h1" fontSize="3xl" fontWeight="bold">
        Unauthorized
      </Heading>
    );
  }

  return (
    <Box w="full" marginTop="3rem" paddingX="15rem" h="full">
      <Heading fontSize="4xl" fontWeight="bold" lineHeight="4rem">
        Admin Board
      </Heading>
      <Box>
        <HStack justifyContent="space-between">
          <Heading as="h1">Latest Product</Heading>
          <Link as={NextLink} href="/admin/products">
            All Products
          </Link>
        </HStack>
        <SimpleGrid
          minChildWidth="20rem"
          gap="3rem"
          paddingX="5rem"
          marginY="2rem"
        >
          {/* Show 5 newest products (also change this shit to for loop or I will kill you */}
          {sortedFive.map((product: any) => (
            <ProductCard data={product} />
          ))}
        </SimpleGrid>
      </Box>
      <Box>
        <HStack justifyContent="space-between">
          <Heading as="h1">Latest Orders</Heading>
          <Link as={NextLink} href="/admin/orders">
            All Orders
          </Link>
        </HStack>
        <SimpleGrid
          minChildWidth="20rem"
          gap="3rem"
          paddingX="5rem"
          marginY="2rem"
        >
          {/* Show 5 newest orders (also change this shit to for loop or I will kill you */}
          {/* <ProductCard /> */}
          {orders ? (
            getSortedProducts(orders.data).map((order: any) => (
              <OrderCard
                toyName={order.artToy.name}
                amount={order.orderAmount}
                link={`/admin/products/${order.artToy._id}`}
              />
            ))
          ) : (
            <></>
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
