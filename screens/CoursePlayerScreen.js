import { Box } from "native-base";
import { ScrollView, useWindowDimensions } from "react-native";

import CourseFooter from "../components/CourseFooter";
import CoursePlayerContent from "../components/CoursePlayerContent";
import CoursePlayerHero from "../components/CoursePlayerHero";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";

export default function CoursePlayerScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Box flex={1}>

      <Navbar />
      <MainNavbar isMobile={isMobile} />

      <ScrollView>

        {/* HERO */}
        <CoursePlayerHero isMobile={isMobile} />

        {/* 🔥 SPACE BETWEEN HERO & PLAYER */}
        <Box mt={10}>
          <CoursePlayerContent isMobile={isMobile} />
        </Box>

        {/* 🔥 SPACE BETWEEN PLAYER & FOOTER */}
        <Box mt={10}>
          <CourseFooter />
        </Box>

      </ScrollView>

    </Box>
  );
}