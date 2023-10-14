"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ImageItem({ src }: { src: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    const res = await axios.patch("/api/upload", { filename: src });

    if ("data" in res) {
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-40">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isLoading}
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/80"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Image
        className="w-full h-full object-cover"
        src={`https://utfs.io/f/${src}`}
        alt={src}
        width={200}
        height={200}
      />
    </div>
  );
}

export default ImageItem;
