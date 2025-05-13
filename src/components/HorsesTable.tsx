import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHorses } from "@/hooks/useHorses";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Horse } from "@/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, AlertCircle, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type HorsesTableProps = {
  onViewHorse: (horse: Horse) => void;
};

export const HorsesTable = ({ onViewHorse }: HorsesTableProps) => {
  const { data, isLoading, error } = useHorses();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // for big data sets the API would return the total number of items and the items per page
  // and we do the pagination on the server side but since the API doesn't return the total number of items
  // im doing the pagination on the client side


  // Calculate pagination
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle size={20} />
          <p className="font-medium">Error loading horses: {error.message}</p>
        </div>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No horses added yet</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <Table data-testid="horses-table" className="border-collapse">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead data-testid="horses-table-head-name" className="font-semibold">Name</TableHead>
            <TableHead data-testid="horses-table-head-height" className="font-semibold">Height</TableHead>
            <TableHead data-testid="horses-table-head-weight" className="font-semibold">Weight</TableHead>
            <TableHead data-testid="horses-table-head-favorite-food" className="font-semibold">
              Favorite Food
            </TableHead>
            <TableHead
              className="text-right font-semibold"
              data-testid="horses-table-head-actions"
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((horse) => (
            <TableRow 
              key={horse.id} 
              className="hover:bg-muted/50 transition-colors border-b"
            >
              <TableCell
                className="font-medium"
                data-testid="horses-table-cell-name"
              >
                {horse.name}
              </TableCell>
              <TableCell data-testid="horses-table-cell-height">
                {horse.profile.physical.height ? (
                  <Badge variant="outline">{horse.profile.physical.height}</Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">Empty</span>
                )}
              </TableCell>
              <TableCell data-testid="horses-table-cell-weight">
                {horse.profile.physical.weight ? (
                  <Badge variant="outline">{horse.profile.physical.weight}</Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">Empty</span>
                )}
              </TableCell>
              <TableCell data-testid="horses-table-cell-favorite-food">
                {horse.profile.favouriteFood ? (
                  horse.profile.favouriteFood
                ) : (
                  <span className="text-muted-foreground text-sm">Empty</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 hover:bg-primary hover:text-primary-foreground"
                  data-testid="horses-table-cell-actions-view"
                  onClick={() => onViewHorse(horse)}
                >
                  <Eye size={16} />
                  <span>View</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span>-
          <span className="font-medium">{Math.min(indexOfLastItem, data.length)}</span> of{" "}
          <span className="font-medium">{data.length}</span> horses
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            size="sm"
            className="h-8 w-8 p-0"
            data-testid="pagination-prev"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft size={16} />
          </Button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            size="sm"
            className="h-8 w-8 p-0"
            data-testid="pagination-next"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};
