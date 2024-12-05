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

function App() {
  const { isLoggedIn } = useAppContext();

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
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/members"
              element={
                <Layout>
                  <Members />
                </Layout>
              }
            />
            <Route
              path="/members"
              element={
                <Layout>
                  <AddMember />
                </Layout>
              }
            />{" "}
            <Route
              path="/add-members"
              element={
                <Layout>
                  <Members />
                </Layout>
              }
            />{" "}
            <Route
              path="/edit-member/:memberId"
              element={
                <Layout>
                  <Members />
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
