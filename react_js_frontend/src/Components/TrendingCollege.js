import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const TrendingCollege = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const colleges = [
    {
      id: 1,
      name: "Harvard University",
      location: "Cambridge, Massachusetts, UK",
      image: "/harward.png",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Stanford University",
      location: "Stanford, California, USA",
      image: "/stanford.png",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Nanyang University",
      location: "Nanyang Ave, Singapore",
      image: "/nanyang.png",
      rating: 4.7,
    },
  ];

  // Get college either from state or fallback to finding by ID
  const college = location.state || colleges.find(c => c.id === Number(id));

  if (id && college) {
    // Detail view
    return (
      <>
        <Header />
        <div className="pt-20 px-4 max-w-6xl mx-auto bg-background">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
          <div className="mt-8">
            <h1 className="text-4xl font-bold mb-2">{college.name}</h1>
            <p className="text-gray-600 mb-4">{college.location}</p>
            <p className="text-lg text-gray-700 leading-relaxed">
  <strong>About College:</strong> {college.name} stands as a beacon of academic excellence, 
  attracting students from across the globe. Nestled in the heart of {college.location}, 
  it offers a vibrant campus life surrounded by state-of-the-art facilities and inspiring architecture. 
  The university is home to a distinguished faculty who are leaders in their fields. 
  Students here are encouraged to think critically, collaborate, and innovate boldly. 
  With a strong focus on research, the institution contributes significantly to global progress.
</p>

<p className="text-lg text-gray-700 leading-relaxed mt-4">
  Beyond academics, {college.name} fosters a strong sense of community, cultural diversity, 
  and holistic development. The university hosts a wide array of clubs, activities, and events 
  that encourage students to explore their passions and enhance their personal growth. 
  Whether it’s through sports, arts, or volunteer work, {college.name} ensures that every student’s 
  experience is rich, fulfilling, and unforgettable.
</p>

<p className="text-lg text-gray-700 leading-relaxed mt-4">
  Graduates of {college.name} go on to become influential leaders, entrepreneurs, 
  and change-makers in various fields. The institution’s global network of alumni 
  provides invaluable support, mentoring, and career opportunities. Choosing {college.name} 
  means stepping into a legacy of brilliance and opportunity, where the future is shaped by the 
  innovative and visionary minds of its students.
</p>

          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            ← Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Default: List view
  return (
    <section className="py-12 bg-background flex flex-col items-center mt-12 px-4">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center md:text-left">
          Trending <span className="text-primary">Colleges</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden w-full h-auto relative cursor-pointer"
            onClick={() =>
              navigate(`/trendingcollege/${college.id}`, { state: college })
            }
          >
            <div className="relative w-full">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-[331px] object-cover"
              />
              <div className="absolute left-5 bottom-20 bg-white flex items-center px-3 py-1 rounded-full shadow-md">
                <span className="text-yellow-500 text-lg">⭐</span>
                <span className="ml-1 font-semibold text-black">{college.rating}</span>
              </div>
              <div className="absolute right-5 bottom-32 bg-black text-white px-3 py-1 text-sm rounded-full">
                EXCLUSIVE
              </div>
            </div>
            <div className="p-5 text-left">
              <h3 className="text-2xl font-bold">{college.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <p className="text-black text-sm font-bold">{college.location}</p>
                <button className="text-black font-bold text-2xl">...</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCollege;
