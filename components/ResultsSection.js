import { Box, HStack, Image, Text, VStack } from "native-base";

export default function ResultsSection({ isMobile }) {
  return (
    <Box
      mt={10}
      px={isMobile ? 4 : 20}
      py={isMobile ? 8 : 12}
      bg="#e9f2f1"
      minHeight={isMobile ? "auto" : 700}
    >
      <HStack
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
      >
        {isMobile ? (
          <>
            {/* LEFT CONTENT FIRST */}
            <VStack space={4}>
              <Text
                fontSize={isMobile ? "3xl" : "5xl"}
                fontWeight="bold"
                color="#0f2a44"
              >
                Our results{" "}
                <Text color="#43b39c">reflect</Text> the passion,
                {"\n"}handwork and efforts
              </Text>

              <Text color="gray.500" fontSize={isMobile ? "md" : "xl"}>
                Edubin is a reliable kidcare platform that matches parents Perfect
                for Online Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse suscipit sagittis leo sit amet um dolor sit amecond
                imentum esti
              </Text>

              <VStack space={2} mt={2}>
                <HStack alignItems="center" space={2}>
                  <Box width={2} height={2} borderRadius="full" bg="#43b39c" />
                  <Text fontSize={isMobile ? "md" : "2xl"} bold>
                    Unlimited access to 25,000+ top Udemy courses,
                  </Text>
                </HStack>

                <HStack alignItems="center" space={2}>
                  <Box width={2} height={2} borderRadius="full" bg="#43b39c" />
                  <Text fontSize={isMobile ? "md" : 25} bold>
                    International course collection in 14 languages
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            {/* IMAGE AFTER CONTENT */}
            <Box alignItems="center" mt={6}>
              <Image
                source={{
                  uri: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0206.png",
                }}
                alt="student"
                resizeMode="cover"
                style={{
                  width: 300,
                  height: 250,
                }}
              />
            </Box>
          </>
        ) : (
          <>
            {/* LEFT CONTENT */}
            <VStack flex={1} space={4}>
              <Text
                fontSize={isMobile ? "3xl" : "5xl"}
                fontWeight="bold"
                color="#0f2a44"
              >
                Our results{" "}
                <Text color="#43b39c">reflect</Text> the passion,
                {"\n"}handwork and efforts
              </Text>

              <Text color="gray.500" fontSize={isMobile ? "md" : "xl"}>
                Edubin is a reliable kidcare platform that matches parents Perfect
                for Online Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse suscipit sagittis leo sit amet um dolor sit amecond
                imentum esti
              </Text>

              <VStack space={2} mt={2}>
                <HStack alignItems="center" space={2}>
                  <Box width={2} height={2} borderRadius="full" bg="#43b39c" />
                  <Text fontSize={isMobile ? "md" : "2xl"} bold>
                    Unlimited access to 25,000+ top Udemy courses,
                  </Text>
                </HStack>

                <HStack alignItems="center" space={2}>
                  <Box width={2} height={2} borderRadius="full" bg="#43b39c" />
                  <Text fontSize={isMobile ? "md" : 25} bold>
                    International course collection in 14 languages
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            {/* RIGHT IMAGE */}
            <Box flex={1} alignItems="center">
              <Image
                source={{
                  uri: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0206.png",
                }}
                alt="student"
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: 650,
                }}
              />
            </Box>
          </>
        )}
      </HStack>
    </Box>
  );
}