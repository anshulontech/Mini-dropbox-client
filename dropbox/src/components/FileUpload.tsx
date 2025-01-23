import React, { useState } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:9651/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      setSelectedFile(null);
    } catch (error: any) {
      console.error("Error uploading file:", error);

      if (error.response && error.response.status === 409 && error.response.data.errorMsg === "File Already exist with given name") {
        alert("File already exists with the given name.");
      } else {
        alert("File upload failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleFileUpload}>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            accept=".txt,.jpg,.png,.json,.pdf"
          />
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
