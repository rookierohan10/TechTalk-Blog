import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {getCookie, delCookie} from "../config/CookieMaster";

export const Dashboard = () => {

    //Navigator
    let nav = useNavigate();

    //refs
    const first = useRef(true);

    //States
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currId, setCurrId] = useState('');

    //Err
    let err = document.getElementById("err");

    //Fetch Posts
    function fetchPosts() {
        axios.post("https://blog-server-5kb2.onrender.com/fetch-user-posts", {
            user_id: user.id
        })
            .then((res) => {
                if (res.data === "no_data") {
                    setPosts([]);
                } else {
                    setPosts(res.data);
                }
            });
    }

    //Check Login and fetch Posts
    useEffect(() => {
        const fetchData = () => {
            const em = getCookie("em");
            if (!em) nav("/login");
            axios.post("https://blog-server-5kb2.onrender.com/fetch-user", {
                em: em
            })
                .then((res) => {
                    if (res.data === "no-acc") {
                        nav("/login");
                    } else {
                        setUser(res.data);
                    }
                });
        };

        fetchData();
    }, [])

    //Fetch Posts
    useEffect(() => {
        const fetchUserData = () => {
            axios.post("https://blog-server-5kb2.onrender.com/fetch-user-posts", {
                user_id: user.id
            })
                .then((res) => {
                    if (res.data === "no_data") {
                        setPosts([]);
                    } else {
                        setPosts(res.data);
                    }
                });
        }
        if (first.current) {
            first.current = false;
        } else {
            fetchUserData();
        }
    }, [user])

    //Toggle Delete Box
    function toggleDel(x) {
        let conDel = document.getElementById("conDel");
        setCurrId(x);
        if (conDel.classList.contains("active")) {
            conDel.classList.remove("active");
        } else {
            conDel.classList.add("active");
        }
    }

    //Delete Post
    function delPost() {
        axios.post("https://blog-server-5kb2.onrender.com/del-post", {
            id: currId
        })
            .then((res) => {
                if (res.data === "error") {
                    err.innerText = "Couldn't Delete Post! Try again!";
                    toggleDel(0);
                } else {
                    err.innerText = "Post Deleted Successfully!";
                    toggleDel(0);
                    fetchPosts();
                    setTimeout(() => {
                        err.innerText = "";
                        console.log(posts);
                    }, 2000)
                }
            });
    }

    //Logout
    function logout(){
        delCookie("em");
        nav("/");
    }

    return (
        <>
            {/*Header */}
            <Navbar/>
            {/*Header End*/}
            <div className="dashboard">
                <div className="user-info">
                    <h1>Welcome, {user.name}</h1>
                    <p>{user.email}</p>
                </div>
                <div className="options">
                    <Link to={"/new-post"} state={user.id} className="new-post-button">Create New Blog Post</Link>
                    <p>Total posts: {posts.length}</p>
                    <button type="button" onClick={logout}>Logout</button>
                </div>
                <div className="post-grid">
                    {
                        posts.length !== 0 &&
                        posts.map((value, index) => (
                            <div key={index} className="post-card">
                                <h2>{value.title}</h2>
                                <p>{value.content}</p>
                                <p>{value.tags}</p>
                                <div className="options">
                                    <Link to={"/edit-post"} state={value.id} className="edit-post">Edit</Link>
                                    <button type="button" onClick={() => {
                                        toggleDel(value.id)
                                    }} className="del-post">Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        posts.length === 0 &&
                        <h2>No Posts Found</h2>
                    }
                </div>
                <p id="err"></p>

                <div className="confirm-del" id="conDel">
                    <span className="head">Confirm Delete?</span>
                    <div className="options">
                        <button type="button" className="del" onClick={delPost}>Delete</button>
                        <button type="button" onClick={() => {
                            toggleDel(0)
                        }}>Cancel
                        </button>
                    </div>
                </div>
            </div>
            {/*  Footer   */}
            <Footer/>
            {/*  Footer End  */}
        </>
    )
}