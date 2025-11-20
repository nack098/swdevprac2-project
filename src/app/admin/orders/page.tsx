"use client";

import { get } from "@/libs/apis/orders";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";

export default async function OrdersPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const [orders, setOrders] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    const raw = get(token);
    raw.then((data) => {
      setOrders(data.data);
    });
    return () => {
      Promise.reject(raw);
    };
  }, [session]);

  if (!token) {
    return null;
  }

  return (
    <Box paddingX={{ base: "2rem", md: "4rem" }} paddingY="5rem">
      <Heading as="h1" fontWeight="bold" fontSize="3xl" marginBottom="2rem">
        Orders
      </Heading>
      <SimpleGrid
        minChildWidth={{ md: "40rem" }}
        gap={{ base: "2rem", md: "4rem" }}
        columns={2}
      >
        {orders && orders.data ? (
          orders.data.map((order: any) => (
            <OrderCard
              key={order._id}
              toyName={order.artToy}
              amount={order.orderAmount}
              member={order.user}
              link={`/admin/orders/${order._id}`}
            />
          ))
        ) : (
          <></>
        )}
      </SimpleGrid>
    </Box>
  );
}
