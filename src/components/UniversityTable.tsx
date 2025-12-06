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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ChevronUp, ChevronDown, Plus, X, Filter } from "lucide-react";
import AddUniversityDialog from "./AddUniversityDialog";

interface UniversityTableProps {
  universities: University[];
  onAddUniversity: (university: Omit<University, "id">) => void;
  onDeleteUniversity: (id: string) => void;
}

type SortKey = keyof University;
type SortOrder = "asc" | "desc";
type Filters = Partial<Record<SortKey, Set<string>>>;

const UniversityTable = ({ universities, onAddUniversity, onDeleteUniversity }: UniversityTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("university");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getUniqueValues = (key: SortKey) => {
    const values = new Set(universities.map((uni) => uni[key]));
    return Array.from(values).sort();
  };

  const toggleFilter = (column: SortKey, value: string) => {
    setFilters((prev) => {
      const currentSet = prev[column] || new Set<string>();
      const newSet = new Set(currentSet);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      if (newSet.size === 0) {
        const { [column]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [column]: newSet };
    });
  };

  const clearFilter = (column: SortKey) => {
    setFilters((prev) => {
      const { [column]: _, ...rest } = prev;
      return rest;
    });
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = universities.filter((uni) =>
      Object.values(uni).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // Apply column filters
    Object.entries(filters).forEach(([column, selectedValues]) => {
      if (selectedValues && selectedValues.size > 0) {
        filtered = filtered.filter((uni) =>
          selectedValues.has(uni[column as SortKey])
        );
      }
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [universities, searchQuery, sortKey, sortOrder, filters]);

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
                <TableHead className="w-10"></TableHead>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={`select-none transition-colors ${column.className || ""}`}
                  >
                    <div className="flex items-center gap-1 font-semibold text-foreground">
                      <span
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleSort(column.key)}
                      >
                        {column.label}
                      </span>
                      <SortIcon column={column.key} />
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="ml-1 p-1 hover:bg-accent rounded transition-colors">
                            <Filter
                              className={`w-3 h-3 ${
                                filters[column.key]?.size ? "text-primary" : "opacity-50"
                              }`}
                            />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-3 bg-card border-border z-50" align="start">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Filter {column.label}</span>
                              {filters[column.key]?.size ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => clearFilter(column.key)}
                                >
                                  Clear
                                </Button>
                              ) : null}
                            </div>
                            <div className="max-h-48 overflow-y-auto space-y-1">
                              {getUniqueValues(column.key).map((value) => (
                                <label
                                  key={value}
                                  className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-1 rounded text-sm"
                                >
                                  <Checkbox
                                    checked={filters[column.key]?.has(value) || false}
                                    onCheckedChange={() => toggleFilter(column.key, value)}
                                  />
                                  <span className="truncate">{value}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
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
                    <TableCell className="w-10 p-2">
                      <button
                        onClick={() => onDeleteUniversity(uni.id)}
                        className="p-1 hover:bg-destructive/20 rounded transition-colors group"
                        title="Remove row"
                      >
                        <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                      </button>
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
