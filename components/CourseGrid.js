import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import API from "../services/api";

// ✅ FIX: define BASE_URL
const BASE_URL = "https://edutest-backend-0r41.onrender.com";

export default function CourseGrid({ isMobile }) {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;


  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        console.log("DATA:", res.data);
        setCourses(res.data);
      })
      .catch((err) => console.log("ERROR:", err));
  }, []);


  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  return (
    <Box px={{ base: 4, md: 10 }} mt={6}>
      <HStack flexWrap="wrap" justifyContent="center">
        {currentCourses.map((course) => (
          <Box
  key={course._id}
  width={{ base: "100%", sm: "48%", md: "30%" }}
  mx={{ base: 0, sm: "1%", md: "1.5%" }}
  mb={6}
  bg="white"
  borderRadius="xl"
  overflow="hidden"
  shadow={2}
>
  <Pressable
    onPress={() =>
      navigation.navigate("CourseDetails", { id: course._id })
    }
  >
    {/* IMAGE */}
    <Box position="relative">
      <Image
        source={{ uri: `${BASE_URL}/uploads/${course.image}` }}
        alt="course"
        height={180}
        width="100%"
      />

      {/* LEVEL TAG */}
      <Box
        position="absolute"
        top={3}
        left={3}
        bg="#43b39c"
        px={3}
        py={1}
        borderRadius="md"
      >
        <Text color="white" fontSize="xs" fontWeight="bold">
          {course.level}
        </Text>
      </Box>

      {/* BOOKMARK */}
      <Box
        position="absolute"
        top={3}
        right={3}
        bg="white"
        p={2}
        borderRadius="full"
        shadow={1}
      >
        <Ionicons name="bookmark-outline" size={16} />
      </Box>
    </Box>
  </Pressable>

  {/* CONTENT */}
  <VStack p={4} space={2}>
    <Text color="#43b39c" fontSize="xs">
      {course.category?.name || course.category}
    </Text>

    <Text fontWeight="bold" fontSize="md" numberOfLines={2}>
      {course.title}
    </Text>

    {/* RATING */}
    <Text color="orange.400" fontSize="xs">
      ★★★★★ <Text color="gray.500">(5.0)</Text>
    </Text>

    {/* LESSONS + PRICE */}
    <HStack justifyContent="space-between" alignItems="center">
      <Text fontSize="xs" color="gray.500">
        📚 {course.lessons} Lessons
      </Text>

      <Text color="#43b39c" fontWeight="bold" fontSize="sm">
        Free
      </Text>
    </HStack>

    {/* INSTRUCTOR */}
    <Text fontSize="xs" color="gray.500">
      {course.instructor}
    </Text>
  </VStack>
</Box>
        ))}
      </HStack>


      <HStack justifyContent="center" mt={4} space={2}>
        {[...Array(totalPages)].map((_, i) => (
          <Pressable key={i} onPress={() => setCurrentPage(i + 1)}>
            <Box
              bg={currentPage === i + 1 ? "#43b39c" : "transparent"}
              px={3}
              py={1}
              borderRadius="full"
            >
              <Text color={currentPage === i + 1 ? "white" : "black"}>
                {i + 1}
              </Text>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
}