import AuthLayout from "./AuthLayout";

export default {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      lazy: () => import("./views/LoginView.jsx"),
    },
  ],
};
