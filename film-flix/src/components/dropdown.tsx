import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DropdownComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  async function getUserInfo() {
    try {
      const token = localStorage.getItem("token");
      // LANZAR UN MENSAJE DE ERROR EN ESTE CASO
      if (!token) {
        navigate("/login");
      }

      const responseUser = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ?? "",
        },
      });

      if (!responseUser.ok) {
        throw new Error(`Error en la solicitud: ${responseUser.statusText}`);
      }

      // Obtención del nombre de usuario a partir del token
      const dataUser = await responseUser.json();
      return dataUser;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  getUserInfo().then((dataUser) => {
    setUserName(dataUser.username);
    setUserEmail(dataUser.email);
  });

  return (
    <div className="relative">
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        User options
        <svg
          className={`w-2.5 h-2.5 ms-3 ${isDropdownOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownInformation"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-full mt-2"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{userName}</div>
            <div className="font-medium truncate">{userEmail}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
