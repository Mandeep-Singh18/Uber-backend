import React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  MapPin,
  Send,
  CalendarDays,
  X,
  Clock,
  Car,
} from "lucide-react";

import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hero = () => {
  const [date, setDate] = React.useState(new Date());

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 15) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row items-center lg:items-start justify-center px-15 min-h-[calc(100vh-64px)]">
      {/* Left Section: Form and Text */}
      <div className="flex-1 p-5 pt-15 max-w-xl h-[500px] lg:mr-20 mb-12 lg:mb-0">

        {/* Main Heading */}
        <h1 className="text-5xl lg:text-6xl font-medium tracking-tight mb-8">
          Go anywhere with <br />
          Uber
        </h1>

        {/* Location Inputs */}
        <div className="">
          {/* Exact Location Pill */}
          {/* <div className="flex justify-end mb-4">
            <div className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
              Get exact location
              <X className="h-4 w-4 ml-2 cursor-pointer" />
            </div>
          </div> */}

          <div className="relative mb-4 w-[28em]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              placeholder="Pickup location"
              className="pl-10 pr-10 py-5 text-base rounded-md focus:ring-black focus:ring-offset-0 focus:border-black"
            />
            <Send className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer" />
          </div>

          <div className="relative mb-6 w-[28em]">
            <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              placeholder="Dropoff location"
              className="pl-10 pr-4 py-5 text-base rounded-md focus:ring-black focus:ring-offset-0 focus:border-black"
            />
          </div>

          {/* Date and Time Pickers */}
          <div className="flex space-x-4 w-[28em]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal py-5 text-base",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? format(date, "PPP") : <span>Today</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* <Select>
              <SelectTrigger className="w-full py-5 text-base">
                <Clock className="mr-2 h-5 w-5" />
                <SelectValue placeholder="Now" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        </div>

        {/* Action Buttons and Link */}
        <div className="flex items-center  mt-6 space-x-4">
          <Button className="bg-black text-white px-6 py-6 text-lg rounded-md hover:bg-gray-800">
            See prices
          </Button>
          <a href="#" className="text-gray-600 hover:underline">
            Log in to see your recent activity
          </a>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="flex-1 flex justify-center lg:justify-start">
        <div className="w-full max-w-[800px] h-[500px] bg-gray-200 rounded-lg overflow-hidden">
          {/* This is where your image will go */}
          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=2144/height=2144/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hM2NmODU2NC1lMmE2LTQxOGMtYjliMC02NWRkMjg1YzEwMGIuanBn" 
            alt="Uber ride"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero