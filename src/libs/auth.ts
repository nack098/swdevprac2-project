import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

/* TODO: Configure Credentials Login */
const credentials = Credentials({
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [credentials],
})
