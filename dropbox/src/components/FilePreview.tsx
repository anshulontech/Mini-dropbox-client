import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:9651/api/files";

const FilePreviewPage: React.FC = () => {
  const { fileName } = useParams<{ fileName: string }>();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (!fileName) {
        setError("No file name provided.");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/download/${fileName}`, {
          responseType: "blob",
        });

        const contentType = response.headers["content-type"];
        setFileType(contentType);

        const fileURL = URL.createObjectURL(response.data);
        setPreviewURL(fileURL);
        setError(null);
      } catch (err: any) {
        console.log("Error fetching file:", err);
        if (err.response && err.response.status === 404) {
          setError("File not found.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        setPreviewURL(null);
      }
    };

    fetchFile();
  }, [fileName]);

  return (
    <div className="file-preview-page">
      <h2>Preview of: {fileName}</h2>

      {error && <p className="text-danger">{error}</p>}

      {previewURL && fileType && !error && (
        <>
          <a
            href={previewURL}
            download={fileName}
            className="btn btn-primary mb-3"
          >
            Download File
          </a>

          <div className="preview-container">
            {fileType.startsWith("image/") && (
              <img src={previewURL} alt={fileName} className="img-fluid" />
            )}
            {fileType === "application/pdf" && (
              <iframe
                src={previewURL}
                title={fileName}
                style={{ width: "100%", height: "500px" }}
              />
            )}
            {fileType.startsWith("text/") && (
              <iframe
                src={previewURL}
                title={fileName}
                style={{ width: "100%", height: "500px" }}
              />
            )}

            {!fileType.startsWith("image/") &&
              fileType !== "application/pdf" &&
              !fileType.startsWith("text/") && (
                <p>
                  Preview not available for this file type. Use the download link
                  above.
                </p>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default FilePreviewPage;
