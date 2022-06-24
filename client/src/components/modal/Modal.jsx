import * as React from "react";
import './modal.css';
import axios from "axios";
import { useState } from "react";

function refreshPage() {
  window.location.reload(false);
}

export const Modal = ({ closeModal, post }) => {

  const [input, setInput] = useState('')

  function postUpdate(post) {
    try {
      axios.put(`http://localhost:8800/api/posts/${post._id}`, { desc: input })
    } catch (err) { }
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2
          onClick={() => {
            // closeModal(!modal);
          }}
        >
          X
        </h2>
      </div>
      <div className="modal-body">
        <label forName="postContent">Edit : </label>
        <input type="text"
          defaultValue={post.desc}
          className="postContent"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              closeModal(false);
              postUpdate(post);
              refreshPage()
            }
          }
          }
        ></input>
        <input type="submit" className="" onClick={() => {
          closeModal(false);
          postUpdate(post);
          refreshPage()
        }} ></input>
      </div>
    </div>
  );
};
