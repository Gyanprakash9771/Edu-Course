import { LinearGradient } from "expo-linear-gradient";
import { Box, Button, HStack, Image, Text, VStack } from "native-base";

export default function MainHeroSection({ isMobile }) {
  return (
    <LinearGradient
      colors={
        isMobile
          ? ["#ffffff", "#ffffff"]   // 👈 white for mobile
          : ["#f7eced", "#ffffff"]   // 👈 original for desktop
      }
      start={[0, 0]}
      end={[1, 0]}
      style={{
        paddingVertical: isMobile ? 160 : 180,
        marginTop: isMobile ? 10 : 30,
        zIndex: 0,

      }}
    >
      <Box px={isMobile ? 4 : 10}>
        <HStack
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT SIDE */}
          <VStack
            flex={1}
            space={4}
            alignItems={isMobile ? "center" : "flex-start"}   // 👈 ADD
            textAlign={isMobile ? "center" : "left"}          // 👈 ADD
          >

            {/* HOT BADGE */}
            <HStack
              alignItems="center"
              bg="white"
              borderRadius="full"
              px={3}
              py={1}
              alignSelf={isMobile ? "center" : "flex-start"}   // 👈 CHANGE
            >
              <Box bg="#43b39c" px={2} py={1} borderRadius="full">
                <Text color="white" fontSize="xs">Hot</Text>
              </Box>

              <Text ml={2} fontSize="xs">
                2500+ Best Online Courses From Edubin
              </Text>
            </HStack>

            {/* HEADING */}
            <Text
              fontSize={isMobile ? "4xl" : "6xl"}
              fontWeight="bold"
              color="#0f2a44"
              lineHeight={isMobile ? 60 : 70}
              textAlign={isMobile ? "left" : "left"}   // 👈 ADD
            >
              Explore{" "}
              <Text color="#43b39c">better skills</Text>
              {"\n"}
              through thousand{"\n"}online courses
            </Text>

            {/* BUTTON */}
            <Button
              bg="#43b39c"
              width={isMobile ? "60%" : "30%"}
              borderRadius="md"
              alignSelf={isMobile ? "flex-start" : "flex-start"}   // 👈 ADD
            >
              View All Courses
            </Button>
          </VStack>


          {/* RIGHT SIDE IMAGES */}
          <Box
            flex={1}
            mt={isMobile ? 6 : 0}
            alignItems="center"
          >
            {isMobile ? (
              // MOBILE → Vertical (one below another)
              <VStack space={4} alignItems="center">
                <Image
                  source={{
                    uri: "https://edutest.gpcfindia.org/wp-content/uploads/2024/03/EDUBIN0517.jpg",
                  }}
                  alt="img1"
                  width={250}
                  height={450}
                  borderRadius="full"
                />

                <Image
                  source={{
                    uri: "https://edutest.gpcfindia.org/wp-content/uploads/2024/03/EDUBIN0518.jpg",
                  }}
                  alt="img2"
                  width={250}
                  height={450}
                  borderRadius="full"
                />
              </VStack>
            ) : (
              // DESKTOP → Side by side
              <HStack space={150} >
                <Image
                  source={{
                    uri: "https://edutest.gpcfindia.org/wp-content/uploads/2024/03/EDUBIN0517.jpg",
                  }}
                  alt="img1"
                  width={280}
                  height={480}
                  borderRadius="full"
                />

                <Image
                  source={{
                    uri: "https://edutest.gpcfindia.org/wp-content/uploads/2024/03/EDUBIN0518.jpg",
                  }}
                  alt="img2"
                  width={280}
                  height={480}
                  top={isMobile ? 0 : 120}
                  borderRadius="full"
                />
              </HStack>
            )}
          </Box>
        </HStack>
      </Box>
    </LinearGradient>
  );
}