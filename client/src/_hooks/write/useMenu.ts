import { useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { compressImage } from '@/_lib/browserIC';

export function useMenu() {
    const [FONT_SIZES] = useState([12, 14, 16, 18, 20, 24, 28, 32, 36, 48]);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [linkYoutube, setLinkYoutube] = useState('');
    const [formula, setformula] = useState('');

    const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), [])
    const handleLink = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value), [])
    const handleLinkYoutube = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLinkYoutube(e.target.value), [])
    const handleFormulaValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setformula(e.target.value), [])

    const handleApplyLink = useCallback((editor: Editor) => {
        if (!link) return;

        const { state } = editor;
        const { empty, from } = state.selection;

        if (empty && name) {
            editor
                .chain()
                .focus()
                .insertContent(name)
                .setTextSelection({
                    from: from,
                    to: from + name.length,
                })
                .setLink({ href: link, target: '_blank' })
                .run();
        } else {
            editor.chain().focus().setLink({
                href: link,
                target: '_blank'
            }).run();
        }

        setName('');
        setLink('');
    }, [link, name]);

    const handleVideo = useCallback((editor: Editor) => {
        if (!linkYoutube) return;

        if (linkYoutube) {
            const width = 640
            const height = 480

            editor.commands.setYoutubeVideo({
                src: linkYoutube,
                width: Math.max(320, width),
                height: Math.max(180, height),
            })
        }

        setLinkYoutube('')
    }, [linkYoutube])

    const handleUploadImage = useCallback((editor: Editor) => {
        // buat input file secara dinamis
        const input = document.createElement('input');

        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        // ketika file dipilih
        input.onchange = async () => {
            // console.log(input.files);
            const file = input.files?.[0];
            if (!file) return;

            // compress image
            const compressedBase64 = await compressImage(file);

            if (compressedBase64 === '') return;

            editor
                .chain()
                .focus()
                .insertContentAt(editor.state.selection.anchor, {
                    type: 'image',
                    attrs: {
                        src: compressedBase64,
                        alt: file.name,
                    },
                })
                .focus()
                .run();
        };
    }, [])

    const handleFormula = useCallback((editor: Editor) => {
        if (!formula) return;
        
        if (formula) {
            editor
                .chain()
                .focus()
                .insertInlineMath({ 
                    latex: formula
                 })
                .run();
        }

        setformula('')
    }, [formula])

    return {
        name,
        setName,
        handleName,
        link,
        setLink,
        handleLink,
        handleApplyLink,
        handleUploadImage,
        handleFormula,
        linkYoutube,
        setLinkYoutube,
        handleLinkYoutube,
        handleVideo,
        formula,
        handleFormulaValue,
        FONT_SIZES
    };
}