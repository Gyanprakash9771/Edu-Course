import { Box, Text, VStack } from "native-base";
import { ImageBackground } from "react-native";

export default function CourseBanner({ isMobile }) {
  return (
    <Box height={isMobile ? 200 : 450} width="100%">
      
      <ImageBackground
        source={{
          uri: "https://edutest.gpcfindia.org/wp-content/uploads/2026/03/HED97HQ.jpeg",
        }}
        style={{ flex: 1, justifyContent: "center" }}
      >
        {/* ✅ FIXED OVERLAY */}
        <Box
          pointerEvents="none"   // 🔥 IMPORTANT FIX
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0,0,0,0.6)"
        />

        {/* CONTENT */}
        <VStack alignItems="center" space={2}>
          <Text
            color="white"
            fontSize={isMobile ? "2xl" : "6xl"}
            fontWeight="bold"
          >
            Course Grid Layout
          </Text>

          <Text color="white" fontSize={isMobile ? "sm" : "xl"} bold>
            Home {" > "}{" "}
            <Text color="#43b39c">Course Grid Layout</Text>
          </Text>
        </VStack>
      </ImageBackground>
    </Box>
  );
}