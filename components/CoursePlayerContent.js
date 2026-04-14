// ONLY UI IMPROVED (NO LOGIC CHANGED)

import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { Box, HStack, Pressable, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import API from "../services/api";

export default function CoursePlayerContent({ isMobile }) {
  const route = useRoute();
  const url = Linking.useURL();

  const [id, setId] = useState(route.params?.id || null);

  useEffect(() => {
    if (!id && url) {
      const extracted = url.split("/course-player/")[1]?.split("?")[0];
      if (extracted) setId(extracted);
    }
  }, [url]);

  if (!id) {
    return <Text mt={5} textAlign="center">Loading...</Text>;
  }

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
    if (!id) return;

    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);

      const flat = res.data.sections.flatMap(sec => sec.lessons);

      try {
        const USER_ID = "507f1f77bcf86cd799439011";

        const progressRes = await API.get(`/progress/${USER_ID}/${id}`);
        const progress = progressRes.data;

        if (progress?.completedLessons) {
          const normalized = progress.completedLessons.map(p => p.toString());
          setCompleted(normalized);
        }

        if (progress?.lastLesson) {
          const last = flat.find(
            l => l.lessonId.toString() === progress.lastLesson.toString()
          );

          if (last) {
            setVideo(last.video);
            setTitle(last.title);
            setActiveIndex(last.lessonId);
            return;
          }
        }
      } catch {
        console.log("No progress found");
      }

      const first = flat[0];
      if (first) {
        setVideo(first.video);
        setTitle(first.title);
        setActiveIndex(first.lessonId);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <Text mt={5} textAlign="center">Loading...</Text>;
  }

  const flatLessons = course.sections.flatMap((sec) =>
    sec.lessons.map((lec) => ({
      ...lec,
      key: lec.lessonId,
    }))
  );

  const currentIndex = flatLessons.findIndex(
    (l) => l.key === activeIndex
  );

  const goToLesson = (lesson) => {
    setVideo("");
    setTimeout(() => setVideo(lesson.video), 50);
    setTitle(lesson.title);
    setActiveIndex(lesson.lessonId);
  };

  // ✅ OVERALL PROGRESS
const totalLessonsCount = flatLessons.length;

const completedCount = completed.filter(id =>
  flatLessons.some(l => l.lessonId.toString() === id.toString())
).length;

const progressPercent = totalLessonsCount
  ? Math.round((completedCount / totalLessonsCount) * 100)
  : 0;

  return (
    <Box flexDirection="row" flex={1} bg="#f1f5f9">

      {/* ================= SIDEBAR ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
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
         <Text fontSize="md" mb={2} fontWeight="bold">
  Course Content
</Text>

{/* ✅ OVERALL PROGRESS */}
<Box mb={4} px={1}>
  <HStack justifyContent="space-between" mb={1}>
    <Text fontSize="xs" color="#6b7280">
      Your Progress
    </Text>
    <Text fontSize="xs" fontWeight="bold" color="#16a34a">
      {progressPercent}%
    </Text>
  </HStack>

  <Box bg="#e5e7eb" height={3} borderRadius={3}>
    <Box
      bg="#22c55e"
      height={3}
      borderRadius={3}
      width={`${progressPercent}%`}
    />
  </Box>

  <Text fontSize="xs" color="#6b7280" mt={1}>
    {completedCount} of {totalLessonsCount} lessons completed
  </Text>
</Box>

          {course.sections?.map((sec, i) => {
            const total = sec.lessons?.length || 0;
            const done = sec.lessons.filter((lec) =>
              completed.some(id => id.toString() === lec.lessonId.toString())
            ).length;

            return (
              <Box key={i} mb={4}>

                {/* SECTION HEADER */}
                <Pressable onPress={() => toggleSection(i)}>
                  <HStack
                    justifyContent="space-between"
                    px={4}
                    py={3}
                    bg="#f1f5f9"
                    borderRadius={6}
                  >
                    <Text fontSize="sm" fontWeight="bold">
                      {sec.title}
                    </Text>

                    <Text fontSize="xs" color="#6b7280">
                      {done}/{total}
                    </Text>
                  </HStack>
                </Pressable>

                {/* PROGRESS BAR */}
                <Box px={4} mt={1} mb={2}>
                  <Box bg="#e5e7eb" height={3} borderRadius={3}>
                    <Box
                      bg="#22c55e"
                      height={3}
                      borderRadius={3}
                      width={`${total ? (done / total) * 100 : 0}%`}
                    />
                  </Box>
                </Box>

                {/* LESSONS */}
                {openSections[i] && (
                  <VStack>
                    {sec.lessons?.map((lec) => {
                      const isActive = activeIndex === lec.lessonId;
                      const isDone = completed.some(
                        id => id.toString() === lec.lessonId.toString()
                      );

                      return (
                        <Pressable
                          key={lec.lessonId}
                          onPress={() => goToLesson(lec)}
                        >
                          <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            px={4}
                            py={3}
                            borderRadius={6}
                            bg={isActive ? "#dcfce7" : "transparent"}
                          >

                            <HStack alignItems="center" space={2} flex={1}>
                              <Ionicons
                                name={isDone ? "checkmark-circle" : "play-circle-outline"}
                                size={18}
                                color={isDone ? "#22c55e" : "#9ca3af"}
                              />

                              <Text
                                fontSize="sm"
                                numberOfLines={1}
                                fontWeight={isActive ? "bold" : "normal"}
                                color={isActive ? "#16a34a" : "#374151"}
                              >
                                {lec.title}
                              </Text>
                            </HStack>

                            <Text fontSize="xs" color="#6b7280">
                              {lec.time || "03:54"}
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

      {/* ================= RIGHT SIDE (UNCHANGED) ================= */}
      <Box flex={1}>

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
              onPress={async () => {
                if (!completed.some(id => id.toString() === activeIndex.toString())) {
                  setCompleted([...completed, activeIndex]);

                  try {
                    const USER_ID = "507f1f77bcf86cd799439011";
                    await API.post("/progress", {
                      userId: USER_ID,
                      courseId: id,
                      lessonId: activeIndex,
                    });
                  } catch (err) {
                    console.log("Progress save failed", err);
                  }
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

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

          <Box width="100%" height={isMobile ? 260 : 650} mt={-60} bg="black">
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

          <Box bg="white" px={6} py={5} mt={3} borderRadius={8} width="100%" maxWidth={1000}>
            <Text fontSize="xl" fontWeight="bold">{title}</Text>
            <Text mt={3} color="#555">
              The idea of a summary is a short text to prepare students for the
              activities within the topic or week.
            </Text>
          </Box>

          <HStack justifyContent="center" space={4} py={6} mt={2} bg="#e2e8f0" width="100%" maxWidth={1000}>
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
      </Box>
    </Box>
  );
}