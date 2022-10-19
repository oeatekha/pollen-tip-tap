import React, { useState } from "react";
import { Box, Button } from "grommet";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./SortableContent";

const img1 =
  "https://d2w9rnfcy7mm78.cloudfront.net/16282437/original_dcabb93a23b54b11f7a09ee29fad2bb1.jpg?1651354853?bc=0";
const img2 =
  "https://d2w9rnfcy7mm78.cloudfront.net/11878907/original_df38a957301648022aaaf97ccb56e553.jpg?1620426154?bc=0";
const img3 =
  "https://d2w9rnfcy7mm78.cloudfront.net/7991219/original_287b7a4b8bcbb9b30b2bc17d84326d37.jpg?1594673198?bc=0";
const img4 =
  "https://d2w9rnfcy7mm78.cloudfront.net/7407847/original_7ea3f7ba434613542c8075c0e6148439.png?1590325054?bc=0";

const urlList = [img1, img2, img3, img4];

const ChannelComponent = () => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1", "2", "3"]);
  const [urls, setUrls] = useState(urlList);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        console.log(items);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box
        flex={true}
        wrap={true}
        background="#fafafa"
        border="10px black"
        direction="row"
        style={{
          maxWidth: "720px",
          borderRadius: "5px",
          padding: "10px",
          paddingLeft: "15px"
        }}
      >
        <Box>
          {" "}
          {/* To do the Arena thing with the divs...*/}
          <div
            style={{
              width: "320px",
              height: "320px",
              //padding:"10px",
              borderRadius: "5px",
              backgroundColor: "#ededed",
              margin: "10px"
            }}
          >
            <p style={{ margin: "15px", textAlign: "center" }}> Add Block </p>
            <input style={{ width: "90%", margin: "13px" }} />
            <p></p>
            <Button style={{ left: "50px", textAlign: "center" }}>
              Add to Collection
            </Button>
          </div>
        </Box>

        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <SortableItem
              key={id}
              id={id}
              handle={true}
              value={id}
              urls={urlList}
            />
          ))}

          {/* <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: "transparent",
                  borderStyle: "solid",

                }}
              ></div>
            ) : null}
          </DragOverlay> */}
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default ChannelComponent;