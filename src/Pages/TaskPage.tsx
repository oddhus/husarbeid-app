import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../components/Authentication/authAtom";
import { CreateFamily } from "../components/Family/CreateFamily";
import { CreateTask } from "../components/Tasks/CreateTask";
import { FamilyTaskList } from "../components/Tasks/FamilyTaskList";

export const TaskPage = () => {
  const user = useRecoilValue(userState);

  return (
    <div>
      {user?.familyId ? (
        <>
          <CreateTask /> <FamilyTaskList />
        </>
      ) : (
        <CreateFamily />
      )}
    </div>
  );
};
