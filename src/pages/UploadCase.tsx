// src/pages/UploadCase.tsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileCheck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSubmitCaseMutation } from "@/hooks/queries";
import type { CaseType } from "@/types";

export default function UploadCase() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [patientName, setPatientName] = useState<string>("PT-9024");
    const [surgeonName, setSurgeonName] = useState<string>("Dr. Santhoshkumar R");
    const [caseType, setCaseType] = useState<CaseType>("Cranial");
    const [implantMaterial, setImplantMaterial] = useState<string>("Titanium Grade 5");
    const [notes, setNotes] = useState<string>("");
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { mutate: submitCase, isPending } = useSubmitCaseMutation();

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!acceptedTerms) {
            toast.error("Please accept the terms and conditions before submitting.");
            return;
        }

        submitCase(
            {
                patientName,
                surgeonName,
                caseType,
                implantMaterial,
                notes,
                file: selectedFile,
            },
            {
                onSuccess: (data) => {
                    toast.success(`Case created successfully! Case ID: ${data.caseId}`);
                    navigate("/cases");
                },
                onError: () => {
                    toast.error("Failed to submit case. Please try again.");
                },
            },
        );
    };

    return (
        <div className="p-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Drag & Drop Zone */}
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleFileDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                            isDragging
                                ? "border-blue-500 bg-blue-50/50"
                                : selectedFile
                                  ? "border-emerald-400 bg-emerald-50/20"
                                  : "border-blue-400/80 bg-white hover:border-blue-500 hover:bg-slate-50/50"
                        }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".dcm,.zip,.stl,.obj,.nii"
                        />

                        <div className="mb-3 flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#1565C0]">
                            <UploadCloud className="size-8" />
                        </div>

                        <h3 className="text-base font-bold text-slate-800">
                            Drag & drop your CT/DICOM scan here
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Supported formats DICOM, STL, OBJ, TIFF up to 500MB
                        </p>

                        <div className="mt-5">
                            <Button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="h-10 rounded-xl bg-[#1565C0] px-7 text-xs font-semibold text-white hover:bg-[#0D47A1]"
                            >
                                Browse Files
                            </Button>
                        </div>

                        {selectedFile && (
                            <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-100/80 px-4 py-2 text-xs font-medium text-emerald-800">
                                <FileCheck className="size-4 text-emerald-600" />
                                <span>
                                    {selectedFile.name} (
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                    }}
                                    className="ml-2 hover:text-rose-600"
                                >
                                    <X className="size-3.5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Form Fields: 2-Column Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Patient Name Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-800">
                                Patient name
                            </label>
                            <Select value={patientName} onValueChange={setPatientName}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PT-9024">PT-9024 (Suresh K)</SelectItem>
                                    <SelectItem value="PT-8817">PT-8817 (Priya M)</SelectItem>
                                    <SelectItem value="PT-8990">PT-8990 (Arun V)</SelectItem>
                                    <SelectItem value="PT-1024">PT-1024 (Meena R)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Surgeon Name Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-800">
                                Surgeon name
                            </label>
                            <Select value={surgeonName} onValueChange={setSurgeonName}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select surgeon" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dr. Santhoshkumar R">
                                        Dr. Santhoshkumar R
                                    </SelectItem>
                                    <SelectItem value="Dr. Rajesh K">Dr. Rajesh K</SelectItem>
                                    <SelectItem value="Dr. Anita Desai">Dr. Anita Desai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Case Type Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-800">
                                Case type
                            </label>
                            <Select
                                value={caseType}
                                onValueChange={(val) => setCaseType(val as CaseType)}
                            >
                                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select case type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cranial">Cranial</SelectItem>
                                    <SelectItem value="Orbital">Orbital</SelectItem>
                                    <SelectItem value="Maxillofacial">Maxillofacial</SelectItem>
                                    <SelectItem value="TMJ">TMJ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Implant Materials Dropdown */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-800">
                                Implant materials
                            </label>
                            <Select value={implantMaterial} onValueChange={setImplantMaterial}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select material" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Titanium Grade 5">
                                        Titanium Grade 5 (Ti6Al4V ELI)
                                    </SelectItem>
                                    <SelectItem value="PEEK">
                                        PEEK (Polyetheretherketone)
                                    </SelectItem>
                                    <SelectItem value="Biocompatible Ceramic">
                                        Biocompatible Ceramic
                                    </SelectItem>
                                    <SelectItem value="Porous Titanium">
                                        Porous Titanium Scaffold
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Notes for Design Team */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-800">
                            Notes For the Design Team
                        </label>
                        <textarea
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Lead Craniofacial Surgeon - include defect margins, screw thickness preferences, or reconstruction requirements..."
                            className="w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
                        />
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-center gap-2.5">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="size-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="terms" className="cursor-pointer text-xs text-slate-700">
                            I accept the{" "}
                            <span className="font-semibold text-blue-600 underline">
                                terms and Conditions
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-12 rounded-xl bg-[#1565C0] px-8 text-sm font-semibold text-white shadow-md shadow-blue-900/10 hover:bg-[#0D47A1]"
                        >
                            {isPending ? "Submitting Case..." : "Submit Case"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
