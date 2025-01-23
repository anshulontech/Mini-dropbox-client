import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import FileList from "./components/FileList";
import FilePreview from "./components/FilePreview";
import FileUpload from "./components/FileUpload";
import Home from "./components/Home";
import NotFound from "./components/NotFound"; 

const App: React.FC = () => {
  return (
    <Router>
      <header className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">
            DROPBOX
          </Link>
          <div className="d-flex">
            <Link to="/upload" className="btn btn-light me-2">
              Upload
            </Link>
            <Link to="/all" className="btn btn-light">
              All Files
            </Link>
          </div>
        </div>
      </header>
      <div className="container">
        <Routes>
          {/* Redirect from root to /home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Other routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/all" element={<FileList />} />
          <Route path="/preview/:fileName" element={<FilePreview />} />

          {/* Not Found page for specific scenarios */}
          <Route path="/not-found" element={<NotFound />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
