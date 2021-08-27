import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { showToast } from "../../utils/tools";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "./sideNavigation";
import { clearNotification } from "../../store/actions";
import { signOut } from "../../store/actions/users_action";
import { appLayout } from "../../store/actions/site_actions";

const Header = (props) => {
  const [layout, setLayout] = useState("");
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const users = useSelector((state) => state.users);

  const signOutUser = () => {
    dispatch(signOut());
    props.history.push("/");
  };

  useEffect(() => {
    let pathArray = props.location.pathname.split("/");
    if (pathArray[1] === "dashboard") {
      setLayout("dash_layout");
      dispatch(appLayout("dash_layout"));
    } else {
      setLayout("");
      dispatch(appLayout(""));
    }
  }, [props.location.pathname, dispatch]);

  useEffect(() => {
    if (notifications && notifications.error) {
      const msg = notifications.msg ? notifications.msg : "Error";
      showToast("ERROR", msg);
      dispatch(clearNotification());
    }
    if (notifications && notifications.success) {
      const msg = notifications.msg ? notifications.msg : "Done !!";
      showToast("SUCCESS", msg);
      dispatch(clearNotification());
    }
  }, [notifications, dispatch]);

  return (
    <>
      <nav className={`navbar fixed-top px-5 ${layout}`}>
        <Link
          style={{ fontFamily: "Fredoka One" }}
          to="/"
          className="navbar-brand d-flex align-items-center"
        >
          FlickBase
        </Link>
        <SideDrawer users={users} signOutUser={signOutUser} />
      </nav>
    </>
  );
};

export default withRouter(Header);
