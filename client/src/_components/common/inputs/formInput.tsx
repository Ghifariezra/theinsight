import { memo, type JSX } from "react";
import { TooltipComponent } from "@/_components/common/tooltip/tooltip";
import {
    type FieldValues,
    type UseFormReturn,
    type Path,
    Controller
} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/_components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/_components/ui/input-otp";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import { TiptapEditor } from "@/_components/common/inputs/rich-editor/textEditor";
import { Switch } from "@/_components/ui/switch";
import { Info } from "lucide-react";

type Types = "text" | "password" | "email" | "number" | "content" | "textarea" | "otp" | "switch";

type FieldFormInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: Types;
    required?: boolean;
}

export const FieldFormInput = memo(<T extends FieldValues>({
    form,
    name,
    label,
    placeholder,
    type = "text",
    required = false,
}: FieldFormInputProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold">
                        {label === "Tags" ? (
                            <div className="flex items-center justify-between w-full">
                                {label}
                                <TooltipComponent info={"Separate multiple tags using commas or spaces"}>
                                    <Info
                                        size={14}
                                        className="text-muted-foreground"
                                    />
                                </TooltipComponent>
                            </div>
                        ) : label}
                    </FormLabel>
                    <FormControl>
                        {type === "switch" ? (
                            <Switch
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="cursor-pointer"
                            />
                        ) : type === "content" ? (
                            <Controller
                                name={name}
                                control={form.control}
                                render={({ field }) => (
                                    <TiptapEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder={placeholder}
                                    />
                                )}
                            />
                        ) : type === "textarea" ? (
                            <Textarea
                                placeholder={placeholder}
                                {...field}
                                required={required}
                            />
                        ) : type === "otp" ? (
                            <InputOTP maxLength={8} {...field}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        ) : (
                            <Input
                                type={type}
                                placeholder={placeholder}
                                {...field}
                                required={required}
                                autoComplete="off"
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}) as <T extends FieldValues>(props: FieldFormInputProps<T>) => JSX.Element;