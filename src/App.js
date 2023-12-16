import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import UserList from "./components/UserList";
import './App.css';
import { useEffect, useState } from "react";
import * as userService from './services/userService';

function App() {
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

  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
          <UserList users={users} onUserCreateSubmit={onUserCreateSubmit} onDeleteClick={onDeleteClick} onUserUpdateSubmit={onUserUpdateSubmit} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
