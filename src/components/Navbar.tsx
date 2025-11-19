"use client";

import { Box, Heading, IconButton, Image, Link, Menu, Portal, Stack } from "@chakra-ui/react";
import NextLink from "next/link"
import { FaBars } from "react-icons/fa";
import { ColorModeButton } from "./ui/color-mode";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data, status } = useSession();
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
              <Link as={NextLink} href="/myaccount" textDecorationColor="black" padding="0.5rem" display={{ base: "none", md: "block" }}>
                My Account
              </Link>
              <Link as={NextLink} href="/auth/logout">
                Logout
              </Link>
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
                      <Menu.Item asChild value="myaccount">
                        <Link as={NextLink} href="/myaccount">
                          My Account
                        </Link>
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
