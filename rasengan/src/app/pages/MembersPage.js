import React from "react";
import { useSubheader } from "../../_metronic/layout";

export const MembersPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Members");

  return <>Members</>;
};
