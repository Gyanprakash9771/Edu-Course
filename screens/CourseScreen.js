import { Box } from "native-base";
import { ScrollView, useWindowDimensions } from "react-native";
import CourseBanner from "../components/CourseBanner";
import CourseFooter from "../components/CourseFooter";
import CourseGrid from "../components/CourseGrid";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";

export default function CourseScreen() {
  const { width } = useWindowDimensions();
    const isMobile = width < 768;
  return (
    <Box flex={1} position="relative">
      <Navbar/>
      <MainNavbar/>
      <ScrollView>
        <CourseBanner isMobile={isMobile}/>
        <CourseGrid/>
        <CourseFooter/>
      </ScrollView>
    </Box>
    
  );
}