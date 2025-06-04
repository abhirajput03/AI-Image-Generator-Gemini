import { BrowserRouter, Route, Routes } from "react-router"
import { CreatePost, Gallery, Home, Layout, Login, Registration } from './pages';
import { UserProvider } from "./context/user.context";
import { ProtectedRoute } from "./components";


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="gallery" element={<ProtectedRoute> <Gallery /></ProtectedRoute>} />
              <Route path="gallery/:id" element={<ProtectedRoute> <Gallery /></ProtectedRoute>} />
              <Route path="create-post" element={<CreatePost />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}
