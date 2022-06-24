import "./post.css";
import {  MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Dropdown } from 'react-bootstrap';
import { useRef } from "react";
import { ReactDimmer } from "react-dimmer";
import { Modal } from "../modal/Modal";


export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isModalOpen, setModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('')
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const { Comments } = useRef
  
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId, post]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const deletePost = () => {
    try {
      axios.delete(`/posts/${post._id}/${currentUser._id}`);
    } catch (err) { }

  }
  const commentHandler = () => {
    try {
      axios.put(`http://localhost:8800/api/comment/createComment`, { comment, post_id: post._id, user_id: currentUser._id })
    } catch (err) { }
  }

  const handleModal = () => {
    setModal((prevState) => !prevState)
  }

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="postUsername">{user.username}</span>
              </Link>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>

            <div className="postTopRight">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <MoreVert />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleModal} >Edit</Dropdown.Item><br />
                  {/* <Dropdown.Item >Spam</Dropdown.Item><br /> */}
                  <Dropdown.Item onClick={deletePost}>Delete</Dropdown.Item><br />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={PF + post.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={`${PF}like.png`}
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">{like} likes</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comments[0]?.comment}</span><br />
              <span className="postCommentText">{post.comments[1]?.comment}</span><br />
              <span className="postCommentText">{post.comments[2]?.comment}</span><br />
              <input
                placeholder={"Comment " + user.username + "?"}
                className="shareInput"
                ref={Comments}
                onClick={commentHandler}
                onChange={(e) => setComment(e.target.value)}
              />
              {console.log(comment)}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={setModal} post={post} />}
      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={100}
        blur={1.5}
      />
    </>
  );
}
