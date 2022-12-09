import React from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Circle, Rect, Text } from "react-konva";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false
  }));
}

const INITIAL_STATE = generateShapes();

const App = () => {
  const [circles, setCircles] = React.useState(INITIAL_STATE);
  const [rects, setRects] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: circle.id === id
        };
      })
    );
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: rect.id === id
        };
      })
    );
  };

  const handleDragEnd = (e) => {
    setCircles(
      circles.map((circle) => {
        return {
          ...circle,
          isDragging: false
        };
      })
    );
    setRects(
      rects.map((rect) => {
        return {
          ...rect,
          isDragging: false
        };
      })
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Floor Plan simulator" />
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            id={circle.id}
            x={30}
            y={50}
            radius={10}
            fill="#FC0FC0"
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={circle.isDragging ? 10 : 5}
            shadowOffsetY={circle.isDragging ? 10 : 5}
            scaleX={circle.isDragging ? 1.2 : 1}
            scaleY={circle.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}

        {rects.map((rect) => (
          <Rect
            key={rect.id}
            id={rect.id}
            x={80}
            y={35}
            width={40}
            height={30}
            fill="#89b717"
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={rect.isDragging ? 10 : 5}
            shadowOffsetY={rect.isDragging ? 10 : 5}
            scaleX={rect.isDragging ? 1.2 : 1}
            scaleY={rect.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}

        <svg width={600} height={600}>
          <Rect
            x={100}
            y={100}
            ill="none"
            stroke="purple"
            stroke-width="30"
            width={500}
            height={300}
          />
        </svg>
      </Layer>
    </Stage>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
