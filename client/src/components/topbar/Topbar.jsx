import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ReactDimmer } from "react-dimmer";
import { Searchbar } from "../searchmodal/searchbar";

function deleteAllCookies() {
  window.localStorage.clear();
  window.location.href = '/login'
}

export default function Topbar() {
  const [input, setInput] = useState('')
  const [isModalOpen, setModal] = useState(false)
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [newUser, setNewUser] = useState()

  const handleModal = () => {
    setModal((prevState) => !prevState)
  }
  
  function findUser() {
    try {
     setNewUser(axios.get(`http://localhost:8800/api/users/?username=${input}`))
      newUser
        .then(function (response) {
          console.log(response.data);
        }
        )
        .catch(function (error) { console.log(error) })

    } catch (err) { }
  }

  return (
    <>
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e) => setInput(e.target.value)}
            onClick={() => {
              findUser()
              // handleModal()
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                findUser();
                handleModal()
              }
            }}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <Link to='/login'>
          <button onClick={deleteAllCookies}>logout</button>
        </Link>
      </div>
    </div>
    {isModalOpen && <Searchbar closeModal={setModal} user={newUser} />}
      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={100}
        // blur={1.5}
     />
     </>
  );
}
