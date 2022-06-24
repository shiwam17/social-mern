import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to="/" >
          <RssFeed className="sidebarIcon"/>
          <span className="sidebarListItemText">Feed</span>
          </Link>
          </li>
          <li className="sidebarListItem">
            <Link to ='/'>
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to='/'>
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
            </Link>
          </li>
          
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />

      </div>
    </div>
  );
}
