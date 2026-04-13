import { useRoute } from "@react-navigation/native";
import { Box, Pressable, Text } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import API from "../services/apiService";

export default function CoursePlayerContent({ isMobile }) {
  const route = useRoute();
  const { id } = route.params;

  const [course, setCourse] = useState(null);
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);

      const first = res.data.courseContent?.[0]?.lectures?.[0];
      if (first) {
        setVideo(first.videoUrl);
        setTitle(first.title);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <Text mt={5} textAlign="center">Loading...</Text>;
  }

  return (
    <Box flexDirection={isMobile ? "column" : "row"}>

      {/* LEFT SIDE */}
      <ScrollView style={{ width: isMobile ? "100%" : "30%" }}>
        <Box p={3}>
          <Text bold mb={3}>Course Content</Text>

          {course.courseContent.map((sec, i) => (
            <Box key={i} mb={3}>
              <Text bold>{sec.section}</Text>

              {sec.lectures.map((lec, j) => (
                <Pressable
                  key={j}
                  onPress={() => {
                    setVideo(lec.videoUrl);
                    setTitle(lec.title);
                  }}
                >
                  <Box p={2} borderWidth={1} mt={2}>
                    <Text>▶ {lec.title}</Text>
                  </Box>
                </Pressable>
              ))}
            </Box>
          ))}
        </Box>
      </ScrollView>

      {/* RIGHT SIDE */}
      <Box flex={1} p={3}>
        <Box height={250}>
          <WebView source={{ uri: video }} />
        </Box>

        <Text mt={3} bold>{title}</Text>
      </Box>

    </Box>
  );
}