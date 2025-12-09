import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import type { ReactNode } from "react";
type BackButtonProps = {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
};
export default function BackButton({
  onClick,
  children,
  className,
}: BackButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      <div>
        <ArrowBackIosOutlinedIcon />
        {children}
      </div>
    </button>
  );
}
