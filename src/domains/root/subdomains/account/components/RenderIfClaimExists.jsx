import React from "react";
import { useSelector } from "react-redux";

export default function RenderIfClaimExists({ children, roles, fallback }) {
  const account = useSelector((state) => state.account.current);
  if (roles.some((role) => account.roles.includes(role)))
    return <>{children}</>;

  if (fallback) return <>{fallback}</>;
  return null;
}
