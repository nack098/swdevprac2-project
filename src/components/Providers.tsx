"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {
    return <NextAuthProvider> {children} </NextAuthProvider>;
}
