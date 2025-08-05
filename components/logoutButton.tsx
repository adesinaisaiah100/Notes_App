'use client'

import React from 'react'
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';


function LogoutButton() {
    const [loading, setIsLoading] = useState(false);

    function handleLogout() {
        setIsLoading(true);
        setTimeout(() => {
            console.log("User logged out");
            toast.success("Logged out successfully!");
            setIsLoading(false);
        }, 1000);
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
  )
}

export default LogoutButton