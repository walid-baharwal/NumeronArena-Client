import {
  LogInIcon,
  HomeIcon,
  SettingsIcon,
  CircleUserRoundIcon,
  HandshakeIcon,
  LogOutIcon,
  BotIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Link } from "react-router-dom";
import { useTypedSelector } from "@/store/store";

export function Header() {
  const { status } = useTypedSelector((state) => state.auth);

  const DATA = {
    navbar: [
      { href: "/", icon: HomeIcon, label: "Home" },
      { href: "/settings", icon: SettingsIcon, label: "Settings" },
    ],
    midNavbar: [
      { href: "/1v1-bot", icon: BotIcon, label: "Play With Bot" },
      { href: "#", icon: HandshakeIcon, label: "Friends" },
      { href: "/profile", icon: CircleUserRoundIcon, label: "Profile" },
    ],

    rightNavbar: [
      { href: "/auth/signin", icon: LogOutIcon, label: "Sign out", displayStatus: status },
      { href: "/auth/signin", icon: LogInIcon, label: "Sign in", displayStatus: !status },
    ],
  };

  return (
    <div className="top-0 left-0 right-0">
      <TooltipProvider>
        <Dock direction="middle" className="border-white/50">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full hover:bg-red-500/20"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full bg-white/50" />
          {DATA.midNavbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full  hover:bg-red-500/20"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2 bg-white/50" />
          {DATA.rightNavbar.map((item) => {
            return item.displayStatus ? (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full  hover:bg-red-500/20"
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ) : null;
          })}
        </Dock>
      </TooltipProvider>
      {/* </div> */}
    </div>
  );
}
