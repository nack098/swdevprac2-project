"use client";

import { get } from "@/libs/apis/orders";
import { SimpleGrid } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import OrderCard from "@/components/OrderCard";

export default async function MyOrdersPage() {
  const { data: session } = useSession();
  const token = session?.user?.token;

  if (!token) {
    return null;
  }
  const orders = await get(token);
  return (
    <SimpleGrid minChildWidth="40rem" columns={2} gap="2rem">
      {/* <OrderCard toyName="Toy1" amount={2} member="Alice" />
      <OrderCard toyName="Toy2" amount={1} member="Bob" />
      <OrderCard toyName="Toy3" amount={3} />
      <OrderCard toyName="Toy4" amount={1} /> */}
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
