"use client";

import { Box, Button, Heading, IconButton, Image, Link, Menu, Portal, Stack } from "@chakra-ui/react";
import NextLink from "next/link"
import { FaBars } from "react-icons/fa";
import { ColorModeButton } from "./ui/color-mode";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  console.log(session)
  return (
    <Stack
      direction="row"
      height="5rem" width="full"
      paddingY="1rem" paddingX={{ base: "1rem", md: "6rem" }}
      justifyContent="space-between"
      bg={{ _dark: "blackAlpha.700", _light: "whiteAlpha.700" }}
      position="sticky"
      top="0"
      zIndex="999"
    >
      <Link as={NextLink} href="/" textDecoration="none">
        <Box display="inline-flex" justifyItems="center" alignItems="center" gap="0.5rem">
          <Image src="/logo.webp" height="3rem" />
          <Box>
            <Heading as="h1" fontWeight="bold" lineHeight="1rem">Drunkman</Heading>
            <Heading as="p" fontSize="xs" lineHeight="1rem">Art Toys Shop</Heading>
          </Box>
        </Box>
      </Link>
      <Box display="inline-flex" justifyItems="center" alignItems="center" gap="0.25rem">
        <Link as={NextLink} href="/products" textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }}>
          Products
        </Link>
        {
          status === "authenticated" ?
            <>
              <Link as={NextLink} href="/myorders" textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }}>
                My Orders
              </Link>
              {session?.user.role !== "admin" ?
                <></> :

                <Link as={NextLink} href="/admin" textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }}>
                  Admin Panel
                </Link>
              }
              <Button bg="none" border="none" onClick={() => signOut()} textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }} color={{ _dark: "gray.300", _light: "gray.700" }} fontSize="sm" textDecoration={{ _hover: "underline" }}>
                Logout
              </Button>
            </>
            :
            <>
              <Link as={NextLink} href="/auth/login" textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }}>
                Login
              </Link>
              <Link as={NextLink} href="/auth/register" textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }}>
                Sign up
              </Link>
            </>
        }
        <ColorModeButton variant="outline" size="md" />
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton aria-label="Open menu" variant="outline" size="md" md={{ display: "none" }}>
              <FaBars />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item asChild value="product">
                  <Link as={NextLink} href="/products">
                    Products
                  </Link>
                </Menu.Item>
                {
                  status === "authenticated" ?
                    <>
                      <Menu.Item asChild value="myorders">
                        <Link as={NextLink} href="/myorders">
                          My Orders
                        </Link>
                      </Menu.Item>
                      {session?.user.role !== "admin" ?
                        <>
                        </> :
                        <Menu.Item asChild value="admin">
                          <Link as={NextLink} href="/admin">
                            Admin Panel
                          </Link>
                        </Menu.Item>
                      }
                      <Menu.Item asChild value="logout">
                        <Button bg="none" border="none" onClick={() => signOut()} textDecorationColor="gray.200" padding="0.5rem" color={{ _dark: "gray.300", _light: "gray.700" }} fontSize="sm" textDecoration={{ _hover: "underline" }}>
                          Logout
                        </Button>
                      </Menu.Item>
                    </>
                    :
                    <>
                      <Menu.Item asChild value="login">
                        <Link as={NextLink} href="/auth/login">
                          Login
                        </Link>
                      </Menu.Item>
                      <Menu.Item asChild value="register">
                        <Link as={NextLink} href="/auth/register">
                          Sign up
                        </Link>
                      </Menu.Item>
                    </>
                }
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Stack>
  );
}
