import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import type { DateInvitationData } from "@/lib/types";
import {
  Calendar,
  Utensils,
  MapPin,
  MessageSquare,
  Search,
  Home,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getDateTypeLabel, getDateTypeSpecificLabel } from "@/lib/date-options";

export default function ResponsesPage() {
  const [invitationId, setInvitationId] = useState("");
  const [formData, setFormData] = useState<DateInvitationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all saved invitation IDs
    loadSavedIds();
  }, []);

  const loadSavedIds = () => {
    const ids = JSON.parse(localStorage.getItem("date-invitation-ids") || "[]");
    setSavedIds(ids);
  };

  const fetchInvitation = () => {
    if (!invitationId.trim()) {
      setError("Please enter an invitation ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const storedData = localStorage.getItem(
        `date-invitation-${invitationId}`
      );

      if (!storedData) {
        setError("No invitation found with this ID");
        setFormData(null);
        setLoading(false);
        return;
      }

      const parsedData = JSON.parse(storedData);

      // Convert date string back to Date object if it exists
      if (parsedData.date) {
        parsedData.date = new Date(parsedData.date);
      }

      setFormData(parsedData);
      toast.success("Invitation found", {
        description: "Successfully retrieved the invitation details.",
      });
    } catch (err) {
      console.error("Error fetching invitation:", err);
      setError("Error retrieving invitation data");
      setFormData(null);
      toast.error("Error", {
        description: "There was a problem retrieving the invitation data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectId = (id: string) => {
    setInvitationId(id);
    // Automatically fetch when an ID is selected
    setTimeout(() => {
      fetchInvitation();
    }, 100);
  };

  const goToHome = () => {
    navigate("/");
  };

  const clearAllResponses = () => {
    try {
      // First, get all the invitation IDs
      const ids = JSON.parse(
        localStorage.getItem("date-invitation-ids") || "[]"
      );

      // Delete each invitation data
      ids.forEach((id: string) => {
        localStorage.removeItem(`date-invitation-${id}`);
      });

      // Delete the list of IDs
      localStorage.removeItem("date-invitation-ids");

      // Update state
      setSavedIds([]);
      setFormData(null);
      setInvitationId("");

      toast.success("All responses cleared", {
        description: "All invitation responses have been deleted.",
      });
    } catch (err) {
      console.error("Error clearing responses:", err);
      toast.error("Error", {
        description: "There was a problem clearing the responses.",
      });
    }

    setShowClearDialog(false);
  };

  const deleteCurrentInvitation = () => {
    if (!invitationId) return;

    try {
      // Remove the invitation data
      localStorage.removeItem(`date-invitation-${invitationId}`);

      // Update the list of IDs
      const ids = savedIds.filter((id) => id !== invitationId);
      localStorage.setItem("date-invitation-ids", JSON.stringify(ids));

      // Update state
      setSavedIds(ids);
      setFormData(null);
      setInvitationId("");

      toast.success("Invitation deleted", {
        description: "The invitation has been deleted successfully.",
      });
    } catch (err) {
      console.error("Error deleting invitation:", err);
      toast.error("Error", {
        description: "There was a problem deleting the invitation.",
      });
    }
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-white rounded-xl shadow-xl overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-pink-600">
              Find Responses
            </CardTitle>
            <CardDescription className="text-lg">
              Enter or select an invitation ID to view responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            {savedIds.length > 0 ? (
              <div className="space-y-2">
                <Label htmlFor="saved-ids">Your Saved Invitations</Label>
                <Select onValueChange={handleSelectId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a saved invitation" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedIds.map((id) => (
                      <SelectItem key={id} value={id}>
                        Invitation {id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {savedIds.length} invitation
                    {savedIds.length !== 1 ? "s" : ""} saved on this device
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setShowClearDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No saved invitations found</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="invitation-id">Invitation ID</Label>
              <div className="flex gap-2">
                <Input
                  id="invitation-id"
                  value={invitationId}
                  onChange={(e) => setInvitationId(e.target.value)}
                  placeholder="Enter invitation ID"
                  className="flex-1"
                />
                <Button
                  onClick={fetchInvitation}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? "Loading..." : "Find"}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {formData && (
              <div className="space-y-4 bg-pink-50 p-6 rounded-xl mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-pink-700">
                    Date Details
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={deleteCurrentInvitation}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>

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
                      <p className="font-medium">Her suggestions:</p>
                      <p className="italic">"{formData.suggestions}"</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <Button
              onClick={goToHome}
              variant="outline"
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Clear All Responses
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all saved invitation responses. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={clearAllResponses}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
