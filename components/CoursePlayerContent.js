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
    <Box flexDirection={isMobile ? "column" : "row"} flex={1}>

      {/* 🔥 SIDEBAR */}
      <ScrollView
        style={{
          width: isMobile ? "100%" : 320,
          backgroundColor: "#f8f9fa",
          borderRightWidth: isMobile ? 0 : 1,
          borderColor: "#ddd",
        }}
      >
        <Box p={2}>
          <Text fontSize="md" mb={2}>Course Content</Text>

          {course.sections?.map((sec, i) => {
            const total = sec.lessons?.length || 0;
            const done = sec.lessons.filter((_, j) =>
              completed.includes(`${i}-${j}`)
            ).length;

            return (
              <Box key={i} mb={1}>

                {/* SECTION */}
                <Pressable onPress={() => toggleSection(i)}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    py={2}
                    bg="#e9ecef"
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {sec.title}
                    </Text>

                    <HStack space={2} alignItems="center">
                      <Text fontSize="xs">{done}/{total}</Text>
                      <Ionicons
                        name={openSections[i] ? "chevron-up" : "chevron-down"}
                        size={14}
                      />
                    </HStack>
                  </HStack>
                </Pressable>

                {/* LESSONS */}
                {openSections[i] && (
                  <VStack>
                    {sec.lessons?.map((lec, j) => {
                      const key = `${i}-${j}`;
                      const isActive = activeIndex === key;
                      const isDone = completed.includes(key);

                      return (
                        <Pressable
                          key={j}
                          onPress={() => goToLesson({ ...lec, key })}
                        >
                          <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            px={3}
                            py={2}
                            bg={isActive ? "#dee2e6" : "transparent"}
                          >
                            <HStack space={2} alignItems="center" flex={1}>
                              <Ionicons
                                name={isDone ? "checkmark-circle" : "play-outline"}
                                size={16}
                                color={isDone ? "#22c55e" : "#666"}
                              />

                              <Text fontSize="sm" numberOfLines={1}>
                                {lec.title}
                              </Text>
                            </HStack>

                            <Text fontSize="xs" color="#666">
                              {lec.duration || "03:54"}
                            </Text>
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

      {/* 🔥 RIGHT SIDE */}
      <Box flex={1} bg="#f1f5f9">

        {/* HEADER */}
        <HStack
          bg="#0f172a"
          px={4}
          py={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack space={3} alignItems="center">
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text color="white">{course.title}</Text>
          </HStack>

          <HStack space={3} alignItems="center">
            <Pressable
              onPress={() => {
                if (!completed.includes(activeIndex)) {
                  setCompleted([...completed, activeIndex]);
                }
              }}
            >
              <HStack borderWidth={1} borderColor="white" px={3} py={1} borderRadius={5}>
                <Text color="white">Mark as Complete</Text>
              </HStack>
            </Pressable>

            <Ionicons name="close" size={20} color="white" />
          </HStack>
        </HStack>

        {/* CONTENT */}
        <ScrollView>

          {/* VIDEO */}
          <Box height={isMobile ? 220 : 450} bg="black">
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

          {/* DESCRIPTION */}
          <Box bg="white" p={5}>
            <Text fontSize="lg" fontWeight="bold">{title}</Text>
            <Text mt={2} color="#555">
              The idea of a summary is a short text to prepare students for the
              activities within the topic or week.
            </Text>
          </Box>

          {/* NAV */}
          <HStack justifyContent="center" space={4} py={4}>
            <Pressable
              onPress={() =>
                currentIndex > 0 &&
                goToLesson(flatLessons[currentIndex - 1])
              }
            >
              <Box bg="#cbd5f5" px={4} py={2} borderRadius={5}>
                <Text>← Previous</Text>
              </Box>
            </Pressable>

            <Pressable
              onPress={() =>
                currentIndex < flatLessons.length - 1 &&
                goToLesson(flatLessons[currentIndex + 1])
              }
            >
              <Box bg="#cbd5f5" px={4} py={2} borderRadius={5}>
                <Text>Next →</Text>
              </Box>
            </Pressable>
          </HStack>
        </ScrollView>

        {/* FLOAT BUTTON */}
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