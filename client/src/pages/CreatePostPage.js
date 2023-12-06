import React, {useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import axios, {options} from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function CreatePostPage() {

    //Get ID
    let id = useLocation().state;

    //Nav
    let nav = useNavigate();

    //States
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        tags: '',
        category: '',
        user_id: id
    });

    const [cat, setCat] = useState([]);

    //handle Input Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let err = document.getElementById("err");
        let words = postData.content.split(" ");
        words = words.slice(0,300);
        postData.content = words.join(" ");
        axios.post("https://blog-server-5kb2.onrender.com/create-post", postData)
            .then((res) => {
                if (res.data === "error") {
                    err.innerText = "Something went wrong! Try again!";
                } else if (res.data === "success") {
                    err.innerText = "New Post Created!";
                    setTimeout(() => {
                        err.innerText = "";
                        nav("/dashboard");
                    }, 2000);
                }
            });
    };

    //Get Categories
    useEffect(() => {
        const getCategory = () => {
            axios.get("https://blog-server-5kb2.onrender.com/get-categories")
                .then((res) => {
                    setCat(res.data);
                });
        }

        getCategory();
    }, [])

    return (
        <>
            <Navbar/>
            <div className="create-post-page">
                <header className="header">
                    <h1>Create a New Post</h1>
                </header>

                <form onSubmit={handleSubmit} className="post-form">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={postData.tags}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="category">Categories</label>
                    <select name="category" id="category" onChange={handleChange}>
                        <option value="#">Select a category</option>
                        {
                            cat.map(((value, index) => {
                                return (
                                    <option value={value.category}>{value.category}</option>
                                )
                            }))
                        }
                    </select>

                    <button id="createpost" type="submit">Create Post</button>
                </form>
                <p id="err"></p>
            </div>
            <Footer/>
        </>
    );
}

export default CreatePostPage;
