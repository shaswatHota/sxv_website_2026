import styles from "./page.module.css";
import Hero from "@/components/Hero";
import GlitchBackground from "@/components/GlitchBackground";
import EventsSlider from "@/components/EventsSlider";

export default function Home() {
  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative min-h-screen">
        <GlitchBackground>
          <div className={styles.main}>
            <Hero />
          </div>
        </GlitchBackground>
      </section>
      
      {/* Spacer between Hero and Events */}
      <div className="h-20 bg-black"></div>
      
      {/* Events Slider Section */}
      <section className="relative z-10 bg-black">
        <EventsSlider />
      </section>
      
      {/* Spacer between Events and Footer */}
      <div className="h-20 bg-black"></div>
    </>
  );
}

