import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../../components/UserTable";
import { getAllTeamUsers } from "../../../store/slices/userSlice";
const TeamUser = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.teamUsers);

  useEffect(() => {
    dispatch(getAllTeamUsers());
  }, [dispatch]);
  return <UserTable users={users} />;
};

export default TeamUser;
