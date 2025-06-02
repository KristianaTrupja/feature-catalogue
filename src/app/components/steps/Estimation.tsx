"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { exportToExcel } from "@/app/utils/exportToExel";
import { EstimationData } from "@/app/types/Estimations";
import { useFormContext } from "@/app/context/FormContext";
import { toast } from "sonner";

export default function Estimation() {
  const [estimation, setEstimation] = useState<EstimationData | null>(null);
  const [loading, setLoading] = useState(false);
  const { data } = useFormContext();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    const fetchEstimation = async () => {
      if (!data?.estimationId) {
        toast.error("Estimation ID is missing");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/AiEstimation/AiEstimation/${data.estimationId}`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const result = await res.json();
        setEstimation(result);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch estimation");
      } finally {
        setLoading(false);
      }
    };

    fetchEstimation();
  }, [data, baseUrl]);

  const handleDownload = () => {
    if (!estimation?.realEstimations?.length) {
      toast.error("No data to export");
      return;
    }

    const formatted = estimation.realEstimations.map(({ title, description, estimatedHours }) => ({
      Category: title,
      Description: description,
      "Total estimation": estimatedHours,
    }));

    exportToExcel(formatted, "my-project-data");
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={3} className="text-center py-6">Loading estimations...</td>
        </tr>
      );
    }

    if (!estimation?.realEstimations?.length) {
      return (
        <tr>
          <td colSpan={3} className="text-center py-6">No estimations available.</td>
        </tr>
      );
    }

    return estimation.realEstimations.map(({ title, description, estimatedHours }, idx) => (
      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <td className="border border-gray-300 px-4 py-2">{title}</td>
        <td className="border border-gray-300 px-4 py-2">{description}</td>
        <td className="border border-gray-300 px-4 py-2">{estimatedHours}</td>
      </tr>
    ));
  };

  return (
    <div className="h-full bg-right bg-contain bg-no-repeat bg-[url('/images/bg-2.webp')] bg-[#fdfdfd]">
      <div className="container lg:w-3/4 space-y-8 p-5 lg:p-10">
        <h1 className="text-3xl font-bold">Estimation Results</h1>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total estimation</th>
            </tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>

        <Button onClick={handleDownload} disabled={loading || !estimation}>
          {loading ? "Please wait..." : "Download Excel"}
        </Button>
      </div>
    </div>
  );
}
