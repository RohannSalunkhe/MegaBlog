import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../../store/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="className='inline-bock px-6 py-2 duration-200 text-yellow-400 hover:text-yellow-500 rounded-full hover:cursor-pointer"
      onClick={logoutHandler}
    >
      <p className="text-black font-medium">Logout</p>
    </button>
  );
}

export default LogoutBtn;
