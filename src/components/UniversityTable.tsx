import { useState, useMemo } from "react";
import { University } from "@/data/universities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronUp, ChevronDown, Plus, X } from "lucide-react";
import AddUniversityDialog from "./AddUniversityDialog";
import ColumnFilter from "./ColumnFilter";

interface UniversityTableProps {
  universities: University[];
  onAddUniversity: (university: Omit<University, "id">) => void;
  onDeleteUniversity: (id: string) => void;
}

type SortKey = keyof University;
type SortOrder = "asc" | "desc";

const UniversityTable = ({ universities, onAddUniversity, onDeleteUniversity }: UniversityTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("university");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, Set<string>>>({});

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (columnKey: string, selectedValues: Set<string>) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: selectedValues,
    }));
  };

  // Get all unique values for each column (for filter options)
  const columnValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    columns.forEach((col) => {
      values[col.key] = universities.map((uni) => uni[col.key]);
    });
    return values;
  }, [universities]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = universities.filter((uni) =>
      Object.values(uni).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Apply column filters
    Object.entries(columnFilters).forEach(([columnKey, selectedValues]) => {
      if (selectedValues.size > 0) {
        filtered = filtered.filter((uni) =>
          selectedValues.has(uni[columnKey as SortKey])
        );
      }
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [universities, searchQuery, sortKey, sortOrder, columnFilters]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4 text-primary" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary" />
    );
  };

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "university", label: "University", className: "min-w-[200px]" },
    { key: "country", label: "Country" },
    { key: "scholarship", label: "Scholarship" },
    { key: "totalFee", label: "Total Fee (INR)" },
    { key: "costOfLiving", label: "Living Cost/mo" },
    { key: "duration", label: "Duration" },
    { key: "monthsOfAdmission", label: "Admission" },
    { key: "monthsToApplyBy", label: "Apply By" },
    { key: "worldRanking", label: "World Ranking" },
    { key: "cgpaRequired", label: "CGPA Req." },
    { key: "partTimeJob", label: "Part-time" },
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search universities, countries, fees..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-xl border-border bg-card shadow-soft focus:shadow-glow transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                {/* Delete column header */}
                <TableHead className="w-10"></TableHead>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={`cursor-pointer select-none transition-colors hover:bg-secondary ${column.className || ""}`}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center gap-1 font-semibold text-foreground">
                      {column.label}
                      <SortIcon column={column.key} />
                      <ColumnFilter
                        columnKey={column.key}
                        values={columnValues[column.key] || []}
                        selectedValues={columnFilters[column.key] || new Set()}
                        onFilterChange={handleFilterChange}
                      />
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No universities found 😢
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedData.map((uni, index) => (
                  <TableRow
                    key={uni.id}
                    className={`transition-colors hover:bg-accent/50 ${
                      index % 2 === 0 ? "bg-background" : "bg-secondary/20"
                    }`}
                  >
                    {/* Delete button */}
                    <TableCell className="w-10 p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDeleteUniversity(uni.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {uni.university}
                    </TableCell>
                    <TableCell>{uni.country}</TableCell>
                    <TableCell>{uni.scholarship}</TableCell>
                    <TableCell>{uni.totalFee}</TableCell>
                    <TableCell>{uni.costOfLiving}</TableCell>
                    <TableCell>{uni.duration}</TableCell>
                    <TableCell>{uni.monthsOfAdmission}</TableCell>
                    <TableCell>{uni.monthsToApplyBy}</TableCell>
                    <TableCell>{uni.worldRanking}</TableCell>
                    <TableCell>{uni.cgpaRequired}</TableCell>
                    <TableCell>{uni.partTimeJob}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="gradient-love text-primary-foreground rounded-xl px-8 py-3 font-semibold shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add University
        </Button>
      </div>

      <AddUniversityDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={onAddUniversity}
      />
    </div>
  );
};

export default UniversityTable;
