import React from 'react';
import '../profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector} from 'react-redux'
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'



const Profile = () => {
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    return (
        <div>
            <div className="container mt-5">

                <div className="row d-flex justify-content-center">

                    <div className="col-md-7">

                        <div className="card p-3 py-4">

                            <div className="text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" width="100" className="rounded-circle" alt="Profile" />
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

                                <div className="buttons">

                                <div className="d-flex justify-content-center"> {/* Centering the button */}
                                <button className="btn btn-outline-primary px-4">Add Image</button>
                            </div>                                </div>


                            </div>




                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;
