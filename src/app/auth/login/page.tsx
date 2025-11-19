"use client";

import {
  Box,
  Heading,
  Input,
  InputGroup,
  Text,
  Link,
  Button,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuLock, LuMail } from "react-icons/lu";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const normalSize = useBreakpointValue({ base: false, sm: false, md: true });

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result) {
      console.error("Login failed: No result returned");
      return;
    }
    if (result.ok && !result.error) {
      router.push("/");
      return;
    } else {
      console.error("Login failed:", result.error);
    }
  };

  return (
    <Box
      position="fixed"
      width="full"
      height="full"
      bgGradient="to-br"
      gradientFrom="purple.600"
      gradientTo="#FF00FF"
    >
      {normalSize && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          w="64rem"
          h="32rem"
          boxShadow="2xl"
          display="flex"
        >
          <Box
            w="60%"
            h="32rem"
            p="4rem"
            bgGradient="to-br"
            gradientFrom="purple.500"
            gradientTo="yellow.300"
          >
            <Heading
              as="h1"
              fontWeight="bold"
              fontSize="3xl"
              color="white"
              mt="4rem"
            >
              Welcome to Drunkman Shop
            </Heading>
            <Heading
              as="h4"
              fontWeight="semibold"
              fontSize="lg"
              mt="4rem"
              color="white"
            >
              Please login to start buying quality art toys.
            </Heading>
          </Box>
          <Box
            w="40%"
            h="32rem"
            p="2rem"
            bg={{ _light: "white", _dark: "gray.700" }}
          >
            <form>
              <VStack>
                <Heading
                  as="h2"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2rem"
                  color="black"
                >
                  Login
                </Heading>
                <InputGroup startElement={<LuMail />} mt="2rem">
                  <Input
                    placeholder="Email"
                    w="full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup startElement={<LuLock />}>
                  <Input
                    placeholder="Password"
                    w="full"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                <Button
                  size="md"
                  colorPalette="purple"
                  mt="2rem"
                  onClick={handleLogin}
                >
                  Confirm
                </Button>
                <Text
                  fontSize="2xs"
                  mt="2rem"
                  color={{ _light: "black", _dark: "white" }}
                >
                  Don’t have an account? Click{" "}
                  <Link
                    variant="underline"
                    href="/auth/register"
                    color={{ _light: "purple", _dark: "purple.300" }}
                  >
                    here
                  </Link>{" "}
                  to register.
                </Text>
              </VStack>
            </form>
          </Box>
        </Box>
      )}
      {!normalSize && (
        <Box
          w="24rem"
          h="32rem"
          p="2rem"
          bg={{ _light: "white", _dark: "gray.700" }}
        >
          <form>
            <VStack>
              <Heading as="h2" fontWeight="bold" fontSize="xl" mt="2rem">
                Login
              </Heading>
              <InputGroup startElement={<LuMail />} mt="2rem">
                <Input
                  placeholder="Email"
                  w="full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup startElement={<LuLock />}>
                <Input
                  placeholder="Password"
                  w="full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <Button
                size="md"
                colorPalette="purple"
                mt="2rem"
                onClick={handleLogin}
              >
                Confirm
              </Button>
              <Text
                fontSize="2xs"
                mt="2rem"
                color={{ _light: "white", _dark: "gray.700" }}
              >
                Don't have an account? Click{" "}
                <Link
                  variant="underline"
                  href="/auth/register"
                  color={{ _light: "purple", _dark: "purple.300" }}
                >
                  here
                </Link>{" "}
                to register.
              </Text>
            </VStack>
          </form>
        </Box>
      )}
    </Box>
  );
}
