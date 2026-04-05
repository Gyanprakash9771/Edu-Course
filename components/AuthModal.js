import API from "../services/api"; // ✅ NEW
import { setToken } from "../utils/storage"; // ✅ NEW

import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Modal,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    let error = "";

    if (field === "username" && !isLogin) {
      if (!value) error = "Username is required";
    }

    if (field === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Invalid email format";
    }

    if (field === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Minimum 6 characters required";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isFormValid = () => {
    if (!email || !password) return false;
    if (!isLogin && !username) return false;
    if (errors.email || errors.password || errors.username) return false;
    return true;
  };

  const handleSubmit = async () => {
    onsole.log("BUTTON CLICKED"); 
    if (!isFormValid()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {   // ✅ CHANGED
          email,
          password,
        });

        await setToken(res.data.token);               // ✅ CHANGED

        onClose();
      } else {
        await API.post("/auth/signup", {              // ✅ CHANGED
          username,
          email,
          password,
        });

        setIsLogin(true);
      }
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Content borderRadius="xl" px={6} py={6}>
        <Modal.CloseButton />

        <Modal.Body>
          <VStack space={5}>

            <HStack bg="#f2f2f2" borderRadius="md" w="70%" alignSelf="center">
              <Pressable flex={1} onPress={() => setIsLogin(true)}>
                <Box py={2} bg={isLogin ? "#0f2a44" : "transparent"} alignItems="center">
                  <Text color={isLogin ? "white" : "#333"}>Sign in</Text>
                </Box>
              </Pressable>
              <Pressable flex={1} onPress={() => setIsLogin(false)}>
                <Box py={2} bg={!isLogin ? "#0f2a44" : "transparent"} alignItems="center">
                  <Text color={!isLogin ? "white" : "#333"}>Sign up</Text>
                </Box>
              </Pressable>
            </HStack>

            <Text textAlign="center" fontSize="2xl" fontWeight="bold">
              {isLogin ? "Sign in" : "Sign up"}
            </Text>

            {errors.api && (
              <Text color="red.500" textAlign="center">
                {errors.api}
              </Text>
            )}

            <VStack space={3}>
              {!isLogin && (
                <>
                  <Input
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => {
                      setUsername(text);
                      validateField("username", text);
                    }}
                    borderColor={errors.username ? "red.500" : "#e5e5e5"}
                  />
                  {errors.username && <Text color="red.500">{errors.username}</Text>}
                </>
              )}

              <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateField("email", text);
                }}
                borderColor={errors.email ? "red.500" : "#e5e5e5"}
              />
              {errors.email && <Text color="red.500">{errors.email}</Text>}

              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validateField("password", text);
                }}
                borderColor={errors.password ? "red.500" : "#e5e5e5"}
              />
              {errors.password && <Text color="red.500">{errors.password}</Text>}
            </VStack>

            {isLogin && (
              <HStack justifyContent="space-between">
                <Checkbox value="remember">Remember me</Checkbox>
                <Text color="#3bbc9b">Lost password?</Text>
              </HStack>
            )}

            <Button
              onPress={handleSubmit}
              isDisabled={!isFormValid() || loading}
            >
              {loading ? <Spinner color="white" /> : isLogin ? "Sign in" : "Sign up"}
            </Button>

          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}