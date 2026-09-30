"use client";

import { CreateProjectFlow } from "@/components/dashboard/project/CreateProjectFlow";

export default function CreateProjectRoute() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col pt-8 pb-20">
      <CreateProjectFlow />
    </div>
  );
}
