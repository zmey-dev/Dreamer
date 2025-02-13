import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../../components/UserTable";
import { getAllUsers } from "../../../store/slices/userSlice";
const User = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return <UserTable users={users} />;
};

export default User;
