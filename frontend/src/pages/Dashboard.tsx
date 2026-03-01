// import { useState } from "react";
// import "../App.css";
// import { Button } from "../components/Button";
// import { Card } from "../components/Card";
// import { CreateContentModal } from "../components/CreateContentModal";
// import { PlusIcon } from "../components/ui/icons/PlusIcon";

// import { ShareIcon } from "../components/ui/icons/ShareIcon";
// import { Sidebar } from "../components/Sidebar";

// // import { Button } from "./components/Button";
// // import { PlusIcon } from "./components/ui/icons";
// export function DashBoard() {
//   // const [open,setOpen]=useState(false);
//   // return (
//   //   <>
//   //     <Button

//   //       startIcon={<PlusIcon size="lg" />}
//   //       size="lg"
//   //       variant="primary"
//   //       text="share"
//   //     />

//   //     <Button size="lg" variant="secondary" text="Add content" />
//   //   </>
//   // );

//   // }

//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <div>
//       <Sidebar />

//       <div className="p-4 ml-72 min-h-screen  bg-gray-100 border-2">
//         <CreateContentModal
//           open={modalOpen}
//           onClose={() => {
//             setModalOpen(false);
//           }}
//         />
//         <div className="flex justify-end gap-4">
//           <Button
//             onClick={() => {
//               setModalOpen(true);
//             }}
//             variant="primary"
//             text="Add content"
//             startIcon={<PlusIcon />}
//           ></Button>
//           <Button
//             variant="secondary"
//             text="Share Brain"
//             startIcon={<ShareIcon />}
//           ></Button>
//         </div>

//         <div className="flex gap-4">
//           <Card
//             type="twitter"
//             link="https://x.com/striver_79/status/1990381745729069276"
//             title="First Tweet"
//           />

//           <Card
//             type="youtube"
//             link="https://www.youtube.com/watch?v=xg0hNUWVIgQ"
//             title="First Youtube Video"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// // export default App;
// import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";
import { PlusIcon } from "../components/ui/icons/PlusIcon";
import { ShareIcon } from "../components/ui/icons/ShareIcon";
import { BACKEND_URL } from "../config";
import { CreateContentModal } from "../components/CreateContentModal";
import { useState, useEffect } from "react";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 1. State for Smart Search

  const fetchContent = async () => {
    const response = await axios.get(`${BACKEND_URL}/content`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setContents(response.data.content);
  };

  useEffect(() => {
    fetchContent();
  }, [modalOpen]);

  // 2. Logic: Real-time filtering (Smart Search)
  const filteredContent = contents.filter((item: any) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handleShare() {
    const response = await axios.post(
      `${BACKEND_URL}/brain/share`,
      { share: true },
      {
        headers: { Authorization: localStorage.getItem("token") },
      },
    );
    const shareUrl = `http://localhost:5174/share/${response.data.hash}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied: " + shareUrl);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="p-4 ml-72 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Your Second Brain
          </h1>

          {/* 3. Search UI: Controlled Input */}
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search by title (e.g., Striver)..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleShare}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
            />
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>

        {/* 4. Displaying Content or Empty State */}
        <div className="flex gap-4 flex-wrap">
          {filteredContent.length > 0 ? (
            filteredContent.map((item: any) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
                contentId={item._id}
                refresh={fetchContent}
              />
            ))
          ) : (
            <div className="w-full text-center py-20">
              <p className="text-gray-500 text-lg">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "Your brain is empty. Add some content!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
