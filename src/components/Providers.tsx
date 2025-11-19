"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react"
import { Provider as ChakraProvider } from "./ui/provider";
import { fetchProducts } from "@/redux/features/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "@/redux/store";

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => { dispatch(fetchProducts()) }, [dispatch])
  return (<ChakraProvider><NextAuthProvider> {children} </NextAuthProvider></ChakraProvider>);
}
