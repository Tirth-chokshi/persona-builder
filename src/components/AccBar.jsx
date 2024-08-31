"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "@/components/ui/button"


export default function AccBar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Hello
            <br /> {session.user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </>
    );
  }
  return (
    <>
    </>
  );
}
