import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";

interface ColumnFilterProps {
  columnKey: string;
  values: string[];
  selectedValues: Set<string>;
  onFilterChange: (columnKey: string, selectedValues: Set<string>) => void;
}

const ColumnFilter = ({
  columnKey,
  values,
  selectedValues,
  onFilterChange,
}: ColumnFilterProps) => {
  const [open, setOpen] = useState(false);
  
  const uniqueValues = useMemo(() => {
    return [...new Set(values)].sort();
  }, [values]);

  const handleToggle = (value: string) => {
    const newSelected = new Set(selectedValues);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    onFilterChange(columnKey, newSelected);
  };

  const handleSelectAll = () => {
    onFilterChange(columnKey, new Set(uniqueValues));
  };

  const handleClearAll = () => {
    onFilterChange(columnKey, new Set());
  };

  const isFiltered = selectedValues.size > 0 && selectedValues.size < uniqueValues.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-5 w-5 p-0 ml-1 ${isFiltered ? "text-primary" : "opacity-50 hover:opacity-100"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Filter className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-3 bg-popover border-border z-50" 
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="flex-1 text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="flex-1 text-xs"
            >
              Clear
            </Button>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {uniqueValues.map((value) => (
              <div
                key={value}
                className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 p-1 rounded"
                onClick={() => handleToggle(value)}
              >
                <Checkbox
                  checked={selectedValues.has(value)}
                  className="border-border"
                />
                <span className="text-sm text-foreground truncate">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnFilter;
