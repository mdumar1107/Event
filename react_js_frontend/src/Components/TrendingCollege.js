import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const TrendingCollege = () => {
  return (
    <div className="font-sans bg-background">
      {/* Header Section */}
      <div>
        <Header /> 
      </div>

      {/* Hero Section */}
      <div className="w-full flex justify-center items-center mt-6">
        <section 
          className="w-[1320px] h-[596px] bg-cover bg-center flex justify-center items-center text-white text-4xl font-bold rounded-2xl"
          style={{ backgroundImage: "url('/trndclg.jpg')" }}
        >
          
        </section>
      </div>

      {/* College Event Card Section */}
      <div className="w-full flex justify-center items-center mt-6 mb-10 sm:mb-16">
        <div className="w-[1200px]  bg-background  px-0 font-sans">
          <h2 className="text-3xl font-bold mb-4">IIT Roorke</h2>
          <p className="text-gray-500 mb-2 text-sm mt-6">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
          <p className="text-gray-500 mb-2 text-sm">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
          <p className="text-gray-500 mb-2 text-sm">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
          <p className="text-gray-500 text-sm">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
        </div>
      </div>

      {/* Upcoming Events Section */}
        <section className="p-8 bg-background flex flex-col items-center mt-10 sm:mt-16">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center md:text-left">
                College <span className="text-primary">Events</span>
            </h2>
            </div>


      {/* Event Grid (2 Rows, 3 Columns) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0">
      {[
        { id: 1, image: "/img2.jpg" },
        { id: 2, image: "/img1.jpg" },
        { id: 3, image: "/img1.jpg" },
        { id: 4, image: "/img1.jpg" },
        { id: 5, image: "/img3.jpg" },
        { id: 6, image: "/img2.jpg" },
      ].map((event) => (
        <div key={event.id} className="bg-white shadow-lg rounded-xl overflow-hidden p-5">
          {/* Image Container */}
          <div className="relative w-full flex justify-center">
            <img
              src={event.image}
              alt={`Event ${event.id}`}
              className="w-full h-[240px] object-cover rounded-lg"
            />
            <span className="absolute top-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded">
              FREE
            </span>
          </div>

          {/* Event Content (Kept Inside the Card) */}
          <div className="mt-4 text-left space-y-2">
            <h3 className="text-md font-semibold leading-tight text-black">
              BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow
            </h3>
            <p className="text-xs font-medium text-primary leading-[2.5]">
              Saturday, March 18, 9:30PM
            </p>
            <p className="text-xs text-gray-600">
              ONLINE EVENT - Attend anywhere
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>

      {/* Footer Section */}
      <div>
        <Footer />
      </div>

      </div>
  );
};

export default TrendingCollege;
