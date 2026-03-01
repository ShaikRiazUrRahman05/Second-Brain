// export function Sidebaritem({
//   text,
//   icon,
// }: {
//   text: string;
//   icon: ReactElement;
// }) {
//   return (
//     <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-300 rounded-max-w-48 pl-4 transition-all duration-150">
//       <div className="pr-2">{icon}</div>

//       <div>{text}</div>
//     </div>
//   );
// }
import { type ReactElement } from "react"; // Added 'type' keyword

export function Sidebaritem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 py-3 cursor-pointer hover:bg-gray-200 rounded-lg pl-4 transition-all duration-150">
      <div className="pr-3 text-purple-600">{icon}</div>
      <div className="font-medium text-sm">{text}</div>
    </div>
  );
}
