import React, { useState } from "react";
import axios from "axios";

export default function AdminMode() {
  const [token, setToken] = useState("");
  const [urls, setUrls] = useState([]);

  const fetchAdminData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/urls", {
        headers: { "x-admin-token": token },
      });
      setUrls(res.data);
    } catch (err) {
      alert("Failed to fetch admin data. Check token.");
    }
  };

  return (
    <div>
      {!urls.length ? (
        <>
          <input
            type="password"
            placeholder="Enter admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={fetchAdminData}>Load URLs</button>
        </>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short Code</th>
              <th>Visit Count</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td>
                  <a
                    href={url.original_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {url.original_url}
                  </a>
                </td>
                <td>{url.short_code}</td>
                <td>{url.visit_count}</td>
                <td>{new Date(url.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
