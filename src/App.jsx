import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import TaskList from "./pages/TaskList/TaskList";
import AddTask from "./pages/AddTask/AddTask";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import { Bounce, ToastContainer } from "react-toastify";
import Details from "./pages/TaskDetails/Details";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={4998}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
