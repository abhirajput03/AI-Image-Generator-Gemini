import { Link } from "react-router";
import { gemini, profile } from "../assets";
import { useUser } from "../context/user.context";

export const Header = () => {
    const { user, logout } = useUser()
    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
                <Link to="/">
                    <img src={gemini} className="w-28 object-contain" />
                </Link>
                <div className="flex items-center gap-3">
                    {!user.isLoggedIn &&
                        <><Link to="/login" className="font-inter font-medium text-[#6469ff]  py-2 rounded-md">
                            sign in
                        </Link>
                        </>
                    }
                    <Link to="/gallery" className="font-inter font-medium text-[#6469ff] px-2 py-2 rounded-md">
                        gallery
                    </Link>
                    <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
                        create
                    </Link>
                    {
                        user.isLoggedIn && (
                            <details className="relative inline-block">
                        <summary className="list-none w-10 h-10 rounded-full cursor-pointer">
                            <img
                                src={profile}
                                alt="User dropdown"
                                className="w-10 h-10 rounded-full"
                            />
                        </summary>
                        <div className="absolute right-0 mt-2 w-44 rounded-lg shadow bg-white z-10">
                            <div className="px-4 pt-3 text-sm text-gray-900">
                                <div className="font-medium truncate">{user.username}</div>
                                <div className=" truncate" >{user.username}@gmail.com</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700">
                                <li className="block px-4 py-2 hover:bg-gray-100">
                                    Dashboard
                                </li>
                                <li className="block px-4 py-2 hover:bg-gray-100">
                                        <button onClick={handleLogout}>Log out</button>
                                </li>
                            </ul>
                        </div>
                    </details>
                        )
                    }
                </div>
            </header>
        </>
    )
}
