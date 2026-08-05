import { useNavigate } from "react-router-dom";
const Hero = () => {
     const navigate= useNavigate()
    
  return (
    <section className="rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between">

        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Shop Smarter <br />
            Live Better
          </h1>

          <p className="text-lg text-gray-100">
            Discover thousands of quality products with amazing offers.
          </p>

          <button onClick={()=>navigate("/products")} className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100">
            Shop Now
          </button>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
            alt="Shopping"
            className="rounded-xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;