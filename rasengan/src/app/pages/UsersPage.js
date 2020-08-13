import React from "react";
import { useSubheader } from "../../_metronic/layout";

export const UsersPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Users");

  return <>Users</>;
};
