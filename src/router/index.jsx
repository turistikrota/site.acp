import RootRouter from "@/domains/root/RootRouter.jsx";
import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    <Route path={RootRouter.path} element={RootRouter.element}>
      {RootRouter.children.map((route, idx) => (
        <Route key={idx} path={route.path} lazy={route.lazy} />
      ))}
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
