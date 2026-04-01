import { Box, HStack, Image, Text } from "native-base";

export default function PartnersSection({ isMobile }) {
  const partners = [
    require("../assets/images/logo1.png"),
    require("../assets/images/logo2.png"),
    require("../assets/images/logo3.png"),
    require("../assets/images/logo4.png"),
    require("../assets/images/logo5.png"),
    require("../assets/images/logo6.png"),
  ];

  return (
    <Box
      mt={10}
      px={isMobile ? 4 : 10}
      py={isMobile ? 8 : 12}
      bg="#ffffff"
    >
      {/* HEADING */}
      <Text
        textAlign="center"
        fontSize={isMobile ? "md" : "xl"}
        fontWeight="semibold"
        mb={8}
        color="#1c2b3a"
      >
        Our vast mentor network includes experts from leading companies like
      </Text>

      {/* LOGOS */}
      <HStack
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        {partners.map((logo, index) => (
          <Box
            key={index}
            width={isMobile ? "30%" : "15%"}
            alignItems="center"
            mb={isMobile ? 6 : 0}
          >
            <Image
              source={logo}
              alt="partner"
              resizeMode="contain"
              height={79}
              width="100%"
            />
          </Box>
        ))}
      </HStack>
    </Box>
  );
}