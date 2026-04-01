import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, Text, VStack } from "native-base";

export default function HeroSection({ isMobile }) {
  return (
    <Box
      mt={isMobile ? 200:-5}
      mb={10}
      mx={isMobile ? -5 : 10}
      bg="#43b39c"
      borderRadius="2xl"
      py={isMobile ? 40 : 20}
      minHeight={isMobile ? 400 : 280}  
    >
      <HStack
  flex={1}
  flexDirection={isMobile ? "column" : "row"}
  justifyContent="space-evenly"
  alignItems={isMobile ? "stretch" : "center"}
  space={isMobile ? 6 : 0}
>
        {/* ITEM 1 */}
        <VStack alignItems="center" flex={1}>
          <Icon
            as={Ionicons}
            name="laptop-outline"
            size="3xl"
            color="white"
            mb={2}
          />
          <Text color="white" fontSize='3xl' bold textAlign="center">
            Explore 100,000{"\n"}online courses
          </Text>
        </VStack>

        {/* ITEM 2 */}
        <VStack alignItems="center" flex={1}>
          <Icon
            as={FontAwesome5}
            name="user-graduate"
            size="3xl"
            color="white"
            mb={2}
          />
          <Text color="white" fontSize="3xl" bold textAlign="center">
            Find the right{"\n"}instructor for you
          </Text>
        </VStack>

        {/* ITEM 3 */}
        <VStack alignItems="center" flex={1}>
          <Icon
            as={Ionicons}
            name="play-circle-outline"
            size="3xl"
            color="white"
            mb={2}
          />
          <Text color="white" fontSize="3xl" bold textAlign="center">
            Lifetime access{"\n"}Learn on your schedule
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}