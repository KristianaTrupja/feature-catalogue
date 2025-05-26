import React from "react";
import { Button } from "../ui/button";
import { exportToExcel } from "@/app/utils/exportToExel";

const estimationData = [
  {
    category: "Module A",
    description: "Basic implementation with standard features.",
    dev: "5 days",
    pm: "2 days",
    qa: "3 days",
    total: "2 weeks",
  },
  {
    category: "Module B",
    description: "Includes advanced customization and integrations.",
    dev: "15 days",
    pm: "3 days",
    qa: "5 days",
    total: "1 month",
  },
  {
    category: "Module C",
    description: "Minor feature update and bug fixes.",
    dev: "1 day",
    pm: "1 day",
    qa: "1 day",
    total: "3 days",
  },
];

export default function Estimation() {
  const handleDownload = () => {
    exportToExcel(estimationData, "my-project-data");
  };

  return (
    <div className="mt-10 bg-gray-200">
      <div className="container lg:w-3/4 space-y-8 p-5 lg:p-10">
        <h1 className="text-3xl font-bold">Estimation Results</h1>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Dev</th>
              <th className="border border-gray-300 px-4 py-2 text-left">PM</th>
              <th className="border border-gray-300 px-4 py-2 text-left">QA</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total estimation</th>
            </tr>
          </thead>
          <tbody>
            {estimationData.map(
              ({ category, description, dev, pm, qa, total }, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2">{category}</td>
                  <td className="border border-gray-300 px-4 py-2">{description}</td>
                  <td className="border border-gray-300 px-4 py-2">{dev}</td>
                  <td className="border border-gray-300 px-4 py-2">{pm}</td>
                  <td className="border border-gray-300 px-4 py-2">{qa}</td>
                  <td className="border border-gray-300 px-4 py-2">{total}</td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <Button onClick={handleDownload}>Download Excel</Button>
      </div>
    </div>
  );
}
