import { FaTruck, FaUndo, FaLock, FaHeadset } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaTruck size={35} />,
      title: "Free Shipping",
    },
    {
      icon: <FaUndo size={35} />,
      title: "Easy Returns",
    },
    {
      icon: <FaLock size={35} />,
      title: "Secure Payment",
    },
    {
      icon: <FaHeadset size={35} />,
      title: "24/7 Support",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((item) => (
          <div
            key={item.title}
            className="text-center p-8 rounded-xl shadow hover:bg-teal-500 hover:text-white transition"
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="font-bold">
              {item.title}
            </h3>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;