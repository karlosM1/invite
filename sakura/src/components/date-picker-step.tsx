"use client";

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
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";
import happycat from "@/assets/gif/happycat.gif";

interface DatePickerStepProps {
  onNext: (date: Date) => void;
}

export default function DatePickerStep({ onNext }: DatePickerStepProps) {
  const [date, setDate] = useState<Date | null>(null);

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
      <CardContent className="text-center space-y-6">
        <div className="flex justify-center items-center">
          <img src={happycat} alt="Happy Cat" className="w-64 h-64" />
        </div>
        <div className="flex justify-center">
          <div className="relative w-full max-w-[280px]">
            <DatePicker
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              minDate={tomorrow}
              maxDate={threeMonthsFromNow}
              placeholderText="Select a date"
              dateFormat="MMMM d, yyyy"
              className="w-full p-2 pl-10 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              wrapperClassName="w-full"
              calendarClassName="bg-white border border-pink-200 rounded-lg shadow-lg"
              popperClassName="react-datepicker-right"
              popperPlacement="bottom-start"
              showPopperArrow={false}
              customInput={
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Select a date"
                    className="w-full p-2 pl-10 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={date ? format(date, "MMMM d, yyyy") : ""}
                    readOnly
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
                </div>
              }
            />
          </div>
        </div>
        {date && (
          <p className="text-pink-600 font-medium">
            You selected: {format(date, "EEEE, MMMM do, yyyy")}
          </p>
        )}
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
