"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react"
import { Provider as ChakraProvider } from "./ui/provider";

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (<ChakraProvider><NextAuthProvider> {children} </NextAuthProvider></ChakraProvider>);
}
