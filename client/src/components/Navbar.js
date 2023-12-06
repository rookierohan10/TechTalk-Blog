import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <nav>
                <div className="navbar-container">
                    <div className="navbar-left">
                        <span className="logo">TechTalk</span>
                    </div>
                    <div className="navbar-right">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/register"}>Join Now</Link>
                        <Link to={"/about"}>About</Link>
                        <Link to={"/contact"}>Contact Us</Link>
                    </div>
                    <div className="navbar-ham">
                        <button type="button"><i className="fa-solid fa-bars"/></button>
                    </div>
                </div>
            </nav>
        </>
    )
}