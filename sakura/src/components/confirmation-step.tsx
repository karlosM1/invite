import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { DateInvitationData } from "@/lib/types";
import {
  Heart,
  Calendar,
  Utensils,
  MapPin,
  MessageSquare,
  Save,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { getDateTypeLabel, getDateTypeSpecificLabel } from "@/lib/date-options";

interface ConfirmationStepProps {
  formData: DateInvitationData;
  onSave: () => void;
}

export default function ConfirmationStep({
  formData,
  onSave,
}: ConfirmationStepProps) {
  useEffect(() => {
    // Trigger confetti when the component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff77e9", "#ff77bc", "#ff5e5e", "#9d65ff"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff77e9", "#ff77bc", "#ff5e5e", "#9d65ff"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Helper function to get a readable label for the after date activity
  const getActivityLabel = (value: string) => {
    const activities: Record<string, string> = {
      walk: "A nice walk",
      dessert: "Dessert somewhere",
      home: "Head home",
    };
    return activities[value] || value;
  };

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          It's a Date!
        </CardTitle>
        <CardDescription className="text-lg">
          Thank you for accepting my invitation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="flex justify-center">
          <Heart className="w-20 h-20 text-pink-500 animate-pulse" />
        </div>

        <div className="space-y-4 bg-pink-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-center text-pink-700 mb-4">
            Our Date Details
          </h3>

          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-pink-600 mt-0.5" />
            <div>
              <p className="font-medium">When:</p>
              <p>
                {formData.date
                  ? format(formData.date, "EEEE, MMMM do, yyyy")
                  : "Date not selected"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Utensils className="w-5 h-5 text-pink-600 mt-0.5" />
            <div>
              <p className="font-medium">What:</p>
              <p>
                {getDateTypeLabel(formData.dateType)}
                {formData.dateTypeSpecifics && (
                  <>
                    {" "}
                    -{" "}
                    {getDateTypeSpecificLabel(
                      formData.dateType,
                      formData.dateTypeSpecifics
                    )}
                  </>
                )}
              </p>
              <p>With {formData.foodPreference} food</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-pink-600 mt-0.5" />
            <div>
              <p className="font-medium">After:</p>
              <p>{getActivityLabel(formData.afterDateActivity)}</p>
            </div>
          </div>

          {formData.suggestions && (
            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-pink-600 mt-0.5" />
              <div>
                <p className="font-medium">Your suggestions:</p>
                <p className="italic">"{formData.suggestions}"</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center pt-4">
          <p className="text-lg font-medium text-pink-700">
            I'm looking forward to our time together!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            I'll reach out soon to confirm all the details.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={onSave}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Save className="mr-2 h-5 w-5" />
          Save Responses
        </Button>
      </CardFooter>
    </Card>
  );
}
