import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../../components/UserTable";
import { getAllUsers } from "../../../store/slices/userSlice";
const User = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return <UserTable users={users} />;
};

export default User;
