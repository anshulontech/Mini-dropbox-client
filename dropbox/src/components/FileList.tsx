import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:9651/api/files/list/all");
        setFiles(response.data.result || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>All Files</h2>
      <ul className="list-group">
        {files.map((file) => (
          <li key={file} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{file}</span>
            <Link to={`/preview/${file}`} className="btn btn-sm btn-outline-primary">
              <i className="bi bi-file-earmark-arrow-down"></i> Preview/Download
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
