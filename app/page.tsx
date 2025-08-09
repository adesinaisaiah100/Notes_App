'use client'
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";


function Homepage() {
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full justify-end flex">
          <Button variant="outline" className="mt-4 dark:bg-green-300 dark:text-gray-900" >
                <span><PlusCircle /></span>New note
            </Button>
        </div>
      </div>
</>
  )
}

export default Homepage