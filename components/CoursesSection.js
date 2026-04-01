import React from "react";
import { Box, Text, Image, VStack, HStack, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function CoursesSection({ isMobile }) {
  const courses = [
    {
      title: "Complete Digital Marketing Course",
      category: "Business",
      level: "Beginner",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0091-590x430.jpeg",
      lessons: 17,
    },
    {
      title: "UX Design Thinking for Beginners",
      category: "UI/UX Design",
      level: "Expert",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0100-590x430.jpeg",
      lessons: 14,
    },
    {
      title: "30 Days Weight Loss Yoga & Fitness Course",
      category: "Health",
      level: "Beginner",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0099-590x430.jpeg",
      lessons: 14,
    },
    {
      title: "Learn JavaScript – Full Course for Beginners",
      category: "Programming",
      level: "Intermediate",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0097-590x430.jpeg",
      lessons: 15,
    },
  ];

  return (
    <Box mt={10} px={isMobile ? 4 : 10}>
      
      {/* HEADER */}
      <HStack justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize={isMobile ? "2xl" : "4xl"} fontWeight="bold">
          Most Popular{" "}
          <Text color="#43b39c">Courses</Text>
        </Text>

        {!isMobile && (
          <Button bg="#43b39c" borderRadius="md">
            View All Courses
          </Button>
        )}
      </HStack>

      {/* COURSE CARDS */}
      <HStack flexWrap="wrap" justifyContent="space-between">
        {courses.map((item, index) => (
          <Box
            key={index}
            width={isMobile ? "100%" : "23%"}
            mb={6}
            bg="white"
            borderRadius="xl"
            overflow="hidden"
            shadow={2}
          >
            {/* IMAGE */}
            <Box position="relative">
              <Image
                source={{ uri: item.image }}
                alt="course"
                height={150}
                width="100%"
              />

              {/* LEVEL TAG */}
              <Box
                position="absolute"
                top={2}
                left={2}
                bg="red.400"
                px={2}
                py={1}
                borderRadius="sm"
              >
                <Text color="white" fontSize="xs">
                  {item.level}
                </Text>
              </Box>

              {/* BOOKMARK ICON */}
              <Box
                position="absolute"
                top={2}
                right={2}
                bg="white"
                p={1}
                borderRadius="full"
              >
                <Ionicons name="bookmark-outline" size={16} />
              </Box>
            </Box>

            {/* CONTENT */}
            <VStack p={3} space={2}>
              {/* CATEGORY */}
              <Text color="#43b39c" fontSize="xs">
                {item.category}
              </Text>

              {/* TITLE */}
              <Text fontWeight="bold">
                {item.title}
              </Text>

              {/* RATING */}
              <Text color="orange.400">★★★★★ (5.0)</Text>

              {/* LESSONS */}
              <Text fontSize="xs" color="gray.500">
                📚 {item.lessons} Lessons
              </Text>

              {/* AUTHOR */}
              <Text fontSize="xs">
                By : <Text color="#43b39c">varshik</Text>
              </Text>

              {/* PRICE */}
              <Text color="red.500" fontWeight="bold">
                Free
              </Text>
            </VStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}