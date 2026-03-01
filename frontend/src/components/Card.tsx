// // import { ShareIcon } from "./ui/icons/ShareIcon";

// // interface CardProps {
// //   title: string;
// //   link: string;
// //   type: "twitter" | "youtube";
// // }
// // export function Card({ title, link, type }: CardProps) {
// //   return (
// //     <div>
// //       <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
// //         <div className="flex justify-between">
// //           <div className="flex items-center text-md  pr-4">
// //             <div className="text-gray-500">
// //               <ShareIcon />
// //             </div>
// //             {title}
// //           </div>

// //           <div className="flex items-center">
// //             <div className="pr-2 text-gray-500">
// //               <a href={link} target="_blank" rel="noopener noreferrer">
// //                 <ShareIcon />
// //               </a>
// //             </div>
// //             <div className="pr-2 text-gray-500"></div>
// //             <ShareIcon />
// //           </div>
// //         </div>

// //         <div className="pt-4">
// //           {type === "youtube" && (
// //             <iframe
// //               className="w-full"
// //               //   width="560"
// //               //   height="315"
// //               src={link.replace("watch", "embed").replace("?v=", "/")}
// //               title="YouTube video player"
// //               frameBorder="0"
// //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //               referrerPolicy="strict-origin-when-cross-origin"
// //               allowFullScreen
// //             ></iframe>
// //           )}

// //           {/* twitter tweet */}

// //           {/* embedding twitter tweet */}

// //           {/* Also Include script of this in index.html */}
// //           {type === "twitter" && (
// //             <blockquote className="twitter-tweet">
// //               <a href={link.replace("x.com", "twitter.com")}></a>
// //             </blockquote>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { ShareIcon } from "./ui/icons/ShareIcon";

// interface CardProps {
//   title: string;
//   link: string;
//   type: "twitter" | "youtube";
// }

// export function Card({ title, link, type }: CardProps) {
//   const getYouTubeEmbed = (url: string) => {
//     // Handles both watch?v= and shorts/ and youtu.be/ links
//     const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   return (
//     <div className="p-4 bg-white rounded-md border-gray-200 border max-w-72 min-h-48 shadow-sm">
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center text-md font-semibold text-gray-800">
//           <span className="mr-2 text-purple-600">
//             <ShareIcon />
//           </span>
//           {title}
//         </div>
//         <div className="flex gap-2">
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-400 hover:text-purple-600"
//           >
//             <ShareIcon />
//           </a>
//         </div>
//       </div>

//       <div className="pt-2">
//         {type === "youtube" && (
//           <iframe
//             className="w-full rounded-lg aspect-video"
//             src={getYouTubeEmbed(link)}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         )}

//         {type === "twitter" && (
//           <div className="max-h-60 overflow-y-auto">
//             <blockquote className="twitter-tweet">
//               <a href={link.replace("x.com", "twitter.com")}></a>
//             </blockquote>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }import { useState } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { TrashIcon } from "./ui/icons/TrashIcon";

// 1. Updated Interface with isPublic prop
interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId?: string; // Optional because public view doesn't need it
  refresh?: () => void; // Optional because public view doesn't need it
  isPublic?: boolean; // New prop to toggle UI elements
}

export function Card({
  title,
  link,
  type,
  contentId,
  refresh,
  isPublic,
}: CardProps) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Calls the backend DELETE route
  async function deleteContent() {
    if (isPublic) return; // Safety check
    try {
      await axios.delete(`${BACKEND_URL}/content`, {
        data: { contentId },
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (refresh) refresh(); // Trigger dashboard re-render
    } catch (e) {
      alert("Delete failed");
    }
  }

  // Calls the Gemini 2.5 Flash summarization
  async function handleSummarize() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/summarize`,
        { link },
        {
          headers: { Authorization: localStorage.getItem("token") },
        },
      );
      setSummary(response.data.summary);
    } catch (e) {
      setSummary("Could not generate summary.");
    }
    setLoading(false);
  }

  return (
    <div className="p-4 bg-white rounded-lg border-gray-200 border w-80 shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm font-bold text-gray-700 capitalize">
          {title}
        </div>

        {/* 2. Hide TrashIcon if viewing publicly */}
        {!isPublic && (
          <div className="flex gap-2 text-gray-400">
            <div
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={deleteContent}
            >
              <TrashIcon />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-md overflow-hidden bg-gray-50 h-44 border">
        {type === "youtube" ? (
          <iframe
            className="w-full h-full"
            src={link.replace("watch?v=", "embed/").split("&")[0]}
            title="YouTube video player"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full overflow-y-auto">
            <blockquote className="twitter-tweet w-full">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>

      {/* 3. Hide Summarize Section if viewing publicly */}
      {!isPublic && (
        <div className="mt-4 border-t pt-3">
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="w-full text-xs bg-purple-100 text-purple-700 py-2 rounded-md font-medium hover:bg-purple-200 disabled:opacity-50"
          >
            {loading ? "Summarizing..." : "✨ Summarize with Gemini"}
          </button>
          {summary && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-[10px] text-gray-600 italic leading-tight">
              {summary}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
