"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BotIcon } from "lucide-react";

function Homepage() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-end gap-4">
          <Button
            variant="outline"
            className="mt-4 flex justify-center hover:bg-[#444] hover:text-white w-[120px] dark:border-1 bg-black text-gray-100 dark:hover:bg-[#111] dark:border-green-300  dark:text-gray-200"
          >
            <span>
              <BotIcon />
            </span>
            Ask Ai
          </Button>
          <Button
            variant="outline"
            className="mt-4 w-[120px] flex justify-center dark:bg-green-300 dark:hover:bg-green-200 dark:text-gray-900"
          >
            <span>
              <PlusCircle />
            </span>
            New note
          </Button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
