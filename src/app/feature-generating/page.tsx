import { Suspense } from "react";
import StepContainer from "./StepContainer";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepContainer />
    </Suspense>
  );
}
