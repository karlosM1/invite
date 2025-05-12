import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerStepProps {
  onNext: (date: Date) => void;
}

export default function DatePickerStep({ onNext }: DatePickerStepProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleNext = () => {
    if (date) {
      onNext(date);
    }
  };

  // Get tomorrow's date for the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get date 3 months from now for the maximum selectable date
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          Choose a Date
        </CardTitle>
        <CardDescription className="text-lg">
          When would you be available?
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6 py-6">
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                fromDate={tomorrow}
                toDate={threeMonthsFromNow}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={handleNext}
          disabled={!date}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
