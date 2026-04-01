import { Box, HStack, Image, Text, VStack } from "native-base";

export default function TestimonialSection({ isMobile }) {
  const testimonials = [
    {
      text: "I am grateful for your wonderful course! Your tutors are the best, and I am completely satisfied with the level of professional teaching. I recommend these courses.",
      name: "James Smith",
      role: "CFO Apple Corp",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0022-150x150.jpg",
    },
    {
      text: "I am grateful for your wonderful course! Your tutors are the best, and I am completely satisfied with the level of professional teaching. I recommend these courses.",
      name: "Monica Blews",
      role: "Manager",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0199-150x150.jpeg",
    },
    {
      text: "I am grateful for your wonderful course! Your tutors are the best, and I am completely satisfied with the level of professional teaching. I recommend these courses.",
      name: "John Dowson",
      role: "Developer",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0015-150x150.jpg",
    },
  ];

  return (
    <Box mt={10} px={isMobile ? 4 : 10} marginLeft='5%' marginRight='5%'>
      
      {/* TITLE */}
      <Text
        textAlign="center"
        fontSize={isMobile ? "3xl" : "5xl"}   // 👈 increased
        fontWeight="bold"
        mb={10}   // 👈 more spacing
      >
        Student{" "}
        <Text color="#43b39c">Testimonial</Text>
      </Text>

      {/* CARDS */}
      <HStack
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {testimonials.map((item, index) => (
          <Box
            key={index}
            width={isMobile ? "100%" : "28%"}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="lg"
            p={6}                 // 👈 increased padding (height feel)
            mb={6}
            bg="white"
            alignItems="center"
            justifyContent="center"
            minHeight={isMobile ? 220 : 360}   // 👈 increased height
          >
            {/* TOP BORDER LINE */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              height={1.5}   // 👈 slightly thicker
              bg="#43b39c"
              borderTopRadius="lg"
            />

            <VStack space={5}>
              
              {/* TEXT */}
              <Text
                color="gray.600"
                fontSize={isMobile ? "md" : "2xl"}   // 👈 increased
                lineHeight={isMobile ? 22 : 26}
              >
                {item.text}
              </Text>

              {/* USER INFO */}
              <HStack alignItems="center" space={3}>
                <Image
                  source={{ uri: item.image }}
                  alt="user"
                  size={isMobile ? "md" : "lg"}   // 👈 slightly bigger
                  borderRadius="full"
                />

                <VStack>
                  <Text fontWeight="bold" fontSize={isMobile ? "md" : "lg"}>
                    {item.name}
                  </Text>
                  <Text fontSize={isMobile ? "sm" : "md"} color="gray.500">
                    {item.role}
                  </Text>
                </VStack>
              </HStack>

            </VStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}