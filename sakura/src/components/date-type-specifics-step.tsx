import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { dateTypeOptions } from "@/lib/date-options";
import type { DateTypeOption } from "@/lib/types";

interface DateTypeSpecificsStepProps {
  dateType: string;
  onNext: (specifics: string) => void;
}

export default function DateTypeSpecificsStep({
  dateType,
  onNext,
}: DateTypeSpecificsStepProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentDateType, setCurrentDateType] = useState<DateTypeOption | null>(
    null
  );

  useEffect(() => {
    const dateTypeOption =
      dateTypeOptions.find((option) => option.value === dateType) || null;
    setCurrentDateType(dateTypeOption);
    setSelectedOption("");
  }, [dateType]);

  const handleNext = () => {
    if (selectedOption) {
      onNext(selectedOption);
    }
  };

  if (!currentDateType) {
    return (
      <Card className="border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-600">
            Please Select a Date Type
          </CardTitle>
          <CardDescription className="text-lg">
            Go back and select a date type first
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p>No date type selected. Please go back and choose a date type.</p>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button
            onClick={() => window.history.back()}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          {currentDateType.specifics.title}
        </CardTitle>
        <CardDescription className="text-lg">
          Choose your preference for the {currentDateType.label.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <RadioGroup
          value={selectedOption}
          onValueChange={setSelectedOption}
          className="space-y-3"
        >
          {currentDateType.specifics.options.map((option) => (
            <div key={option.value} className="flex items-center">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.value}
                className="flex items-center w-full p-4 rounded-lg border-2 border-muted peer-data-[state=checked]:border-pink-500 hover:bg-muted/50 transition-all cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
