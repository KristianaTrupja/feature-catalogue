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

  const handleDownload = () => {
    if (!estimation?.realEstimations) {
      toast.error("No data to export");
      return;
    }
    exportToExcel(estimation.realEstimations, "my-project-data");
  };

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const fetchEstimation = async () => {
      try {
        setLoading(true);
        if (!data || !data.estimationId) {
          throw new Error("Estimation ID is missing");
        }
        const response = await fetch(
          `${baseUrl}/AiEstimation/AiEstimation/${data.estimationId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setEstimation(fetchedData);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch estimation");
      } finally {
        setLoading(false);
      }
    };

    if (data) {
      fetchEstimation();
    }
  }, [data]);

  return (
    <div className="mt-10 bg-gray-200">
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
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={3} className="text-center py-6">
                  Loading estimations...
                </td>
              </tr>
            </tbody>
          ) : estimation?.realEstimations?.length ? (
            <tbody>
              {estimation.realEstimations.map(
                ({ title, description, estimatedHours }, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">{title}</td>
                    <td className="border border-gray-300 px-4 py-2">{description}</td>
                    <td className="border border-gray-300 px-4 py-2">{estimatedHours}</td>
                  </tr>
                )
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={3} className="text-center py-6">
                  No estimations available.
                </td>
              </tr>
            </tbody>
          )}
        </table>

        <Button onClick={handleDownload} disabled={loading || !estimation}>
          Download Excel
        </Button>
      </div>
    </div>
  );
}
