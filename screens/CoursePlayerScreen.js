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
        <CoursePlayerHero  isMobile={isMobile} />
        <CoursePlayerContent isMobile={isMobile} />
        <CourseFooter/>
      </ScrollView>

    </Box>
  );
}