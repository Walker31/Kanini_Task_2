import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar";
import Contact from './pages/Contact/contact';
import Note from "./pages/Notes/note";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </div>

      <main className="flex-1 pt-16 px-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className="text-center mt-20 text-2xl text-red-600">
      <h1>404 - Page Not Found</h1>
      <p>Oops! You seem to be in the wrong place.</p>
    </div>
  );
};


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route index element={<Contact/>} />
        <Route path="notes" element={<Note/>} />
        <Route path="*" element={<NotFound/>} />
      </Route>
      
    )
  )

  return <RouterProvider router={router}/>
}

export default App