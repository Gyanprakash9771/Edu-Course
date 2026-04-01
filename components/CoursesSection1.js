import React from "react";
import { Box, Text, Image, VStack, HStack, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function CoursesSection1({ isMobile }) {
  const courses = [
    {
      title: "Basic English Speaking and Grammar",
      category: "Development",
      level: "All Levels",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0096-590x430.jpeg",
      lessons: 14,
      categoryColor: "#f8caca",
    },
    {
      title: "CSS Flexbox Tutorial for Beginners",
      category: "Technology",
      level: "Intermediate",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0098-590x430.jpeg",
      lessons: 15,
      categoryColor: "#cde8d5",
    },
    {
      title: "The Complete React Web Developer Course",
      category: "Development",
      level: "Beginner",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0082-590x430.jpeg",
      lessons: 13,
      categoryColor: "#dcd3f5",
    },
    {
      title: "C Programming Tutorials for Beginners",
      category: "Programming",
      level: "Intermediate",
      image: "https://edutest.gpcfindia.org/wp-content/uploads/2024/01/EDUBIN0095-590x430.jpeg",
      lessons: 14,
      categoryColor: "#cfe8ec",
    },
  ];

  return (
    <Box mt={10} px={isMobile ? 4 : 10}>
      
      

      {/* CARDS */}
      <HStack flexWrap="wrap" justifyContent="space-between">
        {courses.map((item, index) => (
          <Box
            key={index}
            width={isMobile ? "100%" : "23%"}
            mb={6}
          >
            {/* IMAGE */}
            <Box position="relative">
              <Image
                source={{ uri: item.image }}
                alt="course"
                height={160}
                width="100%"
                borderRadius="lg"
              />

              {/* LEVEL BADGE */}
              <Box
                position="absolute"
                top={2}
                left={2}
                bg="red.400"
                px={3}
                py={1}
                borderRadius="sm"
              >
                <Text color="white" fontSize="xs">
                  {item.level}
                </Text>
              </Box>

              {/* BOOKMARK */}
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
            <VStack mt={3} space={2}>
              
              {/* CATEGORY TAG */}
              <Box
                bg={item.categoryColor}
                alignSelf="flex-start"
                px={2}
                py={1}
                borderRadius="md"
              >
                <Text fontSize="xs">{item.category}</Text>
              </Box>

              {/* TITLE */}
              <Text fontWeight="bold">
                {item.title}
              </Text>

              {/* RATING */}
              <Text color="orange.400">★★★★★ (5.00/3)</Text>

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