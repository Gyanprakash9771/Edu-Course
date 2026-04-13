import { Box, Text, VStack } from "native-base"; // ✅ added VStack
import { ImageBackground } from "react-native";

export default function CoursePlayerHero({ isMobile }) {
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
          pointerEvents="none"
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
  Learn & Watch
</Text>
         <Text color="white" fontSize={isMobile ? "sm" : "xl"} bold>
  Home {" > "} Course {" > "}
  <Text color="#43b39c">Player</Text>
</Text>
        </VStack>
      </ImageBackground>
    </Box>
  );
}