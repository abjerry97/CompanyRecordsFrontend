import React, { useState, ChangeEvent, FormEvent } from "react";
import { CloudinaryContext } from "cloudinary-react";
import { cloudinaryConfig } from "./helpers/cloudinary";
import { makeRequest } from "./axios";
interface  ComponentProps {
    setImage: any;
    // other prop types
  }
const UploadImage: React.FC<ComponentProps> = ({setImage}:any) => {
  const [fileInputState, setFileInputState] = useState<string>("");
  const [previewSource, setPreviewSource] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
    }
  };

  const handleSubmitFile = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      if (reader.result) {
        uploadImage(reader.result.toString());
      }
    };
    reader.onerror = () => {
      console.error("Error");
    };
  };

  const uploadImage = async (base64EncodedImage: string) => { 
    try {
     const response = await makeRequest.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
        { "upload_preset": "fzevswcc","file":base64EncodedImage }
      ); 
      setImage(response.data?.url || "")
      setFileInputState("");
      setPreviewSource("");
    } catch (err) {
      console.error(err);
    }
  };
  //   const result = await cloudinary.uploader.upload(file.path, {
  //     //   resource_type: "image",
  //     public_id: `property/uploads/images/${fileName}`,
  //     overwrite: true,
  //   });

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewSource(reader.result.toString());
      }
    };
  };

  return (
    <CloudinaryContext cloudName={cloudinaryConfig.cloud_name}>
      {/* Your component content */}
      <div>
        <h1>Upload</h1>
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="btn" type="submit" onClick={handleSubmitFile}>
          Submit
        </button>
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "100px" }} />
        )}
      </div>{" "}
    </CloudinaryContext>
  );
};

export default UploadImage;
