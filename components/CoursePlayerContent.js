import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Box, HStack, Pressable, Text } from "native-base";
import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import API from "../services/api";

export default function CoursePlayerContent({ isMobile }) {
  const route = useRoute();
  const { id } = route.params;

  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);

      const first = res.data.sections?.[0]?.lessons?.[0];
      if (first) {
        setVideo(first.video);
        setTitle(first.title);
        setActiveIndex("0-0");
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <Text mt={5} textAlign="center">Loading...</Text>;
  }

  const flatLessons = course.sections.flatMap((sec, i) =>
    sec.lessons.map((lec, j) => ({
      ...lec,
      key: `${i}-${j}`,
    }))
  );

  const currentIndex = flatLessons.findIndex(
    (l) => l.key === activeIndex
  );

  const goToLesson = (lesson) => {
    setVideo("");
    setTimeout(() => setVideo(lesson.video), 50);
    setTitle(lesson.title);
    setActiveIndex(lesson.key);
  };

  return (
    <Box flexDirection={isMobile ? "column" : "row"} flex={1}>

      {/* LEFT SIDEBAR (KEEP YOUR EXISTING ONE HERE) */}
      
      {/* RIGHT SIDE */}
      <Box flex={1} bg="#f1f5f9">

        {/* 🔥 HEADER */}
        <HStack
          bg="#0f172a"
          px={4}
          py={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack alignItems="center" space={3}>
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text color="white" fontWeight="bold">
              {course.title}
            </Text>
          </HStack>

          <HStack alignItems="center" space={3}>
            <Pressable
              onPress={() => {
                if (!completed.includes(activeIndex)) {
                  setCompleted([...completed, activeIndex]);
                }
              }}
            >
              <HStack
                borderWidth={1}
                borderColor="white"
                px={3}
                py={1}
                borderRadius={6}
                alignItems="center"
                space={1}
              >
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text color="white">Mark as Complete</Text>
              </HStack>
            </Pressable>

            <Ionicons name="close" size={22} color="white" />
          </HStack>
        </HStack>

        {/* 🔥 CONTENT SCROLL */}
        <ScrollView>

          {/* 🎬 VIDEO */}
          <Box height={isMobile ? 220 : 450} bg="black">
            {video && (
              Platform.OS === "web" ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${video}?autoplay=1`}
                  style={{ border: "none" }}
                  allowFullScreen
                />
              ) : (
                <WebView source={{ uri: video }} style={{ flex: 1 }} />
              )
            )}
          </Box>

          {/* 📄 DESCRIPTION */}
          <Box bg="white" p={5}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {title}
            </Text>

            <Text color="#555">
              The idea of a summary is a short text to prepare students for the
              activities within the topic or week. The text is shown on the
              course page under the topic name.
            </Text>
          </Box>

          {/* ⬅️➡️ NAVIGATION */}
          <HStack
            justifyContent="center"
            space={4}
            py={4}
            bg="#e2e8f0"
          >
            <Pressable
              onPress={() =>
                currentIndex > 0 &&
                goToLesson(flatLessons[currentIndex - 1])
              }
            >
              <Box
                px={4}
                py={2}
                bg="#cbd5f5"
                borderRadius={6}
              >
                <Text>← Previous</Text>
              </Box>
            </Pressable>

            <Pressable
              onPress={() =>
                currentIndex < flatLessons.length - 1 &&
                goToLesson(flatLessons[currentIndex + 1])
              }
            >
              <Box
                px={4}
                py={2}
                bg="#cbd5f5"
                borderRadius={6}
              >
                <Text>Next →</Text>
              </Box>
            </Pressable>
          </HStack>
        </ScrollView>

        {/* 🔝 FLOAT BUTTON */}
        <Pressable
          position="absolute"
          bottom={5}
          right={5}
          bg="#22c55e"
          p={3}
          borderRadius={50}
        >
          <Ionicons name="arrow-up" size={20} color="white" />
        </Pressable>
      </Box>
    </Box>
  );
}