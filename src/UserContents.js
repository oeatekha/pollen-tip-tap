import Link from "next/link";
import { useEffect, useState } from "react";

export const UserContents = (props) => {
  const embedChannel = (channel) => {
    let user = channel.user.slug;
    console.log(
      `<iframe src="https://www.are.na/${user}/${channel.slug}/embed"></iframe>`
    );
    props.editor.commands.insertContent(
      `<iframe src="https://www.are.na/${user}/${channel.slug}/embed"></iframe>`
    );
  };

  return (
    <div className="w-full p-4 text-left overflow-y-scroll overflow-x-hidden">
      <div className="bg-gray-100 w-fit px-2 py-1">are.na/{props.username}</div>
      <hr className="translate-x-[-50px] w-[700px] mt-4 mb-4 bg-gray-300"></hr>

      {props.publicChannels.map((channel) => (
        <div key={channel.id.toString()} className="my-8 ">
          <div className="w-full my-2  flex justify-between">
            <div className="hover:underline hover: cursor-pointer">
              {channel.title}
            </div>
            <div
              onClick={() => embedChannel(channel)}
              className="bg-gray-200 px-2 border-radius-2 hover:bg-gray-300 hover:cursor-pointer"
            >
              {" "}
              +{" "}
            </div>
          </div>

          {/* catch if there is no content preview */}
          {channel.contents !== null && (
            <div>
              <div className="flex flex-shrink-0 flex-row overflow-x-scroll">
                {channel.contents.map((block) => (
                  <div key={block.id.toString()} className="flex-shrink-0">
                    {block.image && (
                      <img
                        className="w-16 h-16 object-cover mr-2"
                        src={block.image.square.url}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserContents;
