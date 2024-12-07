import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditMember from "./pages/EditMember";

function App() {
  const { isLoggedIn, isAdmin } = useAppContext();

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
            {isAdmin ? (
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
            ) : (
              "/members"
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
          </>
        )}
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
