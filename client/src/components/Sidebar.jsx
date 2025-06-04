import { useEffect, useState } from 'react'
import { arrow } from '../assets';
import { Link } from 'react-router';

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [allUsers, setAllUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/get-all-users")
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error);
      }
      setAllUsers(data.users)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="flex">
      <div
        className={`${open ? "w-60" : "w-20"}  h-screen p-5 relative duration-300`}
      >
        <img
          src={arrow}
          className={`absolute cursor-pointer -right-3 top-9 w-7 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <ul>
          <li className="flex rounded-md p-2 cursor-pointer  hover:bg-gray-100 text-gray-500 text-sm items-center gap-x-4 mt-2 hover:text-indigo-500 font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className={`${!open ? "hidden" : ""} origin-left duration-200`}>
              Dashboard
            </span>
          </li>

          <li>
            <input type="checkbox" id="user-toggle" className="peer hidden" />
            <label
              htmlFor="user-toggle"
              className="flex rounded-md p-2 cursor-pointer  hover:bg-gray-100 text-gray-500 text-sm items-center gap-x-4 mt-2 hover:text-indigo-500 font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              <span className={`${!open ? "hidden" : ""} origin-left duration-200`}>Users</span>
              <svg
                className="w-3 h-3 transition-transform peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </label>
            <ul className="hidden peer-checked:block py-2 space-y-2">
              {
                allUsers.map((user, index) => {
                  return (<Link to={`/gallery/${user._id}`} key={user._id} className="flex rounded-md p-2 cursor-pointer  hover:bg-gray-100 text-gray-500 text-sm items-center gap-x-4 mt-2 hover:text-indigo-500 font-medium">
                    {user.username}
                  </Link>)
                })
              }
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
