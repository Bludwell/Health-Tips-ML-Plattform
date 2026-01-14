import React, { useState } from "react";
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    if (file) {
      console.log("Uploading a file...");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await fetch("http://127.0.0.1:8000/data/csv/", {
          method: "POST",
          body: formData,
        });
        const data = await result.json();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="input-group">
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File Details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size}</li>
          </ul>
        </section>
      )}
      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a File
        </button>
      )}
    </div>
  );
};

export default Upload;
