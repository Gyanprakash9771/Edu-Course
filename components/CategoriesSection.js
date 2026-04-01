import { Box, HStack, Image, Text, VStack } from "native-base";

export default function CategoriesSection({ isMobile }) {
  const categories = [
    {
      name: "Business",
      img: require("../assets/images/business.png"),
      bg: "#f3e8e2",
    },
    {
      name: "Chemistry",
      img: require("../assets/images/chemistry.png"),
      bg: "#e3f1ef",
    },
    {
      name: "Artificial Intelligent",
      img: require("../assets/images/ai.png"),
      bg: "#ece9f6",
    },
    {
      name: "Development",
      img: require("../assets/images/dev.png"),
      bg: "#f5efe6",
    },
    {
      name: "Science",
      img: require("../assets/images/science.png"),
      bg: "#f3e8e2",
    },
    {
      name: "Engineering",
      img: require("../assets/images/engineering.png"),
      bg: "#e6f4ea",
    },
  ];

  return (
    <Box mt={10} px={isMobile ? 4 : 10}>
      {/* TITLE */}
      <Text
        textAlign="center"
        fontSize={isMobile ? "2xl" : "4xl"}
        fontWeight="bold"
        mb={8}
      >
        Top{" "}
        <Text color="#43b39c" fontWeight="bold">
          Categories
        </Text>
      </Text>

      {/* CATEGORY LIST */}
      <HStack flexWrap="wrap" justifyContent="space-between">
        {categories.map((item, index) => (
          <VStack
            key={index}
            alignItems="center"
            width={isMobile ? "48%" : "15%"}
            mb={8}
          >
            {/* CIRCLE WITH IMAGE */}
            <Box
              bg={item.bg}
              width={90}
              height={90}
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              mb={3}
            >
              <Image
                source={item.img}
                alt={item.name}
                size="sm"
                resizeMode="contain"
              />
            </Box>

            {/* LABEL */}
            <Text fontWeight="semibold">{item.name}</Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}