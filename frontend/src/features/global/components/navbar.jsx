import { ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-3">
      <div className="flex justify-between items-center">
        {/* Left Section: Logo and main navigation */}
        <div className="flex items-center gap-6">
          <a href="/" className="text-3xl font-bold tracking-tight">
            Uber
          </a>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-md font-medium cursor-pointer">
              Ride
            </Button>
            <Button variant="ghost" className="text-md font-medium cursor-pointer">
              Drive
            </Button>
            <Button variant="ghost" className="text-md font-medium cursor-pointer">
              Business
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-md font-medium cursor-pointer">
                  About
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>About Uber</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>About us</DropdownMenuItem>
                <DropdownMenuItem>Our offerings</DropdownMenuItem>
                <DropdownMenuItem>How Uber works</DropdownMenuItem>
                <DropdownMenuItem>Newsroom</DropdownMenuItem>
                <DropdownMenuItem>Careers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right Section: Language, Help, and Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-md font-medium cursor-pointer">
            <Globe className="h-5 w-5 mr-2" />
            EN
          </Button>
          <Button variant="ghost" className="text-md font-medium cursor-pointer">
            Help
          </Button>
          <Button variant="ghost" className="text-md font-medium">
            <Link to="/login">Log in</Link>
          </Button>
          <Button className="bg-white text-black rounded-full text-md font-medium hover:bg-gray-200">
            <Link to="/register">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar