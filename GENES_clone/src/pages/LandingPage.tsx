import React from 'react';
import BackgroundDNA from '../components/BackgroundDNA';
import FloatingOrganelles from '../components/FloatingOrganelles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StatisticsDashboard from '../components/StatisticsDashboard';
import HowItWorks from '../components/HowItWorks';
import FeaturesSection from '../components/FeaturesSection';
import CallToAction from '../components/CallToAction';

const LandingPage: React.FC = () => {
    return (
        <div
            className="relative min-h-screen overflow-x-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)' }}
        >
            {/* === Fixed Animated Backgrounds === */}
            <BackgroundDNA />
            <FloatingOrganelles />

            {/* === Page Content === */}
            <div className="relative z-10">
                <Navbar />
                <main>
                    <HeroSection />
                    <StatisticsDashboard />
                    <HowItWorks />
                    <FeaturesSection />
                    <CallToAction />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
