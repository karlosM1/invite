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
import { useState } from "react";
import { dateTypeOptions } from "@/lib/date-options";

interface DateTypeStepProps {
  onNext: (dateType: string) => void;
}

export default function DateTypeStep({ onNext }: DateTypeStepProps) {
  const [selectedType, setSelectedType] = useState<string>("");

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          Type of Date
        </CardTitle>
        <CardDescription className="text-lg">
          What kind of date would you prefer?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <RadioGroup
          value={selectedType}
          onValueChange={setSelectedType}
          className="space-y-3"
        >
          {dateTypeOptions.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.value} className="flex items-center">
                <RadioGroupItem
                  value={type.value}
                  id={type.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={type.value}
                  className="flex items-center space-x-3 w-full p-4 rounded-lg border-2 border-muted peer-data-[state=checked]:border-pink-500 hover:bg-muted/50 transition-all cursor-pointer"
                >
                  {Icon && <Icon className="h-5 w-5 text-pink-600" />}
                  <span>{type.label}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedType}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
