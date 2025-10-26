import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Router = lazy(() => import("@/router/router"));
const Home = lazy(() => import("@/pages/home"));
const Explore = lazy(() => import("@/pages/explore"));
const Blog = lazy(() => import("@/pages/blogs/blog"));
const Write = lazy(() => import("@/pages/write"));
const Login = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/signup"));
const Success = lazy(() => import("@/pages/auth/success"));
const VerificationEmail = lazy(() => import("@/pages/auth/verification-email"));
const Dashboard = lazy(() => import("@/pages/dashboard/dashboard"));
const Loading = lazy(() => import("@/pages/loading"));
const NotFound = lazy(() => import("@/pages/error"));

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    Component: Router,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/verify",
        element: <VerificationEmail />,
      },
      {
        path: "/auth/success",
        element: <Success />,
      },
      {
        path: "/blog/:slug",
        element: <Blog />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={BrowserRouter} />
    </Suspense>
  );
}