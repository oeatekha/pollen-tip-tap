import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Block from "./Block";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

const INIT_COLS = 3;

export const ChannelContents = (props) => {
  const [gridCols, setGridCols] = useState(INIT_COLS);
  const [blockHeight, setBlockHeight] = useState(800 / INIT_COLS);
  const calculateBlockWidth = (val) => {
    const blockHeight = (window.innerWidth * 10) / 12 / val - 2;
    setBlockHeight(blockHeight);
  };

  return (
    <div className="font-sans w-full mx-auto ">
      {/*⭐️ FILTER BAR */}
      <div className="w-full px-1/12 sticky top-0 p-4 ">
        <div className="bg-gray-100 w-fit px-2 py-1">
          are.na / {props.channelObj.user.slug} / {props.channelObj.slug}
        </div>

        {/* <Slider
              defaultValue={INIT_COLS}
              focusThumbOnChange={false}
              min={1}
              max={30}
              step={1}
              onChange={(val) => {
                console.log(val);
                setGridCols(val);
              }}
            >
              <SliderTrack bg="black">
                <SliderFilledTrack bg="black" />
              </SliderTrack>
              <SliderThumb />
            </Slider> */}
      </div>

      {/*⭐️ CONTRIBUTION GRID */}
      <div
        className="grid w-full auto-rows-min pb-20 "
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
        {props.contents.map((block) => (
          <div key={block.id.toString()}>
            <Block
              editor={props.editor}
              block={block}
              chanId={props.channelObj.id}
              blockHeight={165}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelContents;
