import {useState} from "react";
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {getCookie} from "../config/CookieMaster";
import {useEffect} from "react";

export const Register = () => {

    //Navigator
    let nav = useNavigate();

    //Err
    let err = document.getElementById("err");

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            err.innerText = "Password and confirm password do not match!";
        }
        else {
            axios.post("https://blog-server-5kb2.onrender.com/sign-up", formData)
                .then((res) => {
                    if(res.data === "success") {
                        err.innerText = "Sign up successful!";
                        setTimeout(()=>{
                            nav("/login");
                        },2000)
                    }
                    else if (res.data === "error") {
                        err.innerText = "Something went wrong!";
                    }
                    else if (res.data === "exists") {
                        err.innerText = "Account already exists";
                    }
                });
        }
    }

    //Check login
    useEffect(()=>{
        const em = getCookie("em");
        if(em) nav("/dashboard");
    },[])

    return (
        <>
            {/*Header*/}
            <Navbar/>
            {/*Header End*/}
            <div className="registration-page">
                <div className="header">
                    <span className="head">Welcome to DevEcho</span>
                    <span className="tag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, vitae!</span>
                </div>
                <form onSubmit={handleSubmit} className="registration-form">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <p id="err"></p>
                <div className="exists">
                    <Link to={"/login"}>Already have an account?</Link>
                </div>
                    <button type="submit">Register</button>
                </form>
                
            </div>
            {/*  Footer  */}
            <Footer/>
            {/*  Footer End  */}
        </>
    )
}