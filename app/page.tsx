"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BotIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BoldIcon, UnderlineIcon, Share } from "lucide-react";
import { createEditor, BaseEditor, Descendant, Editor, Element, Transforms } from "slate";
import { Slate, Editable,withReact, ReactEditor } from "slate-react";
import { useState } from "react";


type CustomElement = { type: 'code' | 'paragraph' | 'heading' | 'list-item', children: CustomText[] };
type CustomText = { text: string, bold?: boolean, underline?: boolean };
declare module "slate" {
    interface CustomTypes {
      Editor: BaseEditor & ReactEditor;
      Element : CustomElement,
      Text: CustomText;
    }}

function Homepage() {
  const [editor] = useState(() => withReact(createEditor()));
    const initialValue = [
      {
        type: 'paragraph',
        children: [{ text: 'This is a paragraph.' }],
      }
    ]
    console.log({editor, initialValue});

      return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-end gap-4">
          <Drawer>
            <DrawerTrigger>
              <Button
                variant="outline"
                className="mt-4 flex w-[120px] justify-center bg-black text-gray-100 hover:bg-[#444] hover:text-white dark:border-1 dark:border-green-300 dark:text-gray-200 dark:hover:bg-[#111]"
              >
                <span>
                  <BotIcon />
                </span>
                Ask Ai
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger>
              <Button
                variant="outline"
                className="mt-4 flex w-[120px] justify-center dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200"
              >
                <span>
                  <PlusCircle />
                </span>
                New note
              </Button>
            </DrawerTrigger>
            <DrawerContent  className="bg-white dark:bg-[#000] h-full">
              <DrawerHeader>
                <DrawerTitle>New Note</DrawerTitle>
                <DrawerDescription>
                  Create a new note to save your thoughts.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submt</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}

export default Homepage;
