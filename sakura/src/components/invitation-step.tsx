import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface InvitationStepProps {
  onNext: () => void;
}

export default function InvitationStep({ onNext }: InvitationStepProps) {
  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          Special Invitation
        </CardTitle>
        <CardDescription className="text-lg">
          I have something to ask you...
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6 py-6">
        <Heart className="w-20 h-20 text-pink-500 mx-auto animate-pulse" />
        <p className="text-xl font-medium">
          I'd like to invite you to spend some time together...
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
