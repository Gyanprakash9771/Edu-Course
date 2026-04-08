import { useRoute } from "@react-navigation/native";
import { Box, HStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";

import AuthModal from "../components/AuthModal";
import CourseFooter from "../components/CourseFooter";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";
import CourseHero from "../components/courseDetails/CourseHero";
import CourseMainContent from "../components/courseDetails/CourseMainContent";
import CourseSidebar from "../components/courseDetails/CourseSidebar";
import RelatedCourses from "../components/courseDetails/RelatedCourses";
import API from "../services/api"; // ✅ NEW

export default function CourseDetailsScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const route = useRoute();
  const scrollRef = useRef(null);

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

  const [course, setCourse] = useState(null); // ✅ NEW
  const [authOpen, setAuthOpen] = useState(false);

  // ✅ SCROLL + FETCH
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });

    if (!id) return;

    API.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ LOADING FIX
  if (!course) return null;

  return (
    <Box flex={1} bg={"white"}>
      <Box position="relative" zIndex={1}>
        <Navbar onOpenAuth={() => setAuthOpen(true)} />
        <MainNavbar isMobile={isMobile} />
      </Box>

      <ScrollView ref={scrollRef}>
        
        <CourseHero course={course} isMobile={isMobile} />

        <Box px={isMobile ? 4 : 10} py={8}>
          <HStack
            space={6}
            flexDirection={isMobile ? "column" : "row"}
            alignItems="flex-start"
          >
            <Box w={isMobile ? "100%" : "65%"}>
              <CourseMainContent 
  isMobile={isMobile} 
  course={course}
/>
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
          currentCourseId={course._id}   // ✅ FIXED
        />
        <CourseFooter/>
      </ScrollView>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </Box>
  );
}