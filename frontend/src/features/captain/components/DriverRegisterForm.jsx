"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Define the validation schema using Zod
const formSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, { message: "First name is required." }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  
  // Vehicle Details
  vehicleType: z.enum(["bike", "car", "auto"], {
    required_error: "You need to select a vehicle type.",
  }),
  color: z.string().min(1, { message: "Vehicle color is required." }),
  plate: z.string().min(4, { message: "License plate is required." }),
  capacity: z.coerce.number().min(1, { message: "Capacity must be at least 1." }),
})

const DriverRegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      color: "",
      plate: "",
      capacity: 1,
    },
  })

  function onSubmit(values) {
    console.log("Driver registration submitted:", values)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Become a Captain</CardTitle>
        <CardDescription>Complete the form below to start driving.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField name="firstName" control={form.control} render={({ field }) => ( <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField name="lastName" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Last Name (Optional)</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </div>
              <FormField name="email" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="password" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>

            <Separator />

            {/* Vehicle Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vehicle Details</h3>
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a vehicle type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bike">Bike</SelectItem>
                        <SelectItem value="car">Car</SelectItem>
                        <SelectItem value="auto">Auto Rickshaw</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField name="color" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Color</FormLabel><FormControl><Input placeholder="Black" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField name="plate" control={form.control} render={({ field }) => ( <FormItem><FormLabel>License Plate</FormLabel><FormControl><Input placeholder="MH-12-AB-1234" {...field} /></FormControl><FormMessage /></FormItem> )} />
              </div>
              <FormField name="capacity" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Capacity (excluding driver)</FormLabel><FormControl><Input type="number" min="1" placeholder="4" {...field} /></FormControl><FormMessage /></FormItem> )} />
            </div>

            <Button type="submit" className="w-full">Create Account & Add Vehicle</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default DriverRegisterForm