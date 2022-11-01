import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [passShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handlePassShow = () => {
    setPassShow(!passShow);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an image",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "dvlkx05ib");
      fetch("https://api.cloudinary.com/v1_1/dvlkx05ib/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select image only",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the fields",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };
    
      const { data } = await axios.post(
        "/api/user/register",
        { name, email, password, pic }
        // config
      );
      toast({
        title: "Registration Successfull",
        // description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="15px">
      <FormControl isRequired>
        <FormLabel>Name :</FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email :</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password :</FormLabel>
        <InputGroup>
          <Input
            value={password}
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
            value={confirmPassword}
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
        <FormLabel>Profile Picture :</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          // accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        w="100%"
        style={{ marginTop: 25 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
