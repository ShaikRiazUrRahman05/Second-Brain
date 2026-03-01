// //we wnt this to be a controlled component

// import { Button } from "./Button";
// import { CrossIcon } from "./ui/icons/CrossIcon";

// import { Input } from "./Input";
// import { useRef, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

// // Replace enum with as const to avoid TS isolatedModules issues
// export const ContentType = {
//   Youtube: "youtube",
//   Twitter: "twitter",
// } as const;

// export type ContentType = (typeof ContentType)[keyof typeof ContentType];

// // enum ContentType{
// //   Youtube="youtube",
// //   Twitter="twitter"
// // }
// //when user clicks on Add content a Modal will pop up

// //Rest of the screen slightly goes black
// //Modal will be central focus. link,type,Submit button and cross icon(inside the modal)

// type CreateContentModalProps = {
//   open: boolean;
//   onClose: () => void;
// };

// export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
//   if (!open) return null;

//   const titleRef = useRef<HTMLInputElement>(null);
//   const linkRef = useRef<HTMLInputElement>(null);
//   const [type, setType] = useState<ContentType>(ContentType.Youtube);

//   async function addContent() {
//     const title = titleRef.current?.value;
//     const link = linkRef.current?.value;

//     await axios.post(
//       `${BACKEND_URL}/content`,
//       {
//         link,
//         title,
//         type,
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     );
//   }

//   return (
//     <div
//       className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"
//       onClick={onClose} // ← now onClose is used
//     >
//       <div className="flex flex-col justify-center">
//         <span
//           className="bg-white opacity-100 p-4 rounded"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/*added this oopar waala e.stopProp add kara from GPT */}
//           <div className="flex justify-end cursor-pointer " onClick={onClose}>
//             <CrossIcon />
//           </div>

//           <div>
//             <Input ref={titleRef} placeholder={"Title"} onChange={() => {}} />

//             <Input ref={linkRef} placeholder={"Link"} onChange={() => {}} />
//           </div>

//           <div>
//             <h1>Type</h1>
//             <div className="flex gap-1">
//               <Button
//                 text="Youtube"
//                 variant={type === ContentType.Youtube ? "primary" : "secondary"}
//                 onClick={() => {
//                   setType(ContentType.Youtube);
//                 }}
//               ></Button>

//               <Button
//                 text="Twitter"
//                 variant={type === ContentType.Twitter ? "primary" : "secondary"}
//                 onClick={() => {
//                   setType(ContentType.Twitter);
//                 }}
//               ></Button>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <Button onClick={addContent} variant="primary" text="Submit" />
//           </div>
//         </span>
//       </div>
//     </div>
//   );
// }

// type InputProps = {
//   placeholder: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

// // function Input({ onChange, placeholder }: InputProps) {
// //   return (
// //     <div>
// //       <input
// //         placeholder={placeholder}
// //         type={"text"}
// //         className="px-4 py-2 border rounded m-2"
// //         onChange={onChange}
// //       ></input>
// //     </div>
// //   );
// // }

// {
//   /* whenever user clicks on cross icon u wl then sognal to parent component that cross icon has been clicked,please flip open(state variable) to be false */
// }
// {
//   /* <CrossIcon onClick={()=>{

// }}/> */
// }

// {
//   /* // const [modalOpen,setModalOpen]=useState(false); */
// }

import { Button } from "./Button";
import { CrossIcon } from "./ui/icons/CrossIcon";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

type CreateContentModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  if (!open) return null;

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/content`,
      { link, title, type },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    onClose();
  }

  return (
    <div
      className="w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-opacity-60 flex justify-center z-50"
      onClick={onClose}
    >
      <div className="flex flex-col justify-center">
        <span
          className="bg-white p-4 rounded-lg min-w-80 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex justify-end cursor-pointer mb-2"
            onClick={onClose}
          >
            <CrossIcon />
          </div>
          <div className="space-y-1">
            <Input ref={titleRef} placeholder={"Title"} />
            <Input ref={linkRef} placeholder={"Link"} />
          </div>
          <div className="mt-4">
            <h1 className="text-sm font-semibold mb-2 text-gray-700">Type</h1>
            <div className="flex gap-2">
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={addContent}
              variant="primary"
              text="Submit"
              fullWidth
            />
          </div>
        </span>
      </div>
    </div>
  );
}
