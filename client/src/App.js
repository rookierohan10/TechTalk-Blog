import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {Dashboard} from "./pages/Dashboard";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/contact"} element={<Contact/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/dashboard"} element={<Dashboard/>}/>
                    <Route path={"/new-post"} element={<CreatePostPage/>}/>
                    <Route path={"/edit-post"} element={<EditPostPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
