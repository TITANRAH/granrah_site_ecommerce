import { getCategories } from "@/actions/admin/get.categories.action";
import CreateNewsForm from "@/components/shared/admin/news/CreateNewForm";
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
