import { useMenu } from '@/_hooks/write/useMenu';
import { Editor } from '@tiptap/react';
import {
    Heading1,
    Heading2,
    Heading3,
    Bold,
    Italic,
    Strikethrough,
    AlignCenter,
    AlignLeft,
    AlignRight,
    List,
    ListOrdered,
    Highlighter,
    SquareCode,
    ImageDown,
    TextQuote,
    SeparatorHorizontal,
    Sigma,
    Youtube,
    Table,
    Grid2x2X,
    Grid2x2Plus,
    Link,
    Unlink,
    ALargeSmall,
    Undo,
    Redo
} from 'lucide-react';
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/_components/ui/dropdown-menu";
import { FormPopover } from '@/_components/common/inputs/rich-editor/formPopover';

export const Option = ({
    editor,
    canUndo,
    canRedo,
}: {
    editor: Editor;
    canUndo: boolean;
    canRedo: boolean;
}) => {
    const {
        name,
        handleName,
        link,
        handleLink,
        handleApplyLink,
        handleUploadImage,
        handleFormula,
        formula,
        handleFormulaValue,
        linkYoutube,
        handleLinkYoutube,
        handleVideo,
        FONT_SIZES
    } = useMenu();

    return [
        {
            icon: <Heading1 className='size-5' />,
            name: 'h1',
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 })
        },
        {
            icon: <Heading2 className='size-5' />,
            name: 'h2',
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 })
        },
        {
            icon: <Heading3 className='size-5' />,
            name: 'h3',
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 })
        },
        {
            icon: <Bold className='size-5' />,
            name: 'bold',
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold')
        },
        {
            icon: <Italic className='size-5' />,
            name: 'italic',
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic')
        },
        {
            icon: <Strikethrough className='size-5' />,
            name: 'strike',
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike')
        },
        {
            icon: <AlignLeft className='size-5' />,
            name: 'left',
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            pressed: editor.isActive({ textAlign: 'left' })
        },
        {
            icon: <AlignCenter className='size-5' />,
            name: 'center',
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            pressed: editor.isActive({ textAlign: 'center' })
        },
        {
            icon: <AlignRight className='size-5' />,
            name: 'right',
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            pressed: editor.isActive({ textAlign: 'right' })
        },
        {
            icon: <List className='size-5' />,
            name: 'bullet',
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive('bulletList')
        },
        {
            icon: <ListOrdered className='size-5' />,
            name: 'ordered',
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive('orderedList')
        },
        {
            icon: <Highlighter className='size-5' />,
            name: 'highlight',
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive('highlight')
        },
        {
            icon: <SquareCode className='size-5' />,
            name: 'code',
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            pressed: editor.isActive('codeBlock')
        },
        {
            icon: <ImageDown className='size-5' />,
            name: 'image',
            onClick: () => {
                if (!editor) return;
                handleUploadImage(editor);
            },
            pressed: false
        },
        {
            icon: <TextQuote className='size-5' />,
            name: 'quote',
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            pressed: editor.isActive('blockquote')
        },
        {
            icon: <SeparatorHorizontal className='size-5' />,
            name: 'separator',
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
            pressed: false
        },
        {
            icon: <Sigma className="size-5" />,
            name: "formula",
            renderPopover: () => (
                <FormPopover
                    title="Formula"
                    fields={[
                        {
                            id: "formula",
                            label: "LaTeX Formula:",
                            placeholder: "E = mc^2",
                            value: formula,
                            onChange: handleFormulaValue,
                        },
                    ]}
                    onSubmit={() => handleFormula(editor)}
                />
            ),
            pressed: editor.isActive("mathBlock") || editor.isActive("mathInline"),
        },
        {
            icon: <Youtube className='size-5' />,
            name: 'youtube',
            renderPopover: () => (
                <FormPopover
                    title="Video"
                    fields={[
                        {
                            id: "url",
                            label: "YouTube URL:",
                            placeholder: "https://www.youtube.com/watch?v=...",
                            value: linkYoutube,
                            onChange: handleLinkYoutube,
                        },
                    ]}
                    onSubmit={() => handleVideo(editor)}
                />
            ),
            pressed: false
        },
        {
            icon: <Table className='size-5' />,
            name: 'table',
            childComponent: [
                {
                    icon: <Grid2x2Plus className='size-5' />,
                    name: 'add Table',
                    onClick: () => editor.chain().focus().insertTable({
                        rows: 3,
                        cols: 3,
                        withHeaderRow: true,
                    }).run(),
                    pressed: false
                },
                {
                    icon: <Grid2x2X className='size-5' />,
                    name: 'delete Row',
                    onClick: () => editor.commands.deleteRow(),
                    pressed: false
                },
            ],
            pressed: false
        },
        {
            icon: <Link className='size-5' />,
            name: 'link',
            renderPopover: () => (
                <FormPopover
                    title="Link"
                    fields={[
                        {
                            id: "name",
                            label: "Name:",
                            placeholder: "Example",
                            value: name,
                            onChange: handleName,
                        },
                        {
                            id: "url",
                            label: "URL:",
                            placeholder: "https://www.example.com",
                            value: link,
                            onChange: handleLink,
                        },
                    ]}
                    onSubmit={() => handleApplyLink(editor)}
                />
            ),
        },
        {
            icon: <Unlink className='size-5' />,
            name: 'unlink',
            onClick: () => editor.chain().focus().unsetLink().run(),
            pressed: false
        },
        {
            icon: <ALargeSmall className='size-5' />,
            name: 'font Size',
            renderPopover: () => (
                <>
                    <DropdownMenuLabel>Font Size</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        FONT_SIZES.map((fontSize, index) => {
                            return (
                                <DropdownMenuItem
                                    key={index}
                                    onClick={
                                        () => editor.chain().focus().setFontSize(`${fontSize}px`).run()
                                    }
                                    className="cursor-pointer"
                                >
                                    {fontSize}px
                                </DropdownMenuItem>
                            )
                        })
                    }
                </>
            ),
            pressed: false
        },
        {
            icon: <Undo className='size-5' />,
            name: 'undo',
            onClick: () => editor.chain().focus().undo().run(),
            disabled: !canUndo,
            pressed: false
        },
        {
            icon: <Redo className='size-5' />,
            name: 'redo',
            onClick: () => editor.chain().focus().redo().run(),
            disabled: !canRedo,
            pressed: false
        },
    ]
};