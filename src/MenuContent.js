import Link from "next/link";
import { useEffect, useState } from "react";
import ChannelContents from "./ChannelContent";
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
  const [channel, setChannel] = useState("");
  const [chanMeta, setChanMeta] = useState({});
  const [type, setType] = useState("PROFILE");

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
          .then((userData) => {
            // filter for public channel
            userData = userData.filter(
              (channel) => channel.status !== "private"
            );
            setUserData(userData);
            setLoading(false);
            setLoaded(true);
            setType("PROFILE");
            console.log(userData);
          });
      })
      .catch((err) => setLoading(false));
  };

  const buildReqParams = (channelObj) => {
    let page = 0;
    let paramList = [];
    while (page * 100 < channelObj.length) {
      page += 1;
      paramList.push({ page: page, per: 100 });
    }
    return paramList;
  };

  const getRestOfChannel = async (chanObj) => {
    let paramList = buildReqParams(chanObj);
    Promise.all(
      paramList.map((param) => arena.channel(channel).get(param))
    ).then((responses) => {
      console.log("😀", responses);

      let contentList = [];
      for (let response of responses) {
        contentList = [...contentList, ...response.contents];
      }
      console.log(contentList);

      setChannelData(contentList);
      setType("CHANNEL");
      setLoading(false);
      setLoaded(true);
    });
  };

  const getChannel = (channel) => {
    arena
      .channel(channel)
      .get({ page: 1, per: 100 })
      .then((chan) => {
        setChanMeta(chan);
        getRestOfChannel(chan);
      })
      .catch((err) => setLoaded(false));
  };

  const onUsernameSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getUser(username);
  };

  const onChannelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getChannel(channel);
  };

  return (
    <div className="border-l-2 w-[800px] justify-start overflow-scroll">
      {!isLoading && !isLoaded ? (
        <div className="p-8">
          <h1>Enter Username</h1>
          <form onSubmit={onUsernameSubmit}>
            <input
              type="text"
              className="border-hidden focus:outline-none bg-slate-200 m-4 p-2"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="hover:cursor-pointer"
              type="submit"
              value="Pull Are.na Profile"
            />
          </form>
          <h1>Enter Channel Slug</h1>
          <form onSubmit={onChannelSubmit}>
            <input
              type="text"
              className="border-hidden focus:outline-none bg-slate-200 m-4 p-2"
              onChange={(event) => setChannel(event.target.value)}
            />
            <input
              className="hover:cursor-pointer"
              type="submit"
              value="Pull Are.na Channel"
            />
          </form>
        </div>
      ) : (
        <div>
          {isLoaded ? (
            <div>
              {type === "PROFILE" ? (
                <UserContents
                  editor={props.editor}
                  username={username}
                  publicChannels={userData}
                />
              ) : (
                <ChannelContents
                  editor={props.editor}
                  channelObj={chanMeta}
                  contents={channelData}
                />
              )}
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
