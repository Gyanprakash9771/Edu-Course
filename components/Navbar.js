import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Box, Divider, HStack, Text, useBreakpointValue } from "native-base";

export default function Navbar() {

  // 👇 Hide on mobile, show on tablet/web
  const showNavbar = useBreakpointValue({
    base: false,
    md: true,
  });

  if (!showNavbar) return null;

  return (
    <Box safeAreaTop bg="#3bbc9b">
      {/* TOP BAR */}
      <Box
        bg="#3bbc9b"
        px={20}
        py={4}
        
      >
        <HStack justifyContent="space-between" alignItems="center">

          {/* LEFT */}
          <HStack alignItems="center" space={4}>
            
            <HStack alignItems="center" space={2}>
              <Ionicons name="mail-outline" size={17} color="white" />
              <Text color="white" fontSize="lg" fontWeight="500">
                yourmail@gmail.com
              </Text>
            </HStack>

            <Divider orientation="vertical" bg="white" thickness={0.6} h={4} />

            <HStack alignItems="center" space={2}>
              <Ionicons name="call-outline" size={17} color="white" />
              <Text color="white" fontSize="lg" fontWeight="500">
                01234-567890
              </Text>
            </HStack>

          </HStack>

          {/* RIGHT */}
          <HStack alignItems="center" space={3}>
            
            <Text color="white" fontSize="lg" fontWeight="500">
              Follow Us :
            </Text>

            <HStack space={3} alignItems="center">
              <FontAwesome name="facebook" size={14} color="white" />
              <FontAwesome name="twitter" size={14} color="white" />
              <FontAwesome name="youtube" size={14} color="white" />
              <FontAwesome name="instagram" size={14} color="white" />
            </HStack>

            <Divider orientation="vertical" bg="white" thickness={0.6} h={4} />

            <Text color="white" fontSize="lg" fontWeight="500">
              Login / Register
            </Text>

          </HStack>

        </HStack>
      </Box>
    </Box>
  );
}