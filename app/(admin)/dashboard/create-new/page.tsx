import { getCategories } from "@/actions/admin/get.categories.action";
import CreateNewsForm from "@/components/sections/admin/CreateNewForm";
import React from "react";

async function CreateNewAdminPage() {
  const response = await getCategories();

  return (
    <div>
      <CreateNewsForm categories={response} />
    </div>
  );
}

export default CreateNewAdminPage;
