// import logo from "./logo.svg";
import "./App.css";
import VideoJSPlayer from "./components/VideoJSPlayer";
import { useRef } from "react";

function App() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    controlBar: {
      skipButtons: { forward: 10, backward: 10 },
    },
    responsive: true,
    fluid: true,
    userActions: {
      doubleClick: () => console.log("dblClick"),
    },
    // nativeControlsForTouch: true,
    sources: [
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handleSeek = (e, player) => {
    e.preventDefault();
    const playerWidth = player.currentWidth();
    if (0.66 * playerWidth < e.offsetX) {
      player.currentTime(player.currentTime() + 10);
    } else if (e.offsetX < 0.33 * playerWidth) {
      player.currentTime(
        player.currentTime() - 10 < 0 ? 0 : player.currentTime() - 10
      );
    }
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("dblclick", (e) => handleSeek(e, player));

    let tapedTwice = false;
    let tappedPlace = -1;

    player.on("touchend", (e) => {
      const offsetX = e.changedTouches[0].pageX;
      const checkTwice = () => {
        if (!tapedTwice) {
          tapedTwice = true;
          tappedPlace = offsetX;
          setTimeout(function () {
            tapedTwice = false;
            tappedPlace = -1;
          }, 300);
          return false;
        }
        return true;
      };
      if (!checkTwice()) return;
      const playerWidth = player.currentWidth();

      if (0.66 * playerWidth < offsetX && 0.66 * playerWidth < tappedPlace) {
        player.currentTime(player.currentTime() + 10);
      } else if (
        offsetX < 0.33 * playerWidth &&
        tappedPlace < 0.33 * playerWidth
      ) {
        player.currentTime(
          player.currentTime() - 10 < 0 ? 0 : player.currentTime() - 10
        );
      }
    });
  };

  return (
    <div className="App">
      <h1>10Sec Video.js Plugin</h1>
      <div
        className="App"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      </div>
    </div>
  );
}

export default App;
