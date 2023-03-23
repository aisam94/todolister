import { FormEvent, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { NextRouter, useRouter } from "next/router";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";

const Register = () => {
  const router: NextRouter = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const toast = useToast();

  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        createErrorNotification(errorCode);
        console.log({ errorCode });
        console.log({ errorMessage });
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePassword2Visibility = () => {
    setIsPassword2Visible(!isPassword2Visible);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (password === password2) {
      createUser(email, password);
    } else {
      createErrorNotification("password not matching");
    }
  };

  function handleEmailInput(e: { target: HTMLInputElement }) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e: { target: HTMLInputElement }) {
    setPassword(e.target.value);
  }

  function handlePassword2Input(e: { target: HTMLInputElement }) {
    setPassword2(e.target.value);
  }

  const createErrorNotification = (errorMsg: string) => {
    switch (errorMsg) {
      case "auth/weak-password":
        toast({
          title: "Error",
          description: "Password should be at least 6 characters",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        break;
      case "auth/invalid-email":
        toast({
          title: "Error",
          description: "Invalid email format",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        break;
      case "auth/email-already-in-use":
        toast({
          title: "Error",
          description: "Email already in use",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        break;
      case "password not matching":
        toast({
          title: "Error",
          description: "Password not matching",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        break;
      default:
        toast({
          title: "Error",
          description: "Error registering account",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
    }
  };

  function isEmailError() {
    if (email === "") return true;
  }

  function isPasswordError() {
    if (password === "") return true;
  }

  return (
    <div className="login-main mt-4 px-4 pb-5">
      <Box className="form-container">
        <h1 className="form-secondary-title text-primary font-bold text-xl">
          Register your account
        </h1>

        <form className="form-inputs" onSubmit={(event) => submit(event)}>
          <FormControl isRequired>
            {/* Email */}
            <Input
              type="text"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailInput}
              required
            />
            {!isEmailError ? (
              <FormHelperText>Enter your email.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
            {/* Password wrapper */}
            <InputGroup>
              {/* Password */}
              <Input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordInput}
                required
              />
              {/* Password visibility indicator */}
              <InputRightElement
                className="mt-2"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <img className="w-5 h-5 opacity-50" src="/eye_on.svg" />
                ) : (
                  <img className="w-5 h-5 opacity-50" src="/eye_off.svg" />
                )}
              </InputRightElement>
            </InputGroup>

            {/* Password2 wrapper */}
            <InputGroup>
              {/* Password2 */}
              <Input
                type={isPassword2Visible ? "text" : "password"}
                name="password2"
                className="form-field"
                placeholder="Reenter Password"
                value={password2}
                onChange={handlePassword2Input}
                required
              />
              {/* Password2 visibility indicator */}
              <InputRightElement
                className="mt-2"
                onClick={togglePassword2Visibility}
              >
                {isPassword2Visible ? (
                  <img className="w-5 h-5 opacity-50" src="/eye_on.svg" />
                ) : (
                  <img className="w-5 h-5 opacity-50" src="/eye_off.svg" />
                )}
              </InputRightElement>
              {!isPasswordError ? (
                <FormHelperText>Enter your password.</FormHelperText>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </InputGroup>
          </FormControl>
          {/* Submit button */}
          <Button colorScheme="red" type="submit">
            CREATE ACCOUNT
          </Button>
        </form>
        <div className="form-notice-container">
          <h3>
            Already have an account?
            <Link href="/login">
              <span className="text-primary cursor-pointer"> Login here</span>
            </Link>
          </h3>
        </div>
      </Box>
    </div>
  );
};

export default Register;
