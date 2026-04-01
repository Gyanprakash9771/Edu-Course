import { Box } from "native-base";
import { ScrollView, useWindowDimensions } from "react-native";

import CategoriesSection from "../components/CategoriesSection";
import CoursesSection from "../components/CoursesSection";
import CoursesSection1 from "../components/CoursesSection1";
import FooterSection from "../components/FooterSection";
import HeroSection from "../components/HeroSection";
import MainHeroSection from "../components/MainHeroSection";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";
import PartnersSection from "../components/PartnersSection";
import ResultsSection from "../components/ResultsSection";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Box flex={1} position="relative">

      {/* 🔥 NAVBAR ALWAYS ON TOP */}
      <Navbar />
      <MainNavbar isMobile={isMobile} />

      {/* 🔥 SCROLLABLE CONTENT */}
      <ScrollView>
        <MainHeroSection isMobile={isMobile} />

        <Box px={isMobile ? 4 : 10}>
          <HeroSection isMobile={isMobile} />
        </Box>

        <CategoriesSection isMobile={isMobile} />
        <CoursesSection isMobile={isMobile} />
        <CoursesSection1 isMobile={isMobile} />
        <ResultsSection isMobile={isMobile} />
        {/* <StatsSection isMobile={isMobile} /> */}
        {/* <TestimonialSection isMobile={isMobile} /> */}
        <PartnersSection isMobile={isMobile} />
        <FooterSection isMobile={isMobile} />
      </ScrollView>

    </Box>
  );
}