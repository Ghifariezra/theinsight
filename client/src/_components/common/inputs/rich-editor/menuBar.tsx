import { memo } from 'react';
import { Editor } from '@tiptap/react';
import { TooltipComponent } from '@/_components/common/tooltip/tooltip';
import { DropDownComponent } from '@/_components/common/dropdown/dropdown';
import { PopoverComponent } from '@/_components/common/popover/popover';
import { Toggle } from '@/_components/ui/toggle';
import { Option } from '@/_components/common/inputs/rich-editor/options';

export const MenuBar = memo(({ editor, canUndo, canRedo }: { editor: Editor; canUndo: boolean; canRedo: boolean }) => {

    const Options = Option({
        editor,
        canUndo,
        canRedo
    });

    return (
        <div className="flex flex-wrap gap-2 bg-slate-50 p-1 border rounded-md">
            {
                Options.map((option, index) => {
                    return (
                        <TooltipComponent
                            key={index}
                            info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                        >
                            {
                                option.name === 'formula' ? (
                                    <PopoverComponent
                                        trigger={
                                            option.icon && (
                                                <TooltipComponent
                                                    key={index}
                                                    info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                                >
                                                    <Toggle
                                                        key={index}
                                                        value={option.name}

                                                        className="cursor-pointer"
                                                    >
                                                        {option.icon}
                                                    </Toggle>
                                                </TooltipComponent>
                                            )
                                        }
                                    >
                                        {option.renderPopover?.()}
                                    </PopoverComponent>
                                ) : option.name === 'youtube' ? (
                                    <PopoverComponent
                                        trigger={
                                            option.icon && (
                                                <TooltipComponent
                                                    key={index}
                                                    info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                                >
                                                    <Toggle
                                                        key={index}
                                                        value={option.name}

                                                        className="cursor-pointer"
                                                    >
                                                        {option.icon}
                                                    </Toggle>
                                                </TooltipComponent>
                                            )
                                        }
                                    >
                                        {option.renderPopover?.()}
                                    </PopoverComponent>
                                ) : option.name === 'table' ? (
                                    <PopoverComponent
                                        trigger={
                                            option.icon && (
                                                <TooltipComponent
                                                    key={index}
                                                    info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                                >
                                                    <Toggle
                                                        key={index}
                                                        value={option.name}

                                                        className="cursor-pointer"
                                                    >
                                                        {option.icon}
                                                    </Toggle>
                                                </TooltipComponent>
                                            )
                                        }
                                    >
                                        {
                                            option.childComponent?.map((option, index) => {
                                                return (
                                                    <TooltipComponent
                                                        key={index}
                                                        info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                                    >
                                                        <Toggle
                                                            key={index}
                                                            value={option.name}
                                                            pressed={option.pressed}
                                                            onPressedChange={option.onClick}
                                                            className="cursor-pointer"
                                                        >
                                                            {option.icon}
                                                        </Toggle>
                                                    </TooltipComponent>
                                                )
                                            })
                                        }
                                    </PopoverComponent>
                                ) : option.name === 'link' ? (
                                    <PopoverComponent
                                        trigger={
                                            option.icon && (
                                                <TooltipComponent
                                                    key={index}
                                                    info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                                >
                                                    <Toggle
                                                        key={index}
                                                        value={option.name}

                                                        className="cursor-pointer"
                                                    >
                                                        {option.icon}
                                                    </Toggle>
                                                </TooltipComponent>
                                            )
                                        }
                                    >
                                        {option.renderPopover?.()}
                                    </PopoverComponent>
                                ) : option.name === 'font Size' ? (
                                    <DropDownComponent
                                        trigger={
                                            option.icon && (
                                                <TooltipComponent
                                                    key={index}
                                                    info={option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                                >
                                                    <Toggle
                                                        key={index}
                                                        value={option.name}

                                                        className="cursor-pointer"
                                                    >
                                                        {option.icon}
                                                    </Toggle>
                                                </TooltipComponent>
                                            )
                                        }
                                    >
                                        {option.renderPopover?.()}
                                    </DropDownComponent>
                                ) : option.name === 'undo' || option.name === 'redo' ? (
                                    <Toggle
                                        key={index}
                                        value={option.name}
                                        pressed={option.pressed}
                                        onPressedChange={option.onClick}
                                        disabled={option.disabled}
                                        className="cursor-pointer"
                                    >
                                        {option.icon}
                                    </Toggle>
                                ) : (
                                    <Toggle
                                        key={index}
                                        value={option.name}
                                        pressed={option.pressed}
                                        onPressedChange={option.onClick}
                                        className="cursor-pointer"
                                    >
                                        {option.icon}
                                    </Toggle>
                                )
                            }
                        </TooltipComponent>
                    )
                })
            }
        </div>
    )
});