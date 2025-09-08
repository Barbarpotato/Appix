"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashbord";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServiceToggleDialog } from "@/components/app/service-toggle-dialog";

export default function SettingsPage() {
    const [services, setServices] = useState({
        notifications: false,
        analytics: true,
        cloud: false,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const serviceList = [
        {
            key: "notifications",
            title: "Notifications",
            description: "Receive alerts, updates, and reminders directly from the app.",
        },
        {
            key: "analytics",
            title: "Analytics",
            description: "Track usage data, performance, and insights about your account.",
        },
        {
            key: "cloud",
            title: "Cloud Storage",
            description: "Store and access your files securely in the cloud.",
        },
    ];

    const handleConfirm = (clientId) => {
        if (selectedService) {
            setServices((prev) => ({
                ...prev,
                [selectedService.key]: !prev[selectedService.key],
            }));
        }
    };

    return (
        <DashboardLayout>
            <div className="px-6 py-4">
                <h1 className="text-3xl font-bold mb-6">
                    Choose services to be used for this client account
                </h1>
                <div className="grid gap-6 md:grid-cols-3">
                    {serviceList.map((service) => (
                        <Card key={service.key} className="flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {service.description}
                                </p>
                                <Button
                                    variant={services[service.key] ? "destructive" : "default"}
                                    onClick={() => {
                                        setSelectedService({
                                            ...service,
                                            active: services[service.key],
                                        });
                                        setDialogOpen(true);
                                    }}
                                >
                                    {services[service.key] ? "Disable" : "Enable"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <ServiceToggleDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    service={selectedService}
                    onConfirm={handleConfirm}
                />
            </div>
        </DashboardLayout>
    );
}
