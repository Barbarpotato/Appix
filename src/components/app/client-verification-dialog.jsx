"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ClientVerificationDialog({ open, onClose }) {
    const [clientID, setClientID] = useState("");
    const [dialogMessage, setDialogMessage] = useState(null);

    useEffect(() => {
        const clientSession = localStorage.getItem("clientSession");
        if (clientSession) {
            onClose();
        }
    }, [onClose]);

    const handleVerifyClientID = async () => {
        const res = await fetch(`/api/clients?client_id=${clientID}`);
        if (res.ok) {
            localStorage.setItem("clientSession", clientID);
            setDialogMessage(null);
            onClose();
        } else {
            setDialogMessage("Client ID not found");
        }
    };

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen || onClose()}>
            <DialogContent showCloseButton={false} className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Verify Your Client Credentials</DialogTitle>
                    <DialogDescription>
                        Make sure you have the client credentials to use the Appix.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-1">
                    <Input
                        value={clientID}
                        onChange={(e) => setClientID(e.target.value)}
                        placeholder="Your Client Credentials Number..."
                    />
                    {dialogMessage && (
                        <p className="text-red-500 text-xs font-bold">{dialogMessage}</p>
                    )}
                </div>

                <DialogFooter className="sm:justify-start">
                    <Button type="button" onClick={handleVerifyClientID}>
                        Verify
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
