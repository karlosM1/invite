import { Coffee, Utensils, Film, Music, Palmtree } from "lucide-react";
import type { DateTypeOption } from "./types";

export const dateTypeOptions: DateTypeOption[] = [
  {
    value: "coffee",
    label: "Coffee Date",
    icon: Coffee,
    specifics: {
      title: "Coffee Preference",
      options: [
        { value: "latte", label: "Latte" },
        { value: "cappuccino", label: "Cappuccino" },
        { value: "americano", label: "Americano" },
        { value: "espresso", label: "Espresso" },
        { value: "matcha", label: "Matcha" },
        { value: "mocha", label: "Mocha" },
        { value: "tea", label: "Tea" },
        { value: "hot-chocolate", label: "Hot Chocolate" },
      ],
    },
  },
  {
    value: "dinner",
    label: "Dinner Date",
    icon: Utensils,
    specifics: {
      title: "Dinner Atmosphere",
      options: [
        { value: "fancy", label: "Fancy Restaurant" },
        { value: "casual", label: "Casual Dining" },
        { value: "intimate", label: "Intimate Bistro" },
        { value: "outdoor", label: "Outdoor Dining" },
        { value: "rooftop", label: "Rooftop Restaurant" },
        { value: "home-cooked", label: "Home Cooked Meal" },
      ],
    },
  },
  {
    value: "movie",
    label: "Movie Date",
    icon: Film,
    specifics: {
      title: "Movie Genre",
      options: [
        { value: "action", label: "Action/Adventure" },
        { value: "comedy", label: "Comedy" },
        { value: "romance", label: "Romance" },
        { value: "horror", label: "Horror" },
        { value: "sci-fi", label: "Sci-Fi/Fantasy" },
        { value: "drama", label: "Drama" },
        { value: "documentary", label: "Documentary" },
        { value: "animated", label: "Animated" },
      ],
    },
  },
  {
    value: "concert",
    label: "Concert/Show",
    icon: Music,
    specifics: {
      title: "Music Preference",
      options: [
        { value: "rock", label: "Rock" },
        { value: "pop", label: "Pop" },
        { value: "jazz", label: "Jazz" },
        { value: "classical", label: "Classical" },
        { value: "electronic", label: "Electronic/DJ" },
        { value: "indie", label: "Indie" },
        { value: "hip-hop", label: "Hip-Hop/R&B" },
        { value: "country", label: "Country" },
      ],
    },
  },
  {
    value: "outdoor",
    label: "Outdoor Activity",
    icon: Palmtree,
    specifics: {
      title: "Activity Type",
      options: [
        { value: "picnic", label: "Picnic in the Park" },
        { value: "biking", label: "Biking" },
        { value: "garden", label: "Botanical Garden" },
        { value: "museum", label: "Museum Visit" },
        { value: "amusement", label: "Amusement Park" },
      ],
    },
  },
];

export const getDateTypeLabel = (value: string): string => {
  const dateType = dateTypeOptions.find((type) => type.value === value);
  return dateType?.label || value;
};

export const getDateTypeSpecificLabel = (
  dateType: string,
  specificValue: string
): string => {
  const type = dateTypeOptions.find((t) => t.value === dateType);
  if (!type) return specificValue;

  const specific = type.specifics.options.find(
    (o) => o.value === specificValue
  );
  return specific?.label || specificValue;
};
