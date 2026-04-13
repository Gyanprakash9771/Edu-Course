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

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    API.get("/courses")
      .then((res) => {
        console.log("DATA:", res.data);
        setCourses(res.data);
      })
      .catch((err) => console.log("ERROR:", err));
  }, []);

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  return (
    <Box px={{ base: 4, md: 10 }} mt={6}>
      <HStack flexWrap="wrap" justifyContent="center">
        {currentCourses.map((course) => (  // ✅ ONLY CHANGE HERE
          <Box
            key={course._id}
            width={{
              base: "100%",
              sm: "48%",
              md: "30%",
            }}
            mx={{
              base: 0,
              sm: "1%",
              md: "1.5%",
            }}
            mb={8}
            mt={{
              base: 4,
              md: 20,
            }}
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            shadow={3}
            minHeight={{
              base: 380,
              md: 530,
            }}
          >
           <Pressable
              onPressIn={() =>
                navigation.navigate("CourseDetails", { id: course._id })
              }
            >
              <Box position="relative">
                <Image
                  source={{ uri: `${BASE_URL}/uploads/${course.image}` }}
                  alt="course"
                  height={220}
                  width="100%"
                />

                <Box
                  position="absolute"
                  top={3}
                  left={3}
                  bg="red.400"
                  px={3}
                  py={1}
                  borderRadius="md"
                >
                  <Text color="white" fontSize="xs">
                    {course.level}
                  </Text>
                </Box>

                <Box
                  position="absolute"
                  top={3}
                  right={3}
                  bg="white"
                  p={2}
                  borderRadius="full"
                >
                  <Ionicons name="bookmark-outline" size={18} />
                </Box>
              </Box>
            </Pressable>

            <VStack p={5} space={3}>
             <Text color="#43b39c" fontSize="sm">
  {course.category?.name || course.category}
</Text>

              <Pressable
                onPress={() =>
                  navigation.navigate("CourseDetails", { id: course._id }) // ✅ fixed
                }
              >
                <Text fontWeight="bold" fontSize="md">
                  {course.title}
                </Text>
              </Pressable>

              <Text color="orange.400" fontSize="sm">
                ★★★★★ (5.0)
              </Text>

              <Text fontSize="sm" color="gray.500">
                📚 {course.lessons} Lessons
              </Text>

              <Text fontSize="sm">
                By : <Text color="#43b39c">varshik</Text>
              </Text>

              <Text color="red.500" fontWeight="bold" fontSize="md">
                Free
              </Text>
            </VStack>
          </Box>
        ))}
      </HStack>

      {/* ✅ PAGINATION UI */}
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