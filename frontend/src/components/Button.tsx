import type { ReactElement } from "react";
type Variants = "primary" | "secondary";
interface Buttonprops {
  variant: Variants;
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  // endIcon?: ReactElement;
  // onClick?: () => void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

// const sizeStyles = {
//   sm: "py-1 px-2",
//   md: "py-2 px-4",
//   lg: "py-4 px-6",
// };

const defaultStyles =
  "px-4 py-2 rounded-md font-light flex justify-center items-center ";

//props ka type is ButtonProps

//props.variant
//props.size
//   return (
//     <button
//       className={`${variantStyles[props.variant]} ${defaultStyles} ${
//         sizeStyles[props.size]
//       }`}
//     >
//       {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
//       {props.text}
//       {props.endIcon}
//     </button>
//   );
// };
//how we want the button to look like
//<Button variant="primary" size="md" onClick={} text={}

{
  /* <Button variant="primary" size="md" onClick={() => {}} text={"asd"} />; */
}

//exporting button
export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: Buttonprops) {
  return (
    <button
      onClick={onClick}
      className={
        variantClasses[variant] +
        " " +
        defaultStyles +
        `${fullWidth ? " w-full flex justify-center items-center" : ""} ${
          loading ? "opacity-45" : ""
        }`
      }
      disabled={loading}
    >
      <div className="pr-2" />
      {startIcon}
      {text}
    </button>
  );
}
