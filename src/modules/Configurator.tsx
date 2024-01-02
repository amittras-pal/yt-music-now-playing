import { yupResolver } from "@hookform/resolvers/yup";
import { IconLoader3 } from "@tabler/icons-react";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConfigForm, configSchema, getElapsedTime } from "../utils/form";
import "./Configurator.scss";

export default function Configurator(props: { onComfigurated: () => void }) {
  const [generatingPalette, setGeneratingPalette] = useState(false);
  const [colorOpts, setColorOpts] = useState<string[]>([]);

  const worker: Worker = useMemo(
    () => new Worker(new URL("../worker/image-processor.ts", import.meta.url)),
    []
  );

  useEffect(() => {
    const handler = (res: MessageEvent<string[]>) => {
      setColorOpts(res.data);
      setGeneratingPalette(false);
    };
    worker.addEventListener("message", handler);
    return () => worker.removeEventListener("message", handler);
  });

  const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setColorOpts([]);
      setValue("colors", []);
      setValue("imgUrl", URL.createObjectURL(e.target.files[0]));
      setGeneratingPalette(true);

      worker.postMessage(e.target.files[0]);
    }
  };

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<ConfigForm>({
    defaultValues: {
      imgUrl: "",
      title: "",
      artist: "",
      colors: [],
      liked: true,
      likeUnit: "K",
      likeCount: 40,
      commentCount: 0,
      playState: true,
      loopState: true,
      timeMin: 0,
      timeSec: 0,
      elapsed: 10,
    },
    resolver: yupResolver(configSchema),
  });

  const setConfiguration: SubmitHandler<ConfigForm> = (values) => {
    sessionStorage.setItem("configuration", JSON.stringify(values));
    props.onComfigurated();
  };

  return (
    <form
      onSubmit={handleSubmit(setConfiguration)}
      noValidate
      className="configurator"
    >
      <input
        type="file"
        className="d-none"
        id="fileInput"
        onChange={handleFile}
      />
      <label
        className={`btn btn-sm btn-warning shadow-sm d-block ${
          generatingPalette ? "pe-none opacity-50" : ""
        }`}
        htmlFor="fileInput"
      >
        {colorOpts.length > 0 ? "Change" : "Select"} Album Cover
      </label>
      {generatingPalette && (
        <>
          <div className="d-flex gap-1 align-items-center text-primary">
            <IconLoader3 size={16} className="spin" />
            <p className="py-2 mb-0">Generating Palette:</p>
          </div>
          <p className="text-muted small">
            This may take a while depending on the image size. Please fill other
            information in the meantime.
          </p>
        </>
      )}
      <div className="d-flex flex-column gap-2 mt-2">
        {colorOpts.length > 0 && (
          <>
            <p className="mb-0">Select 2 colors:</p>
            <div className="d-flex gap-2 pb-2">
              {colorOpts.map((clr) => (
                <label
                  htmlFor={clr}
                  className="color-checkbox"
                  style={{
                    padding: "0.5rem",
                    backgroundColor: clr,
                    borderRadius: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    {...register("colors")}
                    id={clr}
                    value={clr}
                    key={clr}
                  />
                </label>
              ))}
            </div>
          </>
        )}

        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Song Title"
          {...register("title")}
        />
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Artist Name"
          {...register("artist")}
        />
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={watch("playState")}
            {...register("playState")}
          />
          <span className="form-check-label">
            {watch("playState") ? "Playing" : "Paused"}
          </span>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={watch("loopState")}
            {...register("loopState")}
          />
          <span className="form-check-label">
            {watch("loopState") ? "Looping Current" : "Loop Off"}
          </span>
        </div>

        <div className="my-2">Song Duration</div>
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control form-control-sm flex-grow-1"
            placeholder="Min."
            {...register("timeMin")}
          />
          <input
            type="number"
            className="form-control form-control-sm flex-grow-1"
            placeholder="Sec."
            {...register("timeSec")}
          />
        </div>

        <label htmlFor="elapsed" className="form-label mb-0">
          Elapsed (
          {getElapsedTime(
            watch("timeMin").toString(),
            watch("timeSec").toString(),
            watch("elapsed")
          )}
          )
        </label>
        <input
          type="range"
          className="form-range"
          id="elapsed"
          step={1}
          {...register("elapsed")}
        />

        <div className="mt-2">Likes</div>
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            checked={watch("liked")}
            {...register("liked")}
          />
          <span className="form-check-label">
            {watch("liked") ? "Liked" : "Not Liked"}
          </span>
        </div>
        <div className="row">
          <div className="col-8">
            <input
              className="form-control form-control-sm"
              type="number"
              {...register("likeCount")}
            />
          </div>
          <div className="col-4">
            <select
              {...register("likeUnit")}
              className="form-select form-select-sm"
            >
              <option value="K">K (thousands)</option>
              <option value="M">M (millions)</option>
            </select>
          </div>
        </div>

        <div className="mt-2">Comments</div>
        <input
          className="form-control form-control-sm"
          type="number"
          {...register("commentCount")}
        />

        <button
          type="submit"
          className="btn btn-sm btn-success text-light w-100 mt-2"
          disabled={!isValid}
        >
          Create Page
        </button>
      </div>
    </form>
  );
}
