import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { AuthFormSchema } from "@/lib/schema/auth.schema";

const formSchema = AuthFormSchema("REGISTER");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  type: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomInput = ({
  control,
  name,
  type,
  label,
  placeholder = "",
  disabled = false,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col mt-2">
            <FormItem>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={type}
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-2 font-normal text-sm" />
            </FormItem>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
