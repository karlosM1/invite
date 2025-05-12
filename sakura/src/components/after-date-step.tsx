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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface AfterDateStepProps {
  onNext: (data: { afterDateActivity: string; suggestions: string }) => void;
}

export default function AfterDateStep({ onNext }: AfterDateStepProps) {
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string>("");

  const activityOptions = [
    { value: "walk", label: "A nice walk" },
    { value: "dessert", label: "Dessert somewhere" },
    { value: "home", label: "Head home" },
  ];

  const handleNext = () => {
    if (selectedActivity) {
      onNext({
        afterDateActivity: selectedActivity,
        suggestions: suggestions,
      });
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          After the Date
        </CardTitle>
        <CardDescription className="text-lg">
          What would you like to do after?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <RadioGroup
          value={selectedActivity}
          onValueChange={setSelectedActivity}
          className="space-y-3"
        >
          {activityOptions.map((activity) => (
            <div key={activity.value} className="flex items-center">
              <RadioGroupItem
                value={activity.value}
                id={activity.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={activity.value}
                className="flex items-center w-full p-3 rounded-lg border-2 border-muted peer-data-[state=checked]:border-pink-500 hover:bg-muted/50 transition-all cursor-pointer"
              >
                {activity.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="space-y-2 pt-4">
          <Label htmlFor="suggestions" className="text-base">
            Any other suggestions or preferences?
          </Label>
          <Textarea
            id="suggestions"
            placeholder="Share any other ideas or preferences you have..."
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedActivity}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
