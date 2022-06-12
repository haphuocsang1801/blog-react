import DashboardLayout from "module/dashboard/DashboardLayout";
import PostAddNew from "module/post/PostAddNew";
import PostManage from "module/post/PostManage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import PostDetailsPage from "pages/PostDetailsPage";
import SignInPage from "pages/SignInPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>} />
          <Route path="/sign-in" element={<SignInPage></SignInPage>} />

          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
          <Route path="/:slug" element={<PostDetailsPage></PostDetailsPage>} />
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            />
            <Route path="/manage/post" element={<PostManage></PostManage>} />
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
