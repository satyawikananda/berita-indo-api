"use client";
import { Drawer } from "vaul";
import { useEffect, useRef, useState } from "react";
import { ListNews } from "@/app/utils";
import { useToast } from "@/app/hooks/useToast";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
export const DrawerNews = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  data: ListNews | null;
}) => {
  const [type, setType] = useState<string | null>("");
  const [zone, setZone] = useState<string | null>("");
  const [result, setResult] = useState(null);
  const [isType, setIsType] = useState<boolean>(data?.isNotAll ? true : false);
  const [pending, setPending] = useState<boolean>(false);
  const exampleUrl = useRef<HTMLSpanElement | null>(null);
  const slugify = (text: string) => {
    if (!text) return;
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const submit = async () => {
    setPending(true);
    const url =
      zone && type
        ? `/api/${slugify(data?.news as string)}/${slugify(zone)}/${slugify(
            type
          )}`
        : zone
        ? `/api/${slugify(data?.news as string)}/${slugify(zone)}`
        : type
        ? `/api/${slugify(data?.news as string)}/${slugify(type)}`
        : `/api/${slugify(data?.news as string)}`;
    const response = await fetch(url);
    const dataJson = await response.json();
    setResult(dataJson);
    setPending(false);
  };

  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToast("Browser not supported!", {
        timeout: 1000,
        theme: "light",
      });
    }
    try {
      await navigator.clipboard.writeText(
        exampleUrl.current?.innerHTML as string
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useToast("URL Copied", {
        timeout: 1000,
        theme: "light",
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data?.isNotAll) {
      setType(data?.types ? data.types[0] : null);
      setZone(data?.zones ? data.zones[0] : null);
    }
    setZone(data?.zones ? data.zones[0] : null);
  }, [data?.isNotAll, data?.types, data?.zones]);

  return (
    <Drawer.Root
      shouldScaleBackground
      dismissible={false}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Drawer.Portal>
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[90%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
            <div className="mx-auto w-28 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-xl mx-auto">
              <Drawer.Title className=" mb-4 flex justify-between items-center">
                <span className="font-medium text-xl">{data?.news} API</span>
                <span
                  role="button"
                  className="text-md cursor-pointer hover:underline"
                  onClick={() => {
                    onOpenChange(false);
                    setResult(null);
                    setZone(null);
                    setType(null);
                    setIsType(false);
                    setPending(false);
                  }}
                >
                  Close
                </span>
              </Drawer.Title>
              {!data?.isNotAll && data?.types ? (
                <div className="form-control">
                  <label className="flex flex-row items-center gap-4 cursor-pointer">
                    <span className="label-text">Use type</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(v) => {
                        setType(null);
                        setIsType(v.target.checked);
                        if (v.target.checked)
                          setType(data?.types ? data.types[0] : "");
                      }}
                    />
                  </label>
                </div>
              ) : null}
              <div className="flex flex-row gap-4 justify-between items-center mb-3">
                {data?.zones && (
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Select zone</span>
                    </label>
                    <select
                      className="select select-bordered"
                      onChange={(v) => setZone(v.target.value)}
                    >
                      {data?.zones?.map((zone, idx) => (
                        <option key={idx}>
                          {zone.charAt(0).toUpperCase() +
                            zone.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {(data?.types && data.isNotAll) || isType ? (
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Select type</span>
                    </label>
                    <select
                      className="select select-bordered"
                      onChange={(v) => setType(v.target.value)}
                    >
                      {data?.types?.map((type, idx) => (
                        <option key={idx}>
                          {type.charAt(0).toUpperCase() +
                            type.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <button
                  disabled={pending}
                  className="bg-slate-800 p-3 rounded-lg mt-8 text-white w-36 hover:bg-slate-900 transition-colors flex justify-center items-center gap-2"
                  onClick={submit}
                >
                  {pending ? (
                    <span className="loading loading-spinner"></span>
                  ) : null}
                  {pending ? "Please wait" : "Submit"}
                </button>
              </div>
              <span
                className="text-md font-semibold cursor-pointer"
                onClick={copyToClipboard}
              >
                Example:{" "}
                <span ref={exampleUrl}>
                  https://berita-indo-api-next.vercel.app/api/
                  {slugify(data?.news as string)}/
                  {zone ? slugify(zone) + "/" : null}
                  {slugify(type as string)}
                </span>
              </span>
              {result ? (
                <ReactJson
                  style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    overflow: "auto",
                    height: "60vh",
                    borderRadius: ".75rem",
                  }}
                  theme="railscasts"
                  src={result}
                />
              ) : null}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
