import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [passShow, setPassShow] = useState(false);

  const handlePassShow = () => {
    setPassShow(!passShow);
  };

  return (
    <VStack spacing="15px">
      <FormControl isRequired>
        <FormLabel>Name :</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email :</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password :</FormLabel>
        <InputGroup>
          <Input
            type={passShow ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="2.5rem" size="sm" onClick={handlePassShow}>
              {passShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Confirm Password :</FormLabel>
        <InputGroup>
          <Input
            type={passShow ? "text" : "password"}
            placeholder="Enter your password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="2.5rem" size="sm" onClick={handlePassShow}>
              {passShow ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Name :</FormLabel>
        <Input type={"file"} onChange={(e) => setPic(e.target.value)} />
      </FormControl>
    </VStack>
  );
};

export default Signup;
