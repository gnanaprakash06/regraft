// src/pages/AccountSettings.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useDoctorProfileQuery,
    useNotificationPreferencesQuery,
    useUpdateDoctorProfileMutation,
    useUpdatePreferencesMutation,
} from "@/hooks/queries";

export default function AccountSettings() {
    const { data: profile, isLoading: isProfileLoading } = useDoctorProfileQuery();
    const { data: preferences, isLoading: isPrefsLoading } = useNotificationPreferencesQuery();

    const { mutate: updateProfile, isPending: isUpdatingProfile } =
        useUpdateDoctorProfileMutation();
    const { mutate: updatePreferences } = useUpdatePreferencesMutation();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("Lead Craniofacial Surgeon");
    const [phone, setPhone] = useState("+91 98765 43210");
    const [hospital, setHospital] = useState("");
    const [registrationId, setRegistrationId] = useState("TNMC-88213");
    const [referralCode, setReferralCode] = useState("");

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName);
            setEmail(profile.email);
            setDesignation(profile.designation);
            setPhone(profile.phone);
            setHospital(profile.hospital);
            setRegistrationId(profile.registrationId);
            setReferralCode(profile.referralCode);
        }
    }, [profile]);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(
            {
                fullName,
                email,
                designation,
                phone,
                hospital,
                registrationId,
                referralCode,
            },
            {
                onSuccess: () => {
                    toast.success("Profile changes saved successfully!");
                },
                onError: () => {
                    toast.error("Failed to save changes. Please try again.");
                },
            },
        );
    };

    const handleTogglePreference = (id: string, currentEnabled: boolean) => {
        if (!preferences) return;
        const updated = preferences.map((p) =>
            p.id === id ? { ...p, enabled: !currentEnabled } : p,
        );
        updatePreferences(updated, {
            onSuccess: () => {
                toast.success("Notification preferences updated");
            },
        });
    };

    const initials = fullName
        ? fullName
              .replace("Dr. ", "")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "SR";

    return (
        <div className="p-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs sm:p-10">
                {/* Profile Avatar Header */}
                <div className="mb-8 flex items-center gap-5">
                    <Avatar className="size-20 bg-[#0D47A1] text-white shadow-xs">
                        <AvatarImage src={profile?.avatar} alt={fullName} />
                        <AvatarFallback className="bg-[#0D47A1] text-2xl font-bold text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-8 rounded-lg border-blue-400 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                        >
                            Change Photo
                        </Button>
                        <p className="text-xs text-slate-400">JPG or PNG, at least 200×200px</p>
                    </div>
                </div>

                {isProfileLoading ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        {/* 2-Column Form Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
                                />
                            </div>

                            {/* Designation Dropdown */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Designation
                                </label>
                                <Select value={designation} onValueChange={setDesignation}>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                        <SelectValue placeholder="Select designation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Lead Craniofacial Surgeon">
                                            Lead Craniofacial Surgeon
                                        </SelectItem>
                                        <SelectItem value="Senior Consultant Neurosurgeon">
                                            Senior Consultant Neurosurgeon
                                        </SelectItem>
                                        <SelectItem value="Oral & Maxillofacial Surgeon">
                                            Oral & Maxillofacial Surgeon
                                        </SelectItem>
                                        <SelectItem value="Plastic & Reconstructive Surgeon">
                                            Plastic & Reconstructive Surgeon
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
                                />
                            </div>

                            {/* Phone Number Dropdown/Select */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Phone number
                                </label>
                                <Select value={phone} onValueChange={setPhone}>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                        <SelectValue placeholder="Select phone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="+91 98765 43210">
                                            +91 98765 43210 (Primary)
                                        </SelectItem>
                                        <SelectItem value="+91 98401 23456">
                                            +91 98401 23456 (Hospital)
                                        </SelectItem>
                                        <SelectItem value="+91 99620 98765">
                                            +91 99620 98765 (Clinic)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Hospital / Clinic */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Hospital/Clinic
                                </label>
                                <input
                                    type="text"
                                    value={hospital}
                                    onChange={(e) => setHospital(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
                                />
                            </div>

                            {/* Registration ID Dropdown */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Registration ID
                                </label>
                                <Select value={registrationId} onValueChange={setRegistrationId}>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                        <SelectValue placeholder="Select Registration ID" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TNMC-88213">TNMC-88213</SelectItem>
                                        <SelectItem value="MCI-45892">MCI-45892</SelectItem>
                                        <SelectItem value="DMC-31204">DMC-31204</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Referral Code */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-800">
                                    Referral Code
                                </label>
                                <input
                                    type="text"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
                                />
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div>
                            <Button
                                type="submit"
                                disabled={isUpdatingProfile}
                                className="h-12 rounded-xl bg-[#1565C0] px-8 text-sm font-semibold text-white shadow-md shadow-blue-900/10 hover:bg-[#0D47A1]"
                            >
                                {isUpdatingProfile ? "Saving Changes..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Notification Preferences Section */}
                <div className="mt-12 space-y-4 border-t border-slate-100 pt-8">
                    <h3 className="text-base font-bold text-slate-900">Notification preferences</h3>

                    {isPrefsLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {preferences?.map((pref) => (
                                <div
                                    key={pref.id}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100/60 bg-[#F1F5F9]/80 p-5"
                                >
                                    <div>
                                        <p className="text-xs font-bold text-slate-900">
                                            {pref.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            {pref.description}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={pref.enabled}
                                        onCheckedChange={() =>
                                            handleTogglePreference(pref.id, pref.enabled)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
