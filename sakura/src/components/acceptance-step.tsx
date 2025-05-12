import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import catcry from "@/assets/gif/catto.gif";

interface AcceptanceStepProps {
  onNext: () => void;
}

export default function AcceptanceStep({ onNext }: AcceptanceStepProps) {
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesButtonSize(yesButtonSize + 0.2);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          Will you go on a date with me?
        </CardTitle>
        <div>
          <img src={catcry} alt="My GIF" />
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-8 ">
        <p className="text-xl">Would you like to go on a date with me?</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 pb-8">
        <motion.div
          animate={{ scale: yesButtonSize }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Yes
          </Button>
        </motion.div>

        <Button
          onClick={handleNoClick}
          variant="outline"
          size="lg"
          className={`px-8 py-6 text-lg rounded-full border-pink-300 text-pink-700 hover:bg-pink-50 transition-all ${
            noCount > 5 ? "opacity-50" : ""
          }`}
          style={{
            opacity: Math.max(1 - noCount * 0.1, 0.3),
            transform: `scale(${Math.max(1 - noCount * 0.05, 0.7)})`,
          }}
        >
          {getNoButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
}
