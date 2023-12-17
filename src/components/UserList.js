import { useState } from "react";
import User from "./User";
import UserDetails from "./UserDetails";
import * as userService from '../services/userService';
import UserCreate from "./UserCreate";
import Delete from "./Delete";
import Pagination from "./Pagination";

export default function UserList({
    users,
    onUserCreateSubmit,
    onDeleteClick,
    onUserUpdateSubmit,
    formValues,
    formChangeHandler,
    formErrors,
    formValidate,
    sortTypeClick
}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showDeleteUser, setShowDeleteUser] = useState(null);
    const [showEditUser, setShowEditUser] = useState(null);

    const onInfoClick = (userId) => {
        userService.getUser(userId)
            .then(user => {
                setSelectedUser(user);
            });
    };

    const onClose = () => {
        setSelectedUser(null);
        setShowAddUser(false);
        setShowDeleteUser(false);
        setShowEditUser(false);
    };

    const onAddUserClick = () => {
        setShowAddUser(true);
    };

    const onUserCreateSubmitHandler = (e) => {
        onUserCreateSubmit(e);
        setShowAddUser(false);
    };

    const onUserUpdateSubmitHandler  = (e, userId) => {
        onUserUpdateSubmit(e, userId);
        setShowEditUser(false);
    };

    const onDeleteUserClick = (userId) => {
        setShowDeleteUser(userId);
    };

    const onDeleteHandler = () => {
        onDeleteClick(showDeleteUser);
        onClose();
    };

    const onEditClick = async (userId) => {
        const user = await userService.getUser(userId);
        setShowEditUser(user);
    };

    return (
        <>
            {selectedUser && <UserDetails {...selectedUser} onClose={onClose} />}
            {showAddUser && <UserCreate onClose={onClose} onUserCreateSubmit={onUserCreateSubmitHandler} formValues={formValues} formChangeHandler={formChangeHandler} formErrors={formErrors} formValidate={formValidate} />}
            {showDeleteUser && <Delete onClose={onClose} onDelete={onDeleteHandler} />}
            {showEditUser && <UserCreate user={showEditUser} onClose={onClose} onUserCreateSubmit={onUserUpdateSubmitHandler} formValues={formValues} formChangeHandler={formChangeHandler} formErrors={formErrors} /> }
            <div className="table-wrapper">
                {/* <!-- Overlap components  --> */}

                {/* <!-- <div className="loading-shade"> -->
                    <!-- Loading spinner  -->
                    <!-- <div className="spinner"></div> -->
    
                    <!-- No users added yet  -->
    
                    <!-- <div className="table-overlap">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="triangle-exclamation"
                            className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                            ></path>
                        </svg>
                        <h2>There is no users yet.</h2>
                    </div> --> */}

                {/* <!-- No content overlap component  --> */}

                {/* <!-- <div className="table-overlap">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="triangle-exclamation"
                            className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                            ></path>
                        </svg>
                        <h2>Sorry, we couldn't find what you're looking for.</h2>
                    </div> --> */}

                {/* <!-- On error overlap component  --> */}

                {/* <!-- <div className="table-overlap">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="triangle-exclamation"
                            className="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
                            ></path>
                        </svg>
                        <h2>Failed to fetch</h2>
                    </div> -->
                    <!-- </div> --> */}

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th onClick={() => sortTypeClick('firstName')}>
                                First name
                                <svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    
                                </svg>
                            </th>
                            <th onClick={() => sortTypeClick('lastName')}>
                                Last name<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                   
                                </svg>
                            </th>
                            <th onClick={() => sortTypeClick('email')}>
                                Email<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    
                                </svg>
                            </th>
                            <th onClick={() => sortTypeClick('phoneNumber')}>
                                Phone<svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    
                                </svg>
                            </th>
                            <th onClick={() => sortTypeClick('createdAt')}>
                                Created
                                <svg className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                   
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- Table row component --> */}
                        {users.map(user => <User key={user._id} {...user} onInfoClick={onInfoClick} onDeleteUserClick={onDeleteUserClick} onEditUserClick={onEditClick} />)}
                    </tbody>
                </table>
            </div>
            <button className="btn-add btn" onClick={onAddUserClick}>Add new user</button>
            <Pagination />
        </>
    );
}