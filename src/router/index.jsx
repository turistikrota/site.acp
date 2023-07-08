import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import guardRouter from "./guard.routes";
import publicRouter from "./public.routes";

const routes = createRoutesFromElements(
  <>
    <Route path={guardRouter.path} element={guardRouter.element}>
      {guardRouter.children.map((route, idx) => (
        <Route key={idx} path={route.path} lazy={route.lazy} />
      ))}
    </Route>
    <Route path={publicRouter.path} element={publicRouter.element}>
      {publicRouter.children.map((route, idx) => (
        <Route key={idx} path={route.path} lazy={route.lazy} />
      ))}
    </Route>
  </>
);

export const router = createBrowserRouter(routes);
