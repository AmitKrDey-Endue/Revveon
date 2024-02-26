import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import Loading from "./Components/CMS/Loading/Loading.jsx";
import { toast } from "react-toastify";
import Survey from "./Components/CMS/survey/Survey.jsx";

const Register = lazy(() => import("./Components/auth/Register.jsx"));
const Verify = lazy(() => import("./Components/CMS/register/Verify.jsx"));
const Success = lazy(() => import("./Components/CMS/register/Verified.jsx"));
const SetLinkedInHandle = lazy(() =>
  import("./Components/CMS/register/SetLinkedInHandle.jsx")
);
const SurveyPrompt = lazy(() =>
  import("./Components/CMS/register/SurveyPrompt.jsx")
);

const Login = lazy(() => import("./Components/auth/Login.jsx"));
const Dashboard = lazy(() => import("./Components/CMS/founder/Founder.jsx"));


function App() {
  function PrivateRoute({ children }) {
    const token =
      localStorage.getItem("token") || localStorage.getItem("access_token");
    sessionStorage.getItem("access_token");

    // useEffect(() => {
    //   localStorage.setItem("pathname", location?.pathname);
    // }, [location]);
    const location = useLocation();
    let fullURL = `${location.pathname}`;
    if (fullURL.startsWith("/")) {
      fullURL = fullURL.substring(1);
    }

    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {toast.error(`Please go for login either you can't access ${fullURL}`)}
      </>
    );
  }
  const PublicRouteNames = [
    {
      path: "/user/register",
      Component: <Register />,
    },
    {
      path: "/verify",
      Component: <Verify />,
    },
    {
      path: "/success",
      Component: <Success />,
    },
    {
      path: "/linkedIn",
      Component: <SetLinkedInHandle />,
    },
    {
      path: "/surveyprompt",
      Component: <SurveyPrompt />,
    },
    {
      path: "/user/sign-in",
      Component: <Login />,
    },
    {
      path: "/",
      Component: <Navigate to="/user/sign-in" />,
    },

    // {
    //   path: "*",
    //   Component: <NotFound />,
    // },
  ];
  const PrivateRouteNames = [
    {
      path: "/founder",
      Component: <Dashboard />,
    },
    {
      path: "/founder/survey",
      Component: <Survey />,
    },
  ];
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Router>
          {/* <Header /> */}

          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact
                  path={route.path}
                  element={route.Component}
                />
              );
            })}

            {PrivateRouteNames?.map((route, index) => {
              return (
                <Route
                  key={index}
                  exact
                  path={route.path}
                  element={<PrivateRoute>{route.Component}</PrivateRoute>}
                />
              );
            })}
          </Routes>

          {/* <Footer /> */}
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
