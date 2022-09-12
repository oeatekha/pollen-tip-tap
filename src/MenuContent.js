import Link from "next/link";
import { useEffect, useState } from "react";
import UserContents from "./UserContents";

const Arena = require("are.na");
const arena = new Arena({
  accessToken: "jOjmF09t2R8a_7pB-5u6VnexekhMzrtLoVVDoUityBg",
});

const embedStr =
  '<iframe class="arena-iframe" width="100%" height="2090" src="https://www.are.na/pollen/pollen-brand/embed"></iframe>';

export const HeaderMenu = (props) => {
  const [menuClicked, setMenuClicked] = useState(false);
  const [username, setUsername] = useState("");

  const [userData, setUserData] = useState({});
  const [channelData, setChannelData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const getUser = (username) => {
    setLoading(true);

    console.log(username);
    arena
      .user(username)
      .get()
      .then((userObj) => {
        setUserData(userObj);
        arena
          .user(username)
          .channels({ page: 1, per: 100 })
          .then((channelData) => {
            // filter for public channel
            channelData = channelData.filter(
              (channel) => channel.status !== "private"
            );
            setChannelData(channelData);
            setLoading(false);
            setLoaded(true);
            console.log(channelData);
          });
      })
      .catch((err) => setLoading(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
    console.log(username);

    getUser(username);

    // props.editor.commands.insertContent(embedStr);
    // props.editor.commands.insertContent({
    //   type: "heading",
    //   attrs: {
    //     level: 1,
    //   },
    //   content: [
    //     {
    //       type: "text",
    //       text: "Example Text",
    //     },
    //   ],
    // });
  };

  return (
    <div className="border-l-2 w-[800px] justify-start overflow-scroll">
      {!isLoading && !isLoaded ? (
        <div className="p-8">
          <h1>Enter Username</h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="border-hidden focus:outline-none bg-slate-200 m-4 p-2"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="hover:cursor-pointer"
              type="submit"
              value="Pull Are.na Contents"
            />
          </form>
        </div>
      ) : (
        <div>
          {isLoaded ? (
            <div>
              <UserContents
                editor={props.editor}
                username={username}
                publicChannels={channelData}
              />{" "}
            </div>
          ) : (
            <div className="p-8">Loading... </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
