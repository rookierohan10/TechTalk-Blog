import React, {useEffect, useState} from 'react';
import {Navbar} from "../components/Navbar";
import {Footer} from "../components/Footer";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function EditPostPage() {

    //Navigator
    let nav = useNavigate();

    //Get Post ID
    let post_id = useLocation().state;

    //States
    const [postData, setPostData] = useState([]);
    const [cat, setCat] = useState([]);

    let err = document.getElementById("err");

    //Get Post Details
    useEffect(() => {
        axios.post("https://blog-server-5kb2.onrender.com/get-post-details", {
            id: post_id
        })
            .then((res) => {
                if (res.data === "no-data") {
                    err.innerText = "Something went wrong!"
                } else {
                    console.log(res.data);
                    setPostData(res.data[0]);
                }
            })
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://blog-server-5kb2.onrender.com/edit-post", postData)
            .then((res) => {
                if (res.data === "error") {
                    err.innerText = "Something went wrong!";
                } else {
                    err.innerText = "Post Edited Successfully!";
                    setTimeout(() => {
                        nav("/dashboard");
                    }, 2000)
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
            <div className="edit-post-page">
                <header className="header">
                    <h1>Edit Post</h1>
                </header>

                <form onSubmit={handleSubmit} className="post-form">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={postData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        defaultValue={postData.content}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        defaultValue={postData.tags}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="categories">Categories</label>
                    <select name="categories" id="categories">
                        <option value="#">Select a category</option>
                        <option value={postData.category} selected="true">{postData.category}</option>
                        {
                            cat.map(((value, index) => {
                                return (
                                    <option value={value.category} key={index}>{value.category}</option>
                                )
                            }))
                        }
                    </select>

                    <button id='createpost' type="submit">Save Changes</button>
                </form>
                <p id="err"></p>
            </div>
            <Footer/>
        </>
    )
}

export default EditPostPage;
