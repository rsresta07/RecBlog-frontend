import HeroLayout from "@/layouts/HeroLayout";

/**
 * AboutUs component renders the "About Us" section of the webpage.
 *
 * It displays a main container with a heading styled with specific
 * CSS classes for layout, font size, weight, and color.
 *
 * @returns The AboutUs component.
 */
const AboutUs = () => {
  return (
    <main className="container mx-auto">
      <h2 className="text-2xl font-bold text-dark-font mb-4">About us</h2>
    </main>
  );
};

export default AboutUs;
AboutUs.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
