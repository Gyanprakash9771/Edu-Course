import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import courses from "../data/courses"; // ✅ ADDED

export default function CourseGrid({ isMobile }) {
  const navigation = useNavigation();

  return (
    <Box px={{ base: 4, md: 10 }} mt={6}>
      
      <HStack flexWrap="wrap" justifyContent="center">
        {courses.map((course, index) => (
          <Box
            key={index}
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
            {/* CLICKABLE IMAGE */}
            <Pressable
              onPress={() =>
                navigation.navigate("CourseDetails", { id: index })
              }
            >
              <Box position="relative">
                <Image
                  source={{ uri: course.image }}
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

            {/* CONTENT */}
            <VStack p={5} space={3}>
              <Text color="#43b39c" fontSize="sm">
                {course.category}
              </Text>

              {/* CLICKABLE TITLE */}
              <Pressable
                onPress={() =>
                  navigation.navigate("CourseDetails", { id: index })
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
                📚 {course.lessons}
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

      {/* PAGINATION */}
      <HStack justifyContent="center" mt={4} space={2}>
        <Box bg="#43b39c" px={3} py={1} borderRadius="full">
          <Text color="white">1</Text>
        </Box>
        <Box px={3} py={1} borderRadius="full">
          <Text>2</Text>
        </Box>
        <Box px={3} py={1} borderRadius="full">
          <Text>3</Text>
        </Box>
      </HStack>
    </Box>
  );
}