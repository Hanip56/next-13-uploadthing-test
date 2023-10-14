"use client";

import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";

const UploadComp = () => {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    const imgRes = await startUpload([file]);
    if (imgRes && imgRes[0].key) {
      console.log("image uploaded");

      const res = await axios.post("/api/upload", { image: imgRes[0].key });
      console.log(res);

      if ("data" in res) {
        setFile(undefined);
        router.refresh();
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="basis-[40%]">
      <h3 className="text-lg font-semibold mb-4">Upload</h3>
      <div className="flex flex-col">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="sr-only"
          ref={inputRef}
        />
        <div className="w-full h-60 bg-gray-300">
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" />
            </div>
          )}
          {!file && !isLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <Button
                onClick={() => inputRef.current?.click()}
                variant="secondary"
              >
                Add
              </Button>
            </div>
          )}
          {file && !isLoading && (
            <Image
              className="w-full h-full object-contain"
              src={URL.createObjectURL(file)}
              alt="image"
              width={50}
              height={50}
            />
          )}
        </div>
        <Button
          onClick={handleUpload}
          disabled={isLoading || !file}
          className="mt-4 self-end"
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadComp;
