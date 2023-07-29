import React from "react";
import { useSelector } from "react-redux";

export default function RenderIfClaimExists({ children, role }) {
  const account = useSelector((state) => state.account.current);
  if (account.roles.includes(role)) return <>{children}</>;
  return null;
}
