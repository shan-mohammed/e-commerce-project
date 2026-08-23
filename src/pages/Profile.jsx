const Profile = () => {

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-500">
            Full Name
          </p>

          <p className="font-semibold text-lg">
            {loggedInUser?.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email
          </p>

          <p className="font-semibold text-lg">
            {loggedInUser?.email}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Profile;