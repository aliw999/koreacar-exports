import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Steps from '@/components/Steps';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Steps />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
