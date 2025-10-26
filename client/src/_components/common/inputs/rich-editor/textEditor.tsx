import { memo } from 'react'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import { MenuBar } from '@/_components/common/inputs/rich-editor/menuBar'

// Extensions
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import {
    all,
    createLowlight
} from 'lowlight'
import Image from '@tiptap/extension-image'
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Math, { migrateMathStrings } from '@tiptap/extension-mathematics'
import Youtube from '@tiptap/extension-youtube'
import 'katex/dist/katex.min.css'
import { TableKit } from '@tiptap/extension-table'
import Link from '@tiptap/extension-link'
import FileHandler from '@tiptap/extension-file-handler'
import {
    FontSize,
    TextStyle
} from '@tiptap/extension-text-style'
import {
    Placeholder,
    UndoRedo
} from '@tiptap/extensions'

// Style languages
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

// Helpers
import { compressImage } from '@/_lib/browserIC'

type TiptapEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string
}
type Node = {
    attrs: {
        textAlign: 'left' | 'center' | 'right'
        level: 1 | 2 | 3
    }
}
type Level = Node['attrs']['level']

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)

// register the loaded languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const TiptapEditor = memo(({
    value,
    onChange,
    placeholder
}: TiptapEditorProps) => {
    const editor = useEditor({
        shouldRerenderOnTransaction: true,
        extensions: [
            StarterKit.configure({
                heading: false,
                codeBlock: false,
                blockquote: false,
                horizontalRule: false,
                link: false,
                undoRedo: false,
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-3',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-3',
                    },
                },
            }),

            FontSize.configure({ types: ['textStyle'] }),

            TextStyle,

            UndoRedo.configure({
                depth: 10,
                newGroupDelay: 300,
            }),

            Heading.configure({
                levels: [1, 2, 3],
                HTMLAttributes: {
                    class: 'font-bold tracking-tight',
                },
            }).extend({
                renderHTML({
                    node,
                    HTMLAttributes,
                }: {
                    node: Node
                    HTMLAttributes: Record<string, string>
                }) {
                    // console.log("node", node);
                    // console.log("HTMLAttributes", HTMLAttributes);

                    const level: Level = node.attrs.level
                    const classes: Record<Level, string> = {
                        1: 'text-3xl font-bold',
                        2: 'text-2xl font-bold',
                        3: 'text-xl font-bold',
                    }

                    return [
                        `h${level}`,
                        { ...HTMLAttributes, class: classes[level] || 'text-lg' },
                        0,
                    ]
                },
            }),

            Highlight.configure({
                HTMLAttributes: {
                    class: 'bg-yellow-200 px-2 rounded',
                },
            }),

            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),

            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'rounded-lg bg-[#2d2d2d] text-slate-300 p-5 leading-relaxed overflow-x-auto my-4 max-w-full',
                }
            }),

            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'rounded-md mx-auto my-4 block',
                },
            }),

            Emoji.configure({
                emojis: gitHubEmojis,
                enableEmoticons: true,
                // suggestion: false,
                // forceFallback: true,
            }),

            Blockquote.configure({
                HTMLAttributes: {
                    class: 'border-l-4 border-gray-300 pl-4',
                },
            }),

            HorizontalRule.configure({
                HTMLAttributes: {
                    class: 'border-gray-300',
                },
            }),

            Math.configure({
                inlineOptions: {
                    onClick: (node, pos) => {
                        const newCalc = prompt('Enter new inline math:', node.attrs.latex)
                        if (newCalc) {
                            editor?.chain().setNodeSelection(pos).updateInlineMath({ latex: newCalc }).focus().run()
                        }
                    },
                },
                blockOptions: {
                    onClick: (node, pos) => {
                        const newCalc = prompt('Enter new block math:', node.attrs.latex)
                        if (newCalc) {
                            editor?.chain().setNodeSelection(pos).updateBlockMath({ latex: newCalc }).focus().run()
                        }
                    },
                },
            }),

            Youtube.configure({
                controls: false,
                nocookie: true,
                HTMLAttributes: {
                    class: 'rounded-md mx-auto my-4 block w-full max-w-4xl',
                }
            }),

            TableKit.configure({
                table: {
                    resizable: true,
                    HTMLAttributes: {
                        class:
                            'border-collapse border border-gray-300 w-full my-4 rounded-md overflow-hidden text-sm',
                    },
                },

                tableHeader: {
                    HTMLAttributes: {
                        class:
                            'bg-gray-100 text-gray-900 font-semibold border border-gray-300 px-3 py-2 text-left',
                    },
                },
                tableRow: {
                    HTMLAttributes: {
                        class: 'border-b border-gray-200',
                    },
                },
                tableCell: {
                    HTMLAttributes: {
                        class: 'border border-gray-300 px-3 py-2 align-top',
                    },
                },
            }),

            Link.configure({
                protocols: ['http', 'https', 'mailto', 'tel'],
                defaultProtocol: 'https',
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                }
            }),

            FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: async (currentEditor, files, pos) => {
                    for (const file of files) {
                        try {
                            const compressedBase64 = await compressImage(file);

                            if (compressedBase64 === '') return;

                            currentEditor
                                .chain()
                                .insertContentAt(pos, {
                                    type: 'image',
                                    attrs: {
                                        src: compressedBase64,
                                        alt: file.name,
                                    },
                                })
                                .focus()
                                .run();
                        } catch (error) {
                            console.error('Failed to process image:', error);
                        }
                    }
                },

                onPaste: async (currentEditor, files, htmlContent) => {
                    if (htmlContent) {
                        console.log(htmlContent);
                        return false;
                    }

                    // ✅ Process pasted images with compression
                    for (const file of files) {
                        try {
                            const compressedBase64 = await compressImage(file);
                            
                            if (compressedBase64 === '') return;

                            currentEditor
                                .chain()
                                .insertContentAt(currentEditor.state.selection.anchor, {
                                    type: 'image',
                                    attrs: {
                                        src: compressedBase64,
                                        alt: file.name,
                                    },
                                })
                                .focus()
                                .run();
                        } catch (error) {
                            console.error('Failed to process image:', error);
                        }
                    }
                },
            }),

            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'What’s on your mind today?'
                    }

                    return placeholder!
                },
            })
        ],

        onCreate: ({ editor: currentEditor }) => {
            migrateMathStrings(currentEditor)
        },

        onUpdate: ({ editor: currentEditor }) => {
            migrateMathStrings(currentEditor);

            const html = currentEditor.getHTML().trim();
            const text = currentEditor.getText().trim();

            const isEmpty =
                !text ||
                html === '<p></p>' ||
                html === '<p><br></p>';

            onChange(isEmpty ? '' : html);
        },

        content: value,

        editorProps: {
            attributes: {
                class: 'min-h-[200px] border rounded-md py-2 px-3',
            },
        },
    })

    const state = useEditorState({
        editor,
        selector: ctx => {
            if (!ctx.editor) return;

            return {
                canUndo: ctx.editor.can().chain().focus().undo().run(),
                canRedo: ctx.editor.can().chain().focus().redo().run(),
            }
        },
    }) ?? { canUndo: false, canRedo: false };

    const { canUndo, canRedo } = state

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col gap-2">
            <MenuBar
                editor={editor}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <EditorContent editor={editor} />
        </div>
    )
});