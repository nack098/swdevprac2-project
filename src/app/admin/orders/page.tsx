"use client";

import { get } from "@/libs/apis/orders";
import { SimpleGrid } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import OrderCard from "@/components/OrderCard";

export default async function OrdersPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  if (!token) {
    return null;
  }
  const orders = await get(token);
  return (
    <SimpleGrid minChildWidth="40rem" columns={2} gap="2rem">
      {orders.data.map((order: any) => (
        <OrderCard
          key={order._id}
          toyName={order.artToy}
          amount={order.orderAmount}
          member={order.user}
        />
      ))}
    </SimpleGrid>
  );
}
