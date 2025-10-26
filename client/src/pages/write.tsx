import { useHomeContext } from "@/_hooks/blog/useHomeContext";
import { Form } from "@/_components/ui/form";
import { FieldFormInput } from "@/_components/common/inputs/formInput";
import { Button } from "@/_components/ui/button";

export default function Write() {
    const {
        formWrite,
        onSubmit
    } = useHomeContext();

    return (
        <section className="flex flex-col gap-6 p-6">
            <h1 className="text-2xl font-semibold">Share Your Thoughts</h1>
            <Form {...formWrite}>
                <form onSubmit={formWrite.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <FieldFormInput
                        form={formWrite}
                        name="title"
                        label="Title"
                        placeholder="Enter your title"
                        type="text"
                    />
                    <FieldFormInput
                        form={formWrite}
                        name="description"
                        label="Description"
                        placeholder="Enter your description"
                        type="text"
                    />
                    <FieldFormInput
                        form={formWrite}
                        name="content"
                        label="Content"
                        placeholder="Start writing something awesome..."
                        type="content"
                    />

                    <FieldFormInput
                        form={formWrite}
                        name="tags"
                        label="Tags"
                        placeholder="Enter your tags"
                        type="textarea"
                    />

                    <FieldFormInput
                        form={formWrite}
                        name="published"
                        label="Published"
                        placeholder="Published"
                        type="switch"
                    />

                    <Button
                        type="submit"
                        disabled={!formWrite.formState.isValid}
                        className="cursor-pointer self-end"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </section>
    );
}