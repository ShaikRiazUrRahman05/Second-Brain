// // interface InputProps{

// //     placeholder: string;
// //     ref?: any }

// // export function Input({ placeholder, ref }:InputProps) {
// //   return (
// //     <div>
// //       <input
// //         ref={ref}
// //         placeholder={placeholder}
// //         type={"text"}
// //         className="px-4 py-2 border rounded m-2"
// //       ></input>
// //     </div>
// //   );
// // }
// import { forwardRef } from "react";

// interface InputProps {
//   placeholder: string;
// }

// // forwardRef is mandatory for passing refs from Modal to Input
// export const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ placeholder }, ref) => {
//     return (
//       <div>
//         <input
//           ref={ref}
//           placeholder={placeholder}
//           type="text"
//           className="px-4 py-2 border rounded m-2 w-full focus:outline-purple-500"
//         />
//       </div>
//     );
//   },
// );

// Input.displayName = "Input";

import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          placeholder={placeholder}
          type="text"
          className="px-4 py-2 border rounded m-2 w-full focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>
    );
  },
);

Input.displayName = "Input";
