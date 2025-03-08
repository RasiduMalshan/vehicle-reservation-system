import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Hassle-Free Cab Booking
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Book a ride anywhere, anytime with our reliable cab service. Fast,
          safe, and affordable.
        </p>

        {/* CTA Button */}
        <Link
          to="/register"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
        >
          Book a Ride
        </Link>
      </div>

      {/* Image or Illustration */}
      <img
        src="https://source.unsplash.com/600x400/?taxi,road"
        alt="Cab Booking"
        className="mt-8 w-full max-w-lg rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Home;
