import { useRoute } from "@react-navigation/native";
import { Box, HStack } from "native-base";
import { useEffect, useRef } from "react"; // ✅ ADD
import { ScrollView, useWindowDimensions } from "react-native";

import CourseFooter from "../components/CourseFooter";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";
import CourseHero from "../components/courseDetails/CourseHero";
import CourseMainContent from "../components/courseDetails/CourseMainContent";
import CourseSidebar from "../components/courseDetails/CourseSidebar";
import RelatedCourses from "../components/courseDetails/RelatedCourses";
import courses from "../data/courses";

export default function CourseDetailsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const route = useRoute();
  const scrollRef = useRef(null); // ✅ ADD

  let id = route?.params?.id;

  if (id === undefined) {
    try {
      const path = window.location.pathname;
      const match = path.match(/course-details\/(\d+)/);
      if (match) {
        id = match[1];
      }
    } catch (e) {}
  }

  // ✅ SCROLL FIX
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [id]);

  const parsedId = parseInt(id);
  const course = courses.find(c => c.id === parsedId) || courses[0];

  return (
    <Box flex={1} bg={"white"}>
      <Navbar />
      <MainNavbar isMobile={isMobile} />

      {/* ✅ ATTACH REF HERE */}
      <ScrollView ref={scrollRef}>
        
        <CourseHero course={course} isMobile={isMobile} />

        <Box px={isMobile ? 4 : 10} py={8}>
          <HStack
            space={6}
            flexDirection={isMobile ? "column" : "row"}
            alignItems="flex-start"
          >
            <Box w={isMobile ? "100%" : "65%"}>
              <CourseMainContent isMobile={isMobile} />
            </Box>

            <Box
              w={isMobile ? "100%" : "30%"}
              mt={isMobile ? -10 : -200}
              zIndex={10}
              ml={isMobile ? 0 : -6}
            >
              <CourseSidebar course={course} isMobile={isMobile} />
            </Box>
          </HStack>
        </Box>

        <RelatedCourses 
          isMobile={isMobile} 
          currentCourseId={course.id} 
        />
        <CourseFooter/>
      </ScrollView>
    </Box>
  );
}