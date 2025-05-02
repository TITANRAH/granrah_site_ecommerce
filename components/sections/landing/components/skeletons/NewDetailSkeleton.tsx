import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function NewDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal (2/3) */}
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-24 mb-8 bg-gray-200/20" />
            <Card className="bg-background/95 backdrop-blur-lg border-red-500/20">
              <div className="relative h-[400px] w-full">
                <Skeleton className="w-full h-full bg-gray-200/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-6 w-24 bg-gray-200/20 rounded-full" />
                  <Skeleton className="h-4 w-32 bg-gray-200/20" />
                </div>
                <Skeleton className="h-10 w-3/4 bg-gray-200/20 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full bg-gray-200/20" />
                  <Skeleton className="h-4 w-full bg-gray-200/20" />
                  <Skeleton className="h-4 w-2/3 bg-gray-200/20" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Lateral (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-23">
              <Card className="bg-background/95 backdrop-blur-lg border-red-500/20 p-6">
                <Skeleton className="h-8 w-48 bg-gray-200/20 mb-6" />
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="group">
                      <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                        <Skeleton className="w-full h-full bg-gray-200/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <Skeleton className="h-6 w-3/4 bg-gray-200/20 mb-2" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gray-200/20" />
                        <Skeleton className="h-4 w-2/3 bg-gray-200/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDetailSkeleton;
