import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";

import allCourses from "../../data/courses";

export default function RelatedCourses({ isMobile, currentCourseId }) {

  // ✅ RANDOM + EXCLUDE CURRENT COURSE (ONLY CHANGE)
  const getRandomCourses = (data, count = 3) => {
    const filtered = data.filter(item => item.id !== currentCourseId);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const courses = getRandomCourses(allCourses, 3);

  return (
    <Box bg="#f8f9fb" py={12} px={isMobile ? 4 : 10}>

      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={8}>
        Related Courses
      </Text>

      <HStack flexWrap="wrap" justifyContent="space-between">
        {courses.map((item, index) => (
          <CourseCard key={index} item={item} isMobile={isMobile} />
        ))}
      </HStack>

    </Box>
  );
}

/* 🔹 CARD (NO UI CHANGE, ONLY NAV FIX ALREADY PRESENT) */
const CourseCard = ({ item, isMobile }) => {

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("CourseDetails", { id: item.id })
      }
      width={isMobile ? "100%" : "32%"}
      mb={isMobile ? 6 : 0}
    >
      <Box
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        shadow={3}
        _hover={{ transform: [{ scale: 1.02 }] }}
      >

        <Box position="relative">
          <Image source={{ uri: item.image }} height={180} width="100%" />

          <Box
            position="absolute"
            top={3}
            left={3}
            bg="#43b39c"
            px={3}
            py={1}
            borderRadius="md"
          >
            <Text color="white" fontSize="xs">
              {item.category}
            </Text>
          </Box>

          <Box
            position="absolute"
            top={3}
            right={3}
            bg="white"
            p={2}
            borderRadius="full"
            shadow={2}
          >
            <Ionicons name="bookmark-outline" size={16} />
          </Box>
        </Box>

        <VStack p={4} space={3}>

          <HStack alignItems="center" space={1}>
            {[...Array(5)].map((_, i) => (
              <Ionicons key={i} name="star" size={14} color="#fbbf24" />
            ))}
            <Text fontSize="xs" color="gray.500" ml={1}>
              (5.00/3)
            </Text>
          </HStack>

          <Text fontWeight="bold" fontSize="md">
            {item.title}
          </Text>

          <HStack alignItems="center" space={2}>
            <Box bg="gray.200" p={2} borderRadius="full">
              <Ionicons name="person" size={12} />
            </Box>
            <Text color="gray.500" fontSize="sm">
              varshik
            </Text>
          </HStack>

          <Box height={1} bg="gray.100" />

          <HStack justifyContent="space-between" alignItems="center">
            <HStack alignItems="center" space={2}>
              <Ionicons name="book-outline" size={14} color="#43b39c" />
              <Text fontSize="sm" color="gray.500">
                {item.lessons || "15 Lessons"}
              </Text>
            </HStack>

            <Text color="#43b39c" fontWeight="bold">
              Free
            </Text>
          </HStack>

        </VStack>
      </Box>
    </Pressable>
  );
};