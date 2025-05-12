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
  Copy,
  Share2,
  Download,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResponsesStepProps {
  formData: DateInvitationData;
  invitationId: string;
}

export default function ResponsesStep({
  formData,
  invitationId,
}: ResponsesStepProps) {
  const [copied, setCopied] = useState(false);

  // Helper function to get a readable label for the date type
  const getDateTypeLabel = (value: string) => {
    const types: Record<string, string> = {
      coffee: "Coffee Date",
      dinner: "Dinner Date",
      movie: "Movie Date",
      concert: "Concert/Show",
      outdoor: "Outdoor Activity",
    };
    return types[value] || value;
  };

  // Helper function to get a readable label for the after date activity
  const getActivityLabel = (value: string) => {
    const activities: Record<string, string> = {
      walk: "A nice walk",
      dessert: "Dessert somewhere",
      drinks: "Drinks at a bar",
      dancing: "Dancing",
      home: "Head home",
    };
    return activities[value] || value;
  };

  const copyToClipboard = () => {
    const responseText = `
Date Invitation Response:
- Invitation ID: ${invitationId}
- Date: ${
      formData.date
        ? format(formData.date, "EEEE, MMMM do, yyyy")
        : "Not selected"
    }
- Date Type: ${getDateTypeLabel(formData.dateType)}
- Food Preference: ${formData.foodPreference}
- After Date Activity: ${getActivityLabel(formData.afterDateActivity)}
${
  formData.suggestions
    ? `- Additional Suggestions: ${formData.suggestions}`
    : ""
}
    `.trim();

    navigator.clipboard.writeText(responseText).then(
      () => {
        setCopied(true);
        toast.success("Copied to clipboard", {
          description:
            "The response details have been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy", {
          description: "There was an error copying the text to clipboard.",
        });
      }
    );
  };

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(invitationId).then(
      () => {
        toast.success("ID copied to clipboard", {
          description: "The invitation ID has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy", {
          description: "There was an error copying the ID to clipboard.",
        });
      }
    );
  };

  const downloadResponses = () => {
    const responseText = `
Date Invitation Response:
- Invitation ID: ${invitationId}
- Date: ${
      formData.date
        ? format(formData.date, "EEEE, MMMM do, yyyy")
        : "Not selected"
    }
- Date Type: ${getDateTypeLabel(formData.dateType)}
- Food Preference: ${formData.foodPreference}
- After Date Activity: ${getActivityLabel(formData.afterDateActivity)}
${
  formData.suggestions
    ? `- Additional Suggestions: ${formData.suggestions}`
    : ""
}
    `.trim();

    const blob = new Blob([responseText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `date-invitation-response-${invitationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Downloaded responses", {
      description: "The response details have been downloaded as a text file.",
    });
  };

  const shareResponses = async () => {
    const responseText = `
Date Invitation Response:
- Invitation ID: ${invitationId}
- Date: ${
      formData.date
        ? format(formData.date, "EEEE, MMMM do, yyyy")
        : "Not selected"
    }
- Date Type: ${getDateTypeLabel(formData.dateType)}
- Food Preference: ${formData.foodPreference}
- After Date Activity: ${getActivityLabel(formData.afterDateActivity)}
${
  formData.suggestions
    ? `- Additional Suggestions: ${formData.suggestions}`
    : ""
}
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Date Invitation Response",
          text: responseText,
        });
        toast.success("Shared successfully", {
          description: "The response details have been shared.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Failed to share", {
          description: "There was an error sharing the responses.",
        });
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard();
    }
  };

  return (
    <Card className="border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-pink-600">
          Responses Saved!
        </CardTitle>
        <CardDescription className="text-lg">
          Here's what she said yes to
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="flex justify-center">
          <Heart className="w-16 h-16 text-pink-500" />
        </div>

        <div className="space-y-4 bg-pink-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-center text-pink-700 mb-4">
            Date Details
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
                {getDateTypeLabel(formData.dateType)} with{" "}
                {formData.foodPreference} food
              </p>
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
                <p className="font-medium">Her suggestions:</p>
                <p className="italic">"{formData.suggestions}"</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center pt-2 border-2 border-pink-200 rounded-lg p-4 bg-pink-50/50">
          <p className="text-base font-medium text-pink-700 mb-1">
            Your Invitation ID:
          </p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <code className="font-mono text-lg bg-white px-3 py-1 rounded border border-pink-200 text-pink-600">
              {invitationId}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={copyIdToClipboard}
            >
              <Copy className="h-4 w-4 text-pink-600" />
              <span className="sr-only">Copy ID</span>
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            <strong>IMPORTANT:</strong> Save this ID to access these responses
            later
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pb-8">
        <div className="flex gap-3 w-full justify-center">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy All"}
          </Button>
          <Button
            onClick={downloadResponses}
            variant="outline"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            onClick={shareResponses}
            variant="outline"
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        <a href="#/responses" className="mt-4 flex justify-center">
          <Button variant="link" className="text-pink-600">
            <ExternalLink className="mr-2 h-4 w-4" />
            View All Saved Invitations
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
