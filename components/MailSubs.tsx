import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

export function MailSubs() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit email')
      }

      toast({
        variant: "success",
        title: "🔥 Nice!",
        description: "You have successfully subscribed.",
      })

      // Reset the form after successful submission
      form.reset()

    } catch (error) {
      toast({
        variant: "destructive",
        title: "💢 Uh oh! Something went wrong.",
        description: "There was a problem submitting your email.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-6 flex flex-col justify-center items-start text-left">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input className="max-w-xs text-left" type="email" placeholder="mail@provider.com" {...field} />
              </FormControl>
              <FormDescription>
                Join our mailing list!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full md:w-fit" type="submit">Join Now</Button>
      </form>
    </Form>
  )
}