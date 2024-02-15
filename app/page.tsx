"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { getMailDomain } from "@/lib/getMailDomain"
import Link from "next/link"
import { useState } from "react"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2)
})

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('email', data.email);
  
    try {
      const response = await fetch('/api/nodemailer', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json(); // Parse the JSON response
      if (response.ok) {
        // Handle success
        toast({
          title: "You submitted the following values:",
          description: (
            <>
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{
                  JSON.stringify({ email: data.email}, null, 1)
                }
                </code>
              </pre>
              
              <Button variant="link" asChild className="flex justify-end">
                <Link 
                  href={getMailDomain(JSON.stringify(data.email, null, 1))}
                  rel="noopener noreferrer"
                  target="_blank"
                >Open Your Email</Link>
              </Button>
            </>
          ),
        })
      } else {
        // Handle errors
        toast({
          title: "Error",
          description: result.error || "An error occurred while sending the email.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
      });
    }

    
    

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-t-6">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>You will receive a message to your email after login.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="yeee@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Valid Email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="****" type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button disabled={isSubmitting}>
                {
                  isSubmitting
                  &&
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                }
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>

  )
}
