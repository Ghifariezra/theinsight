import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    WriteSchema,
    type WriteSchemaType
} from "@/_validations/blogValidation";

export const useBlogForm = () => {
    const formWrite = useForm<WriteSchemaType>({
        resolver: zodResolver(WriteSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            tags: '',
            content: "",
            published: false
        },
    });

    return { formWrite };
};