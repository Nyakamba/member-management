import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Layout from "./layout/Layout";
import AddMember from "./pages/AddMember";
import Dashboard from "./pages/Dashboard";
import EditMember from "./pages/EditMember";

import Login from "./pages/Login";
import Members from "./pages/Members";
import Register from "./pages/Register";
import MemberDetails from "./pages/MemberDetails";

function App() {
  const { isLoggedIn, isAdmin, isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />{" "}
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            {isAdmin && (
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
            )}
            <Route
              path="/members"
              element={
                <Layout>
                  <Members />
                </Layout>
              }
            />
            <Route
              path="/add-member"
              element={
                <Layout>
                  <AddMember />
                </Layout>
              }
            />{" "}
            <Route
              path="/edit-member/:memberId"
              element={
                <Layout>
                  <EditMember />
                </Layout>
              }
            />
            <Route
              path="/member-details/:memberId"
              element={
                <Layout>
                  <MemberDetails />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
