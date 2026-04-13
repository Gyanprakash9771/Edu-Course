import { Box } from "native-base";
import { ScrollView, useWindowDimensions } from "react-native";

import CoursePlayerContent from "../components/CoursePlayerContent";
import CoursePlayerHero from "../components/CoursePlayerHero";
import FooterSection from "../components/FooterSection";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";

export default function CoursePlayerScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Box flex={1}>

      {/* TOP NAV */}
      <Navbar />
      <MainNavbar isMobile={isMobile} />

      {/* MAIN CONTENT */}
      <ScrollView>
        <CoursePlayerHero  isMobile={isMobile} />
        <CoursePlayerContent isMobile={isMobile} />
        <FooterSection isMobile={isMobile} />
      </ScrollView>

    </Box>
  );
}