import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { memo } from "react";

interface FormField {
    id: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormPopoverProps {
    title: string;
    fields: FormField[];
    onSubmit: () => void;
}

export const FormPopover = memo(({ title, fields, onSubmit }: FormPopoverProps) => {
    return (
        <div className="flex flex-col gap-4">
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                        id={field.id}
                        type="text"
                        placeholder={field.placeholder}
                        className="bg-white"
                        value={field.value}
                        onChange={field.onChange}
                    />
                </div>
            ))}
            <Button
                onClick={onSubmit}
                className="bg-blue-500 text-white rounded-md py-1 px-2 hover:bg-blue-600 transition cursor-pointer"
            >
                Apply {title}
            </Button>
        </div>
    );
});