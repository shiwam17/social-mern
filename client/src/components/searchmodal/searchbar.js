import React from 'react'
import './searchbar.css'
import { Link } from "react-router-dom";
import { useState } from "react";


export const Searchbar = ({ closeModal, user }) => {

  const [data, setData] = useState(user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  user
    .then(function (response) {
      console.log(response.data);
      setData(response.data)
    }
    )
    .catch(function (error) { console.log(error) })

  if (data.email == null) {
    return (
      <>
        <div className="modals">
          <div className="modal-header">
            <h2
              onClick={() => {
                closeModal(false);
              }}
            >
              X
            </h2>
            <div className="modal-body">
              <label className="notFound">User Not Found</label>
            </div>
          </div>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="modals">
          <div className="modal-header">
            <h2
              onClick={() => {
                closeModal(false);
              }}
            >
              X
            </h2>
          </div>
          <div className="modal-body">
            <Link to={`/profile/${data.username}`} ><br />

              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />

              <label forName="postContent" onClick={() => {
                closeModal(false);
              }}>{data.username}</label>
            </Link>
            <br /><br />
            <label forName="postContent">{data.email}</label>
          </div>
        </div>
      </>
    )
  }
};