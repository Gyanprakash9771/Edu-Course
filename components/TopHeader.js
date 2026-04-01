import React from "react";
import { Box, Text, HStack } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function TopHeader({ isMobile }) {
  return (
    <Box
      bg="#07f5c5"
      py={6}
      px={isMobile ? 4 : 10}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
    
      <HStack space={4}>
        <Text color="white" fontSize="lg" bold>
          📞 +91 98765 43210
        </Text>
        <Text color="white" fontSize="lg" bold>
            |
          </Text>
        {!isMobile && (
          <Text color="white" fontSize="lg" bold>
            ✉️ info@edutest.com
          </Text>
        )}
      </HStack>

      
      {!isMobile && (
        <HStack space={4} alignItems="center">
             <Text color="white" fontSize="lg" bold>
            Follow Us:
          </Text>

          <Ionicons name="logo-instagram" size={20} color="white" />
          <FontAwesome name="facebook" size={20} color="white" />
          <FontAwesome name="twitter" size={20} color="white" />
          <Text color="white" fontSize="lg" bold>
            |
          </Text>
          <Text color="white" fontSize="lg" bold>
            Login
          </Text>
          <Text color="white" fontSize="lg" bold>
            Register
          </Text>

        
        </HStack>
      )}
    </Box>
  );
}