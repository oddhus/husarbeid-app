import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../components/Authentication/authAtom";
import { CreateFamily } from "../components/Family/CreateFamily";
import { CreateTask } from "../components/Tasks/CreateTask";
import { Taskboard } from "../components/Tasks/Taskboard";

export const TaskPage = () => {
  const user = useRecoilValue(userState);

  return (
    <div>
      {user?.familyId ? (
        <>
          <CreateTask /> <Taskboard />
        </>
      ) : (
        <CreateFamily />
      )}
    </div>
  );
};
