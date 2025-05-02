import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function NewCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden border-white/10">
      <div className="absolute top-5 md:top-4 right-4">
        <Skeleton className="h-6 w-24 bg-white/15 rounded-full" />
      </div>
      <div className="flex flex-col ">
        <div className="w-full relative">
          <div className="relative overflow-hidden pt-10">
            <Skeleton className="w-full h-48 bg-gray-200/20 dark:bg-gray-700/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
        <div className="flex-1 p-6">
          <CardHeader className="p-0">
            <Skeleton className="h-8 w-3/4 bg-gray-200/20 dark:bg-gray-700/20" />
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200/20 dark:bg-gray-700/20" />
              <Skeleton className="h-4 w-2/3 bg-gray-200/20 dark:bg-gray-700/20" />
            </div>
            <div className="mt-6">
              <Skeleton className="h-10 w-24 bg-gray-200/20 dark:bg-gray-700/20" />
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default NewCardSkeleton;
