import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, reset,editUser } from '../features/adminAuth/adminAuthSlice';
import { FaSignInAlt, } from 'react-icons/fa'

import './table.css'


const UserList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.users);
    const isLoading = useSelector((state) => state.admin.isLoading);

    useEffect(() => {
        dispatch(getAllUsers());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    // 


    const handleEdit = (userId, name, email) => {
        const newName = prompt("Enter new name:", name);
        const newEmail = prompt("Enter new Email:", email);
        if (newName === null || newEmail === null) {
            return;
        }
        if (newEmail && newName) {
            dispatch(editUser({ userId, name: newName, email: newEmail }));
            dispatch(getAllUsers())
        }
    };

    return (

        <div>
            <table className="table-container">
                <tbody>
                    <tr className="table-row">
                        <th className="table-cell-header">sl no</th>
                        <th className="table-cell-header">photo</th>
                        <th className="table-cell-header">name</th>
                        <th className="table-cell-header">Email</th>
                        <th className="table-cell-header">edit</th>
                    </tr>
                    {users && users.map((user, index) => (
                        <tr className="table-row" key={index}>
                            <td className="table-cell">{index + 1}</td>
                            <td className="table-cell">
                                <img
                                    height={'100px'}
                                    width={'100px'}
                                    src={user?.profileUrl ? user.profileUrl : 'https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg'}
                                    alt='profile'
                                />
                            </td>
                            <td className="table-cell">{user.name}</td>
                            <td className="table-cell">{user.email}</td>
                            <td className="table-cell action-button">
                                <div className='button'>
                                                                        <button className='btn btn-block' onClick={() => handleEdit(user._id, user.name, user.email)}>Edit</button>

                                    <button className='btn btn-block' onClick={() => handleEdit(user._id, user.name, user.email)}>Edit</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {!users && (
                        <tr className="table-row">
                            <td className="table-cell" colSpan="5">No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>



    );
};

export default UserList;
