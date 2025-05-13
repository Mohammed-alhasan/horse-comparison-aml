import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { HorseFormValues } from "@/schemas/horseSchema";

interface HorseFormProps {
  form: ReturnType<typeof useForm<HorseFormValues>>;
  onSubmit: (values: HorseFormValues) => void;
  onCancel: () => void;
  isCreating: boolean;
}

export function HorseForm({
  form,
  onSubmit,
  onCancel,
  isCreating,
}: HorseFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Basic information */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter horse name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Physical attributes section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Physical Attributes</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Height in cm" 
                      {...field} 
                      type="number" 
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Weight in kg" 
                      {...field} 
                      type="number"
                      min="0" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Preferences section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Preferences</h3>
          <FormField
            control={form.control}
            name="favoriteFood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favorite Food</FormLabel>
                <FormControl>
                  <Input placeholder="What does this horse like to eat?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button type="submit">
            {isCreating ? "Create Horse" : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
