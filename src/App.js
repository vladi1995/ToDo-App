import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import UserList from "./components/UserList";
import './App.css';
import { useEffect, useState } from "react";
import * as userService from './services/userService';

function App() {
  const [sortType, setSortType] = useState('asc');

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers()
      .then(users => setUsers(users))
      .catch(err => console.log('Error ' + err));
  }, []);

  const onUserCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const createdUser = await userService.create(data);

    setUsers(oldUsers => [...oldUsers, createdUser]);
  };

  const onUserUpdateSubmit = async (e, userId) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const updatedUser = await userService.edit(userId, data);

    setUsers(oldUsers => oldUsers.map(x => x._id === userId ? updatedUser : x));
  };

  const onDeleteClick = async (userId) => {
    await userService.del(userId);
    setUsers(oldUsers => oldUsers.filter(x => x._id !== userId));
  };

  const formChangeHandler = (e) => {
    setFormValues(state => ({...state, [e.target.name]: e.target.value}));
  };

  const formValidate = (e) => {
    const value = e.target.value;
    let errors = {};

    if (e.target.name === 'firstName' && (value.length < 3 || value.length > 20)) {
      errors.firstName = 'First name should be between 3 and 20 characters';
    }

    if (e.target.name === 'lastName' && (value.length < 3 || value.length > 20)) {
      errors.lastName = 'Last name should be between 3 and 20 characters';
    } 

    setFormErrors(errors);
  };

  const sortTypeClick = (sortTypeFromUserList) => {
    userService.getAllUsers(sortTypeFromUserList, sortType)
    .then(users => setUsers(users))
      .catch(err => console.log('Error ' + err));
      setSortType(sortType => sortType === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
          <UserList
            users={users} 
            onUserCreateSubmit={onUserCreateSubmit} 
            onDeleteClick={onDeleteClick}
            onUserUpdateSubmit={onUserUpdateSubmit} 
            formValues={formValues}
            formChangeHandler={formChangeHandler} 
            formErrors={formErrors}
            formValidate={formValidate}
            sortTypeClick={sortTypeClick}
            />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
