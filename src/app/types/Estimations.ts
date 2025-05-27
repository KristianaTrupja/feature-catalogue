export interface RealEstimation {
    id: number;
    title: string;
    description: string;
    estimatedHours: number;
  }
  
  export interface EstimationData {
    category: string;
    customer: any;
    customerId: number;
    description: string;
    estimation: number;
    id: number;
    realEstimations: RealEstimation[];
    suggestedNames: string[];
  }
  