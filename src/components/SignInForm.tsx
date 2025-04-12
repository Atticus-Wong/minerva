'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Button } from './ui/button'; 
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Checkbox } from './ui/checkbox';
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const [showPassword, setshowPassword] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Formed submitted", data)
  };
  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='mb-5'>
              <Label htmlFor='email'>Email</Label>
              <FormControl>
                <Input 
                  id='email' 
                  type='email' 
                  placeholder='abc@example.com' {...field} />
              </FormControl>
              <FormMessage className="text-[hsl(var(--form-error))]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Password</Label>
              <FormControl>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...field}
                />

              </FormControl>
              <FormMessage className="text-[hsl(var(--form-error))]" />
            </FormItem>
          )}
        />
        <div className='mt-5 flex items-center space-x-2'>
          <Checkbox 
            id='showPassword'
            checked={showPassword}
            onCheckedChange={(checked) => setshowPassword(checked == true)}
            className={`text-foreground ${showPassword ? "opacity-100" : "opacity-40"}`}
          />
          <Label htmlFor='showPassword' className='text-foreground opacity-50'>Show Password</Label>
        </div>
        <Button type="submit" className='mt-5 w-full'>Sign In</Button>
      </form>
    </Form>
  )
}