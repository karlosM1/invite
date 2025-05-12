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

interface FoodPreferenceStepProps {
  onNext: (foodPreference: string) => void;
}

export default function FoodPreferenceStep({
  onNext,
}: FoodPreferenceStepProps) {
  const [selectedFood, setSelectedFood] = useState<string>("");

  const foodOptions = [
    { value: "italian", label: "Italian" },
    { value: "japanese", label: "Japanese" },
    { value: "mexican", label: "Mexican" },
    { value: "indian", label: "Indian" },
    { value: "chinese", label: "Chinese" },
    { value: "american", label: "American" },
    { value: "thai", label: "Thai" },
    { value: "vegetarian", label: "Vegetarian" },
  ];

  const handleNext = () => {
    if (selectedFood) {
      onNext(selectedFood);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          Food Preference
        </CardTitle>
        <CardDescription className="text-lg">
          What type of food would you like?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <RadioGroup
          value={selectedFood}
          onValueChange={setSelectedFood}
          className="grid grid-cols-2 gap-3"
        >
          {foodOptions.map((food) => (
            <div key={food.value} className="flex items-center">
              <RadioGroupItem
                value={food.value}
                id={food.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={food.value}
                className="flex items-center justify-center w-full p-3 rounded-lg border-2 border-muted peer-data-[state=checked]:border-pink-500 hover:bg-muted/50 transition-all cursor-pointer text-center"
              >
                {food.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedFood}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
