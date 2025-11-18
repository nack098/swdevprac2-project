"use client";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  Text,
  Link,
  Button,
  Select,
  createListCollection,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuLock, LuMail, LuPhone, LuUser } from "react-icons/lu";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string[]>(["member"]);

  const roleSelect = createListCollection({
    items: [
      { label: "Member", value: "member" },
      { label: "Admin", value: "admin" },
    ],
  });

  const normalSize = useBreakpointValue({ base: false, sm: false, md: true });

  function handleRegister() {
    console.log("HandleRegister", name, email, tel, password, role[0]);
  }
  return (
    <div className="h-[calc(100vh-5rem)] w-full bg-gradient-to-br from-purple-600 to-fuchsia-400 flex items-center justify-center">
      {normalSize && (
        <Box
          position="absolute"
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
          <Box w="40%" h="32rem" p="2rem" bg="white">
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
              <Select.Root
                collection={roleSelect}
                value={role}
                onValueChange={(e) => setRole(e.value)}
              >
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select role" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Select.Positioner>
                  <Select.Content>
                    {roleSelect.items.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              <Button
                size="md"
                colorPalette="purple"
                mt="2rem"
                onClick={handleRegister}
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
            <Select.Root
              collection={roleSelect}
              multiple={false}
              value={role}
              onValueChange={(e) => setRole(e.value)}
            >
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select role" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                  <Select.ClearTrigger />
                </Select.IndicatorGroup>
              </Select.Control>

              <Select.Positioner>
                <Select.Content>
                  {roleSelect.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
            <Button
              size="md"
              colorPalette="purple"
              mt="2rem"
              onClick={handleRegister}
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
    </div>
  );
}
