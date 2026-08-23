import { NavLink,Outlet,useNavigate } from "react-router-dom";
import { IoPerson,IoCart  } from "react-icons/io5";
import { FiBriefcase, FiHeart ,FiMapPin } from "react-icons/fi";

const ProfileLayout = ()=>{
    const navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem("user")
        navigate("/login")
    }

    const menuStyle =({ isActive}) => 
        `block px-4 py-3 rounded-lg transition ${
            isActive
            ?"bg-teal-500 text-white"
            :"text-gray-700 hover :bg-gray-100"
        }`;
        return(
            <div className="min-h-screen bg-gray-100">
                
                {/* account Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
                        <h1 className="text-2xl fond-bold text-teal-500">
                            WE<span className="text-gray-500">SHOP</span>
                        </h1>

                        <button 
                        onClick={handleLogout} className="text-red-500 fond-semibold hover:text-red-700">
                            Logout

                        </button>

                    </div>

                </header>


{/* Account Area */}
<div className="max-w-7xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Account sidebar */}
        <aside className="bg-white rounded-xl shadow-sm p-4 h-fit">

            <h2 className="text-lg font-bold mb-4">
                My Account

            </h2>
            <nav className="space-y-2">

                <NavLink to="/profile"
                end
                className={menuStyle}>
                 <IoPerson />Profile

                </NavLink>

                <NavLink to="/profile/orders"
                className={menuStyle}>
                  <FiBriefcase /> My Orders

                </NavLink>
                    <NavLink to="/profile/cart"
                className={menuStyle}>
                  <IoCart /> My Cart

                </NavLink>

                <NavLink to="/profile/wishList"
                className={menuStyle}>
                  <FiHeart /> Wish List

                </NavLink> 
                <NavLink 
                to="/profile/address"
                className={menuStyle}>
                  <FiMapPin /> Address

                </NavLink>

            </nav>

        </aside>
        {/* page content */}
        <main className="md:col-span-3">
            <Outlet />

        </main>

    </div>
</div>

            </div>
        )
        
}
export default ProfileLayout;