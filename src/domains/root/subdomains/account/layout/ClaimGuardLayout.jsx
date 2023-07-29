import React from "react";
import { useSelector } from "react-redux";
import NotAuthorizedView from "@/components/Kit/403";

export default function ClaimGuardLayout({ roles, pageName, children }) {
  const account = useSelector((state) => state.account.current);
  if (roles.every((role) => account.roles.includes(role))) {
    return <>{children}</>;
  }
  return <NotAuthorizedView title={pageName} />;
}
