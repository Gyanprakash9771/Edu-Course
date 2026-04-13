import { Box } from "native-base";
import { useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import AuthModal from "../components/AuthModal";
import CourseBanner from "../components/CourseBanner";
import CourseFooter from "../components/CourseFooter";
import CourseGrid from "../components/CourseGrid";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";

export default function CourseScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <Box flex={1} position="relative">
      <Box position="relative" zIndex={1}>
        <Navbar onOpenAuth={() => setAuthOpen(true)} />
        <MainNavbar isMobile={isMobile} />
      </Box>
      <ScrollView>
        <CourseBanner isMobile={isMobile} />
        <CourseGrid />
        <CourseFooter />
      </ScrollView>
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </Box>

  );
}