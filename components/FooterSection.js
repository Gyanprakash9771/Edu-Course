import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Box, HStack, Image, Text, VStack } from "native-base";

export default function FooterSection({ isMobile }) {
  return (
    <Box bg="#ffffff" px={{ base: 4, md: 10 }} py={{ base: 16, md: 20 }} mt={20}>
      
      {/* TOP FOOTER */}
      <HStack flexWrap="wrap" justifyContent="space-between">
        
        {/* LOGO + DESCRIPTION */}
        <VStack
          width={{ base: "100%", sm: "48%", md: "23%" }}
          mb={8}
          space={5}
        >
          <HStack
            alignItems="center"
            space={2}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Image
              source={require("../assets/images/logo.png")}
              alt="logo"
              resizeMode="contain"
              style={{
                width: isMobile ? 120 : 150,
                height: isMobile ? 40 : 50,
              }}
            />
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="white"
            >
              Edubin
            </Text>
          </HStack>

          <Text
            color="black"
            fontSize={{ base: "md", md: "lg" }}
            lineHeight={{ base: 22, md: 26 }}
            textAlign={{ base: "center", md: "left" }}
          >
            Edubin perfect for online courses and other institutes. It’s a complete solution with lms features and functionalities. Lorem ipsum dolor sit amet
          </Text>
        </VStack>

        {/* COMPANY */}
        <VStack
          width={{ base: "100%", sm: "48%", md: "23%" }}
          mb={8}
          space={4}
        >
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} color="white">
            Company
          </Text>
          <Text color="black">About Us</Text>
          <Text color="black">Latest News</Text>
          <Text color="black">Term Conditions</Text>
          <Text color="black">Our Courses</Text>
          <Text color="black">Our Team</Text>
        </VStack>

        {/* INFORMATION */}
        <VStack
          width={{ base: "100%", sm: "48%", md: "23%" }}
          mb={8}
          space={4}
        >
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} color="white">
            Information
          </Text>
          <Text color="black">Tutorials</Text>
          <Text color="black">Documentation</Text>
          <Text color="black">Privacy Policy</Text>
          <Text color="black">FAQs</Text>
          <Text color="black">Support</Text>
        </VStack>

        {/* CONTACT */}
        <VStack
          width={{ base: "100%", sm: "48%", md: "23%" }}
          mb={8}
          space={4}
        >
          <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }} color="white">
            Contact Us
          </Text>

          <Text color="black">
            PO Box 16122 Collins Street West Victoria 8007 Melbourne Australia
          </Text>

          <Text color="black">
            <Text fontWeight="bold" color="white">Phone :</Text> +1 23-4567-8920
          </Text>

          <Text color="black">
            <Text fontWeight="bold" color="white">Email :</Text> info@yourmail.com
          </Text>

          {/* SOCIAL ICONS */}
          <HStack
            space={5}
            mt={3}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <FontAwesome name="facebook" size={24} color="#43b39c" />
            <FontAwesome name="twitter" size={24} color="#43b39c" />
            <Ionicons name="logo-youtube" size={24} color="#43b39c" />
            <Ionicons name="logo-whatsapp" size={24} color="#43b39c" />
            <FontAwesome name="linkedin" size={24} color="#43b39c" />
          </HStack>
        </VStack>
      </HStack>

      {/* BOTTOM LINE */}
      <Box mt={14} borderTopWidth={1} borderColor="gray.600" pt={6}>
        <Text textAlign="center" color="gray.400">
          © Copyright 2026 OI | Developed By OI.
        </Text>
      </Box>
    </Box>
  );
}