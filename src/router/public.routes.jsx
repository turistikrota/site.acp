import AuthLayout from "../layouts/auth";

export default {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      lazy: () => import("@/views/auth/login.jsx"),
    },
  ],
};
