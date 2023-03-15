import { FormEvent, useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { NextRouter } from "next/router";
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

const Login = () => {
  const router: NextRouter = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/too-many-requests") {
          createErrorNotification(
            "Access to this account has been temporarily disabled due to many failed login attempts"
          );
        } else if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          createErrorNotification("Email or password is wrong");
        } else {
          createErrorNotification("Error signing in");
        }
        console.log({ errorCode });
        console.log({ errorMessage });
      });
  };

  function handleEmailInput(e: { target: HTMLInputElement }) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e: { target: HTMLInputElement }) {
    setPassword(e.target.value);
  }

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    signIn(email, password);
  };

  const createErrorNotification = (errorMsg: string): any => {
    toast({
      title: "Error",
      description: errorMsg,
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  function isEmailError() {
    if (email === "") return true;
  }

  function isPasswordError() {
    if (password === "") return true;
  }

  return (
    <div className="login-main mt-4">
      <Box className="form-container">
        <h1 className="form-secondary-title text-primary font-bold text-xl">
          Sign in to your account
        </h1>
        <form className="form-inputs" onSubmit={(event) => submit(event)}>
          <FormControl isRequired>
            {/* Email */}
            <Input
              type="email"
              value={email}
              onChange={handleEmailInput}
              placeholder="Email Address"
            />
            {!isEmailError ? (
              <FormHelperText>Enter your email.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
            {/* Password */}
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordInput}
                placeholder="Password"
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
              {!isPasswordError ? (
                <FormHelperText>Enter your password.</FormHelperText>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </InputGroup>
          </FormControl>

          {/* Submit button */}
          <Button colorScheme="red" type="submit">
            LOGIN
          </Button>
        </form>
        <div className="form-notice-container">
          <h3 className="form-notice">
            Don't have an account?
            <Link href="/register">
              <span className="text-primary cursor-pointer">
                {" "}
                Register here.
              </span>
            </Link>
          </h3>
        </div>
      </Box>
    </div>
  );
};

export default Login;
