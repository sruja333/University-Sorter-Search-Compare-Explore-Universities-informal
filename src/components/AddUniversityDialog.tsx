import { useState } from "react";
import { University } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddUniversityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (university: Omit<University, "id">) => void;
}

const AddUniversityDialog = ({
  open,
  onOpenChange,
  onAdd,
}: AddUniversityDialogProps) => {
  const [formData, setFormData] = useState({
    university: "",
    country: "",
    scholarship: "",
    totalFee: "",
    costOfLiving: "",
    duration: "",
    monthsOfAdmission: "",
    monthsToApplyBy: "",
    worldRanking: "",
    cgpaRequired: "",
    partTimeJob: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.university.trim() || !formData.country.trim()) {
      toast.error("Please fill in at least University and Country");
      return;
    }

    onAdd(formData);
    toast.success("University added successfully! 🎓");
    setFormData({
      university: "",
      country: "",
      scholarship: "",
      totalFee: "",
      costOfLiving: "",
      duration: "",
      monthsOfAdmission: "",
      monthsToApplyBy: "",
      worldRanking: "",
      cgpaRequired: "",
      partTimeJob: "",
    });
    onOpenChange(false);
  };

  const fields = [
    { key: "university", label: "University Name", placeholder: "e.g., Harvard University" },
    { key: "country", label: "Country", placeholder: "e.g., USA" },
    { key: "scholarship", label: "Scholarship", placeholder: "e.g., Yes (50%)" },
    { key: "totalFee", label: "Total Fee (INR)", placeholder: "e.g., 45L" },
    { key: "costOfLiving", label: "Cost of Living/month", placeholder: "e.g., 1.5L" },
    { key: "duration", label: "Duration", placeholder: "e.g., 2 yrs" },
    { key: "monthsOfAdmission", label: "Admission Months", placeholder: "e.g., Sep" },
    { key: "monthsToApplyBy", label: "Apply By", placeholder: "e.g., Jun–Aug" },
    { key: "worldRanking", label: "World Ranking", placeholder: "e.g., #5 (QS 2026)" },
    { key: "cgpaRequired", label: "CGPA Required", placeholder: "e.g., 8.0" },
    { key: "partTimeJob", label: "Part-time Job", placeholder: "e.g., Yes" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-gradient-love text-center">
            Add New University 🎓
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key} className="text-sm font-medium text-foreground">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="h-10 rounded-lg border-border focus:ring-primary"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-love text-primary-foreground rounded-xl h-11 font-semibold shadow-soft hover:shadow-glow transition-all"
            >
              Add University ✨
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUniversityDialog;
