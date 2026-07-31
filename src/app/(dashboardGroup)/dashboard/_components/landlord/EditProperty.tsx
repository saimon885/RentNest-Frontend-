"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Trash2,
  Building,
  ImagePlus,
  DollarSign,
  MapPin,
  Pencil,
  Loader2,
} from "lucide-react";
import { editProperty } from "../../_actions/Landlord/EditPropertyAction";
import { toast } from "sonner";

export interface PropertyCategory {
  id: string;
  name: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  images: string[];
  isAvailable?: boolean;
  categoryId?: string;
  category?: PropertyCategory;
}

interface EditPropertyProps {
  property: PropertyListing;
  categories?: PropertyCategory[];
  onUpdate?: (updatedData: Partial<PropertyListing>) => Promise<void> | void;
}

const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  pricePerMonth: z.coerce.number().min(1, "Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  amenities: z.array(z.object({ value: z.string() })),
  images: z.array(z.object({ value: z.string() })),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function EditProperty({
  property,
  categories = [],
  onUpdate,
}: EditPropertyProps) {
  const [open, setOpen] = useState(false);

  const defaultCategoryId =
    property.categoryId || property.category?.id || categories[0]?.id || "";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property.title || "",
      description: property.description || "",
      location: property.location || "",
      pricePerMonth: property.pricePerMonth || 0,
      categoryId: defaultCategoryId,
      amenities: property.amenities?.length
        ? property.amenities.map((val) => ({ value: val }))
        : [{ value: "" }],
      images: property.images?.length
        ? property.images.map((val) => ({ value: val }))
        : [{ value: "" }],
    },
  });

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
  } = useFieldArray({
    control,
    name: "amenities",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      reset({
        title: property.title || "",
        description: property.description || "",
        location: property.location || "",
        pricePerMonth: property.pricePerMonth || 0,
        categoryId: defaultCategoryId,
        amenities: property.amenities?.length
          ? property.amenities.map((val) => ({ value: val }))
          : [{ value: "" }],
        images: property.images?.length
          ? property.images.map((val) => ({ value: val }))
          : [{ value: "" }],
      });
    }
  };

  const onSubmit = async (data: PropertyFormValues) => {
    const payload = {
      ...data,
      amenities: data.amenities
        .map((item) => item.value.trim())
        .filter(Boolean),
      images: data.images.map((item) => item.value.trim()).filter(Boolean),
    };

    if (onUpdate) {
      await onUpdate(payload);
      setOpen(false);
    } else {
      const res = await editProperty({ id: property.id, payload });

      if (res?.success || res?.ok) {
        toast.success(res?.message || "Property updated successfully!");
        setOpen(false);
      } else {
        toast.error(res?.message || "Failed to update property.");
      }
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenChange(true)}
        className="flex-1 h-8 text-xs font-medium cursor-pointer"
      >
        <Pencil className="h-3.5 w-3.5 mr-1" />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl w-[92vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Edit Property
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                placeholder="enter the property title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select
                  value={watch("categoryId")}
                  onValueChange={(val) => setValue("categoryId", val!)}
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
                {errors.categoryId && (
                  <p className="text-xs text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerMonth">Price Per Month (BDT)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pricePerMonth"
                    type="number"
                    placeholder="e.g. 60000"
                    className="pl-9"
                    {...register("pricePerMonth")}
                  />
                </div>
                {errors.pricePerMonth && (
                  <p className="text-xs text-destructive">
                    {errors.pricePerMonth.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="enter the location"
                  className="pl-9"
                  {...register("location")}
                />
              </div>
              {errors.location && (
                <p className="text-xs text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the property..."
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Amenities</Label>
              {amenityFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Input
                    placeholder="e.g. WiFi, Lift, Refrigerator Filter"
                    {...register(`amenities.${index}.value`)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAmenity(index)}
                    disabled={amenityFields.length === 1}
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
                onClick={() => appendAmenity({ value: "" })}
                className="mt-1 gap-1 text-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Amenity
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Image URLs</Label>
              {imageFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <ImagePlus className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="https://res.cloudinary.com/..."
                      className="pl-9"
                      {...register(`images.${index}.value`)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeImage(index)}
                    disabled={imageFields.length === 1}
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
                onClick={() => appendImage({ value: "" })}
                className="mt-1 gap-1 text-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Image URL
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-semibold cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update Property"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
