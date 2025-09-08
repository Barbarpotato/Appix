"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ServiceToggleDialog({ open, onOpenChange, service, onConfirm }) {
    const [clientId, setClientId] = useState("");
    const [dialogMessage, setDialogMessage] = useState(null);

    const handleActivate = async () => {
        try {
            await fetch("/api/dummy-endpoint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clientId,
                    service: service.key,
                    action: service.active ? "disable" : "enable",
                }),
            });
            onConfirm(clientId); // pass back to parent
            setClientId("");
            onOpenChange(false);
        } catch (err) {
            console.error("Failed to update service:", err);
            setDialogMessage("Client ID not found");
        }
    };

    if (!service) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {service.active ? "Disable" : "Enable"} {service.title}
                    </DialogTitle>
                    <DialogDescription>
                        Please confirm by entering your client ID.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Enter client ID"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    />
                    {dialogMessage && (
                        <p className="text-red-500 text-xs font-bold">{dialogMessage}</p>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleActivate}>
                        {service.active ? "Disable" : "Activate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
