"use client";

import React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

function LogoutButton() {
  const [loading, setIsLoading] = useState(false);

  function handleLogout() {
    setIsLoading(true);
    signOut({ redirect: false }).then(() => {
      toast.success("Logged out successfully!");
      setIsLoading(false);
    });
  }
  return (
    <Button
      variant="outline"
      className="w-24"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogoutButton;
