import { Sidebaritem } from "./SidebarItem";
import { Logo } from "./ui/icons/Logo";
import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8 justify-items-center">
        <div className="pr-2 text-purple-600">
          <Logo />
        </div>
        Brainly
      </div>

      <div className="pt-8 pl-4">
        <Sidebaritem text="Twitter" icon={<TwitterIcon />} />

        <Sidebaritem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
