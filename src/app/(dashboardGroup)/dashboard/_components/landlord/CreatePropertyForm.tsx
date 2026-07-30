"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Building,
  ImagePlus,
  DollarSign,
  MapPin,
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  createdAt?: string;
};

type CreatePropertyFormProps = {
  categories: Category[];
};

export default function CreatePropertyForm({
  categories,
}: CreatePropertyFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pricePerMonth: "",
    categoryId: "",
    amenities: [""],
    images: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "amenities" | "images",
  ) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayField = (field: "amenities" | "images") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (index: number, field: "amenities" | "images") => {
    if (formData[field].length === 1) return;
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      pricePerMonth: Number(formData.pricePerMonth),
      categoryId: formData.categoryId,
      amenities: formData.amenities.filter((item) => item.trim() !== ""),
      images: formData.images.filter((item) => item.trim() !== ""),
    };

    console.log("Property Payload:", payload);
  };

  return (
    <Card className="max-w-3xl mx-auto border-border/50 shadow-xs">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Add New Property
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="enter the property title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId"> Category</Label>
              <Select
                value={formData.categoryId}
                required
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="categoryId" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerMonth">Price Per Month (BDT)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pricePerMonth"
                  name="pricePerMonth"
                  type="number"
                  placeholder="e.g. 75000"
                  className="pl-9"
                  value={formData.pricePerMonth}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                name="location"
                placeholder="enter the location"
                className="pl-9"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of the property..."
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Amenities</Label>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. WiFi, Lift, Refrigerator Filter"
                  value={amenity}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, "amenities")
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeArrayField(index, "amenities")}
                  disabled={formData.amenities.length === 1}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("amenities")}
              className="mt-1 gap-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add Amenity
            </Button>
          </div>

          <div className="space-y-3">
            <Label>Image URLs</Label>
            {formData.images.map((imgUrl, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <ImagePlus className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://res.cloudinary.com/..."
                    className="pl-9"
                    value={imgUrl}
                    onChange={(e) =>
                      handleArrayChange(index, e.target.value, "images")
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeArrayField(index, "images")}
                  disabled={formData.images.length === 1}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayField("images")}
              className="mt-1 gap-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add Image URL
            </Button>
          </div>

          <Button type="submit" className="w-full font-semibold">
            Create Property
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
