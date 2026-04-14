import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
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
  const [openSections, setOpenSections] = useState({ 0: true });

  const toggleSection = (i) => {
    setOpenSections((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

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
    <Box flexDirection="row" flex={1} bg="#f1f5f9">

      {/* ✅ SIDEBAR FIXED */}
      <ScrollView
        style={{
          width: 320,
          minWidth: 320,
          maxWidth: 320,
          backgroundColor: "#f8f9fa",
          borderRightWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Box px={3} py={3}>
          <Text fontSize="md" mb={2}>Course Content</Text>

          {course.sections?.map((sec, i) => {
            const total = sec.lessons?.length || 0;
            const done = sec.lessons.filter((_, j) =>
              completed.includes(`${i}-${j}`)
            ).length;

            return (
              <Box key={i} mb={3}>
                <Pressable onPress={() => toggleSection(i)}>
                  <HStack
                    justifyContent="space-between"
                    px={4}
                    py={3}
                    bg="#e9ecef"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {sec.title}
                    </Text>

                    <HStack space={2}>
                      <Text fontSize="xs">{done}/{total}</Text>
                      <Ionicons
                        name={openSections[i] ? "chevron-up" : "chevron-down"}
                        size={14}
                      />
                    </HStack>
                  </HStack>
                </Pressable>

                {openSections[i] && (
                  <VStack>
                    {sec.lessons?.map((lec, j) => {
                      const key = `${i}-${j}`;
                      const isActive = activeIndex === key;
                      const isDone = completed.includes(key);

                      return (
                        <Pressable key={j} onPress={() => goToLesson({ ...lec, key })}>
                          <HStack
                            px={4}
                            py={2.5}
                            justifyContent="space-between"
                            bg={isActive ? "#dee2e6" : "transparent"}
                          >
                            <HStack space={2} flex={1}>
                              <Ionicons
                                name={isDone ? "checkmark-circle" : "play-outline"}
                                size={16}
                                color={isDone ? "#22c55e" : "#666"}
                              />
                              <Text fontSize="sm" numberOfLines={1}>
                                {lec.title}
                              </Text>
                            </HStack>

                            <Text fontSize="xs">{lec.duration || "03:54"}</Text>
                          </HStack>
                        </Pressable>
                      );
                    })}
                  </VStack>
                )}
              </Box>
            );
          })}
        </Box>
      </ScrollView>

      {/* ✅ RIGHT SIDE FIXED */}
      <Box flex={1} alignItems="center">

        {/* HEADER */}
        <HStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={10}
          bg="rgba(0,0,0,0.8)"
          px={6}
          py={3.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack space={3} alignItems="center">
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text color="white" fontWeight="bold">
              {course.title}
            </Text>
          </HStack>

          <HStack space={3} alignItems="center">
            <Pressable
              onPress={() => {
                if (!completed.includes(activeIndex)) {
                  setCompleted([...completed, activeIndex]);
                }
              }}
            >
              <Box borderWidth={1} borderColor="white" px={3} py={1} borderRadius={6}>
                <Text color="white">Mark as Complete</Text>
              </Box>
            </Pressable>

            <Ionicons name="close" size={22} color="white" />
          </HStack>
        </HStack>

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 0,
            paddingBottom: 40,
          }}
        >

          {/* VIDEO FIXED */}
          <Box
            width="100%"
            maxWidth={1200}
            height={isMobile ? 220 : 500}
            borderRadius={10}
            overflow="hidden"
            bg="black"
            mt={-60}
          >
            {video && (
              Platform.OS === "web" ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`${video}?autoplay=1`}
                  style={{ border: "none" }}
                
                />
              ) : (
                <WebView source={{ uri: video }} style={{ flex: 1 }} />
              )
            )}
          </Box>

          {/* CONTENT */}
          <Box
            bg="white"
            px={6}
            py={5}
            mt={3}
            borderRadius={8}
            width="100%"
            maxWidth={1000}
          >
            <Text fontSize="xl" fontWeight="bold">
              {title}
            </Text>

            <Text mt={3} color="#555">
              The idea of a summary is a short text to prepare students for the
              activities within the topic or week.
            </Text>
          </Box>

          {/* NAV */}
          <HStack
            justifyContent="center"
            space={4}
            py={6}
            mt={2}
            borderBottomRadius={8}
            bg="#e2e8f0"
            width="100%"
            maxWidth={1000}
          >
            <Pressable
              onPress={() =>
                currentIndex > 0 &&
                goToLesson(flatLessons[currentIndex - 1])
              }
            >
              <Box bg="#cbd5f5" px={5} py={2} borderRadius={6}>
                <Text>← Previous</Text>
              </Box>
            </Pressable>

            <Pressable
              onPress={() =>
                currentIndex < flatLessons.length - 1 &&
                goToLesson(flatLessons[currentIndex + 1])
              }
            >
              <Box bg="#cbd5f5" px={6} py={2.5} borderRadius={6}>
                <Text>Next →</Text>
              </Box>
            </Pressable>
          </HStack>
        </ScrollView>

        {/* FLOAT BUTTON */}
        <Pressable
          position="absolute"
          bottom={20}
          right={20}
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