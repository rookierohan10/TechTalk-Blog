import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

export const Home = () => {

    //states
    const [posts, setPosts] = useState([]);
    const [relPosts, setRelPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const [cri, setCri] = useState('');

    //Err
    let err = document.getElementById("err");

    //Refs
    const first = useRef(true);

    //Fetch Posts
    useEffect(() => {
        const fetchPosts = () => {
            axios.get("https://blog-server-5kb2.onrender.com/fetch-posts")
                .then((res) => {
                    if (res.data === "no_data") setPosts([]);
                    else setPosts(res.data);
                });
        }

        fetchPosts();
    }, [])

    //Search Function
    function searchPosts() {
        if (search) {
            err.innerText = "";
            setActive(true);
            axios.post("https://blog-server-5kb2.onrender.com/search", {search: search})
                .then((res) => {
                    if (res.data === "no_data") {
                        setRelPosts([]);
                    } else {
                        setRelPosts(res.data);
                    }
                })
        } else {
            err.innerText = "Please enter a keyword!"
        }
    }

    //Set Sorting Criteria
    function setCriteria(x) {
        setCri(x);
        if (active) {
            if (x === "rel") {
                let lowSearch = search.toLowerCase();
                const rankedPosts = relPosts.map((curr) => {
                    let points = 0;

                    if (curr.title.toLowerCase().includes(lowSearch)) points += 2;
                    if (curr.content.toLowerCase().includes(lowSearch)) points += 4;
                    if (curr.tags.toLowerCase().includes(lowSearch)) points += 2;

                    return {...curr, points};
                }).sort((a, b) => b.points - a.points);
                setRelPosts(rankedPosts);
            }
            if (x === "date") {
                const rankedPosts = relPosts.sort((a, b) => parseInt(b.created_at.substring(11, 13)) - parseInt(a.created_at.substring(11, 13)));
                setRelPosts(rankedPosts);
            }
            if (x === "cat") {
                const rankedPosts = relPosts.sort((a, b) => (a.category > b.category ? 1 : -1));
                setRelPosts(rankedPosts);
            }
        } else {
            if (x === "date") {
                const rankedPosts = posts.sort((a, b) => parseInt(b.created_at.substring(11, 13)) - parseInt(a.created_at.substring(11, 13)));
                setPosts(rankedPosts);
            }
            if (x === "cat") {
                const rankedPosts = posts.sort((a, b) => (a.category > b.category ? 1 : -1));
                setPosts(rankedPosts);
            }
        }

    }

    return (
        <>
            {/*Header*/}
            <Navbar/>
            {/*Header End*/}
            <div className="home">
                <div>
                    {/* Hero Section */}
                    <section className="hero">
                        <header>
                            <h1>Welcome to TechTalk</h1>
                        </header>
                        <p className="tagline">Explore the world of development through insightful blog posts.</p>
                        <Link to={"/register"} className="cta-button">Get Started</Link>
                    </section>
                    <div className="layeredborder">
                        <img src="client/public/assets/layeredimg.png" alt=""/>
                    </div>
                    {/* Feed Section */}
                    <section className="feed">
                        <div className="search">
                            <div className="left">
                                <form>
                                    {/* <label htmlFor="search">Search</label> */}
                                    <input type="text" name="search" id="search" placeholder="Search..." onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}/>
                                </form>
                                <button type="button" id="centrebutton" onClick={searchPosts}>Search</button>
                                <button type="button" id="rightbutton" onClick={() => {
                                    setActive(false);
                                }}>Clear Search
                                </button>
                                <p id="err"></p>
                            </div>
                            <div className="right">
                                <div className="button-group">
                                    <button type="button" className={cri === 'date' ? 'active' : ''} onClick={() => {
                                        setCriteria("date")
                                    }}>Date
                                    </button>
                                    <button type="button" className={cri === 'rel' ? 'active' : ''} onClick={() => {
                                        setCriteria("rel")
                                    }}>Relevance
                                    </button>
                                    <button type="button" className={cri === 'cat' ? 'active' : ''} onClick={() => {
                                        setCriteria("cat")
                                    }}>Categories
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Responsive Grid */}
                        <div className="feed-grid">
                            {/* Card 1 */}
                            {
                                !active &&
                                posts.map(((value, index) => {
                                    return (
                                        <div className="card" key={index}>
                                            <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog Post 1"/>
                                            <h2>{value.title}</h2>
                                            <p className="description">{value.content.substring(0, 25)}</p>
                                            <p className="description">Tags: {value.tags}</p>
                                            <p className="description">Category: {value.category}</p>
                                            <p className="description">Posted: {value.created_at.substring(0, 19)}</p>
                                            <div className="feedback">
                                                <button className="like-button">Like</button>
                                                <button className="dislike-button">Dislike</button>
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                            {
                                active && relPosts.length === 0 &&
                                <h2>Loading...</h2>
                            }
                            {
                                active && relPosts.length !== 0 &&
                                relPosts.map(((value, index) => {
                                    return (
                                        <div className="card" key={index}>
                                            <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog Post 1"/>
                                            <h2>{value.title}</h2>
                                            <p className="description">{value.content.substring(0, 25)}</p>
                                            <p className="description">Tags: {value.tags}</p>
                                            <p className="description">Category: {value.category}</p>
                                            <p className="description">Posted: {value.created_at.substring(0, 19)}</p>
                                            <div className="feedback">
                                                <button className="like-button">Like</button>
                                                <button className="dislike-button">Dislike</button>
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                            {
                                posts.length === 0 &&
                                <h2>No Posts Found!</h2>
                            }
                        </div>
                    </section>
                </div>
            </div>
            {/*  Footer  */}
            <Footer/>
            {/*  Footer End  */}
        </>
    )
}