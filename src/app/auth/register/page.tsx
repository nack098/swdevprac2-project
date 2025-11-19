"use client";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  Text,
  Link,
  Button,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLock, LuMail, LuPhone, LuUser } from "react-icons/lu";
import { register } from "@/libs/apis/auth";
import { signIn } from "@/libs/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const normalSize = useBreakpointValue({ base: false, sm: false, md: true });

  const handleRegister = async () => {
    try {
      const registerData: RegisterData = {
        name, email, tel, password
      };
      const res = await register(registerData);

      if (res.status !== 200 && res.status !== 201) {
        console.error("Register error:", res.statusText);
        return null;
      }

      router.replace("/auth/login")
    } catch (error) {
      console.error("Authorize Error:", error);
      return null;
    }
  };

  return (
    <Box position="fixed" width="full" height="full" bgGradient="to-br" gradientFrom="purple.600" gradientTo="#FF00FF">
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
              Please register to become our member.
            </Heading>
          </Box>
          <Box w="40%" h="32rem" p="2rem" bg={{ _light: "white", _dark: "gray.700" }}>
            <form>
              <VStack>
                <Heading as="h2" fontWeight="bold" fontSize="xl">
                  Register
                </Heading>
                <InputGroup startElement={<LuUser />} mt="2rem">
                  <Input
                    placeholder="Name"
                    w="full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                <InputGroup startElement={<LuMail />}>
                  <Input
                    placeholder="Email"
                    w="full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup startElement={<LuPhone />}>
                  <Input
                    placeholder="Tel"
                    w="full"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
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
                  onClick={handleRegister}
                >
                  Confirm
                </Button>
                <Text fontSize="2xs" mt="2rem" color={{ _light: "black", _dark: "white" }}>
                  Already have an account? Click{" "}
                  <Link variant="underline" href="/auth/login" color={{ _light: "purple", _dark: "purple.300" }}>
                    here
                  </Link>{" "}
                  to login.
                </Text>
              </VStack>
            </form>
          </Box>
        </Box>
      )}
      {!normalSize && (
        <Box w="24rem" h="32rem" p="2rem" bg="white">
          <VStack>
            <Heading as="h2" fontWeight="bold" fontSize="xl" mt="2rem">
              Register
            </Heading>
            <InputGroup startElement={<LuUser />} mt="2rem">
              <Input
                placeholder="Name"
                w="full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup startElement={<LuMail />}>
              <Input
                placeholder="Email"
                w="full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup startElement={<LuPhone />}>
              <Input
                placeholder="Tel"
                w="full"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
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
              type="submit"
            >
              Confirm
            </Button>
            <Text fontSize="2xs" mt="2rem" color="black">
              Already have an account? Click{" "}
              <Link variant="underline" href="/auth/login" color="purple">
                here
              </Link>{" "}
              to login.
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
