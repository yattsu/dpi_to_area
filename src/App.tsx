import { useEffect, useState } from "react";
import "./App.css";
import windows_sensitivity from "../public/windows_sensitivity.png";

function App() {
  const [dpi, setDpi] = useState(800);
  const [windowsSens, setWindowsSens] = useState(6);
  const [windowsSensHelpActive, setWindowsSensHelpActive] = useState(false);
  const [displayArea, setDisplayArea] = useState({ width: 1920, height: 1080 });
  const [tabletArea, setTabletArea] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const calculatedSens: number = windowsSens === 6
      ? 1
      : windowsSens < 6
      ? 1 - (6 - windowsSens) * 0.25
      : (windowsSens - 6) * 0.5 + 1;
    let tabletWidth: number = Number(
      (displayArea.width / (dpi * calculatedSens) * 25.4).toFixed(3),
    );
    let tabletHeight: number = Number(
      (displayArea.height / (dpi * calculatedSens) * 25.4).toFixed(3),
    );

    setTabletArea({ width: tabletWidth, height: tabletHeight });
  }, [dpi, windowsSens, displayArea]);

  return (
    <div className="flex flex-col transition-all justify-center items-center gap-16 lg:gap-32 text-gray-300 w-full h-full">
      <div className="max-w-[400px] lg:max-w-[930px] text-left text-xl text-gray-400">
        This tool is used to calculate a graphic tablet area from a mouse DPI,
        while keeping the same sensitivity. It is especially useful if the
        tablet is used in games, because the transition will be easier for the
        user.
      </div>
      <div className="flex flex-col transition-all lg:flex-row justify-center items-center gap-16 lg:gap-32">
        <div className="flex flex-col transition-all gap-2 min-w-[400px] w-full">
          <div className="flex flex-col items-start">
            <label className="text-sm">DPI</label>
            <input
              className="w-20 px-2 py-1 rounded outline-none"
              type="number"
              min={0}
              max={100000}
              step={50}
              defaultValue={dpi}
              onChange={(e) => setDpi(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm">Windows pointer speed</label>
            <div className="flex items-center gap-2">
              <input
                className="w-20 px-2 py-1 rounded outline-none"
                type="number"
                min={1}
                max={11}
                step={1}
                defaultValue={windowsSens}
                onChange={(e) => setWindowsSens(Number(e.target.value))}
              />
              <span>/ 11</span>
              <button
                onClick={() => setWindowsSensHelpActive((prev) => !prev)}
                className="bg-transparent p-0 text-sm border-none focus:outline-none"
              >
                {windowsSensHelpActive ? "Hide" : "Help"}
              </button>
            </div>
          </div>
          <div className="flex justify-center transition-all overflow-hidden">
            <img
              className={`${
                windowsSensHelpActive ? "w-full" : "w-0"
              } transition-all duration-[400ms]`}
              src={windows_sensitivity}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm">Screen (game) resolution</label>
            <div className="flex items-center gap-2">
              <input
                className="w-20 px-2 py-1 rounded outline-none"
                type="number"
                min={1}
                max={20000}
                step={1}
                defaultValue={displayArea.width}
                onChange={(e) =>
                  setDisplayArea((prev) => ({
                    width: Number(e.target.value),
                    height: prev.height,
                  }))}
              />
              <span>x</span>
              <input
                className="w-20 px-2 py-1 rounded outline-none"
                type="number"
                min={1}
                max={20000}
                step={1}
                defaultValue={displayArea.height}
                onChange={(e) =>
                  setDisplayArea((prev) => ({
                    width: prev.width,
                    height: Number(e.target.value),
                  }))}
              />
              <span>px</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col transition-all items-start gap-2 w-full">
          <div className="relative border rounded aspect-[16/9] w-[400px]">
            <span className="absolute left-[50%] translate-x-[-50%] top-0 translate-y-[-120%]">
              Width (mm)
            </span>
            <div className="absolute left-[50%] top-0 translate-x-[-50%]">
              <span className="font-bold">
                {tabletArea.width != Infinity && tabletArea.width > 0
                  ? tabletArea.width
                  : "Invalid"}
              </span>
            </div>
            <div className="absolute -rotate-90 left-0 translate-x-[-70%] top-[50%] translate-y-[-50%]">
              Height (mm)
            </div>
            <div className="absolute -rotate-90 left-2 translate-x-[-40%] top-[50%] translate-y-[-50%]">
              <span className="font-bold">
                {tabletArea.height != Infinity && tabletArea.height > 0
                  ? tabletArea.height
                  : "Invalid"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
