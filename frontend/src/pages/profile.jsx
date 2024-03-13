import React, { useEffect, useState } from 'react';
import '../profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { profileUpdate } from '../features/auth/authSlice';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
     
        if (!user) {

            navigate('/login');
        }
    }, [user, navigate, dispatch]);

    const [image, setImage] = useState('');

    const uploadImage = (e) => {
        e.preventDefault();
        if (!image) {
            alert("Please upload a file");
            return;
        }

        const data = new FormData();
        data.append('file', image);
        data.append("upload_preset", "elellcsz");
        data.append("cloud_name", "dzkpcjjr8");

        fetch("https://api.cloudinary.com/v1_1/dzkpcjjr8/image/upload", {
            method: "post",
            body: data,
        })
            .then((resp) => resp.json())
            .then((data) => {
                dispatch(profileUpdate(data.url));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-3 py-4">
                            <div className="text-center">
                            <img
                                    src={
                                        user?.profileUrl
                                            ? user.profileUrl
                                            : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
                                    }
                                    alt="profile"
                                    style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                                />
                            </div>
                            <div className="text-center mt-3">
                                <h5 className="mt-2 mb-0"> {user && user.name}</h5>
                                <span> {user && user.email}</span>
                                <ul className="social-list">
                                    <li><i className="fa fa-facebook"></i></li>
                                    <li><i className="fa fa-dribbble"></i></li>
                                    <li><i className="fa fa-instagram"></i></li>
                                    <li><i className="fa fa-linkedin"></i></li>
                                    <li><i className="fa fa-google"></i></li>
                                </ul>

                                <div className="upload-button">
                                    <div className="custom-file-upload">
                                        <label htmlFor="profile" className="custom-button">
                                            Choose File
                                        </label>
                                        <input
                                            onChange={(e) => setImage(e.target.files[0])}
                                            type="file"
                                            name="profile"
                                            id="profile"
                                            className="hidden-input"
                                        />
                                    </div>
                                    <br />
                                    <br></br>
                                    <div className="buttons">
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-outline-primary px-4" onClick={uploadImage}>Add Image</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
