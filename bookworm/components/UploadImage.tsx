"use client";

import { useState } from "react";
import { storageClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

type FileUploadProps = {
  onUpload: (imagePath: string | null, file: File | null) => void;
};

const UploadImage: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log("Selected File:", selectedFile);

      // Upload the file and get the full path
      const { data, error } = await handleUpload(selectedFile);
      if (data) {
        // Pass both the full path and the file to the onUpload callback
        onUpload(data.path, selectedFile);
      } else {
        console.error("Error uploading image:", error);
        onUpload(null, null);
      }
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const filename = `${uuidv4()}-${file.name || ""}`;

      const { data, error } = await storageClient
        .from("covers")
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("Storage Data:", data);
      console.error("Storage Error:", error);

      return { data, error };
    } catch (error) {
      console.error("Error uploading image:", error);
      return { data: null, error };
    }
  };

  return (
    <div>
      <label className="text text-dark">
        Book Picture:
        <input type="file" name="image" onChange={handleFileSelected} />
      </label>
    </div>
  );
};

export default UploadImage;
