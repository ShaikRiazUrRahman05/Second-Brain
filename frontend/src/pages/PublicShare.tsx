import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";

export function PublicShare() {
  // 1. Get the unique hash from the URL (/share/:shareLink)
  const { shareLink } = useParams();
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        // We named the variable 'response' here
        const response = await axios.get(`${BACKEND_URL}/brain/${shareLink}`);

        // So we must use 'response.data' here
        setContents(response.data.content);
        setUsername(response.data.username);
      } catch (e) {
        console.error("Error fetching shared content", e);
      } finally {
        setLoading(false);
      }
    }
    fetchSharedBrain();
  }, [shareLink]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading shared brain...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 3. We use the Sidebar for consistent UI, though links inside might be restricted */}
      <Sidebar />

      <div className="p-4 ml-72 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {username ? `${username}'s Shared Brain` : "Public Brain"} 🧠
          </h1>
        </div>

        {/* 4. Render the cards with isPublic={true} to hide Delete/Summarize buttons */}
        <div className="flex gap-4 flex-wrap">
          {contents.length > 0 ? (
            contents.map(({ _id, title, link, type }) => (
              <Card
                key={_id}
                title={title}
                link={link}
                type={type}
                isPublic={true}
              />
            ))
          ) : (
            <div className="text-gray-500 mt-10 w-full text-center">
              This shared brain is currently empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
