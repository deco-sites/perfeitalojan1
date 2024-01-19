import Text from "$store/components/ui/Text.tsx";
import AvatarFastBuy from "$store/components/ui/AvatarFastBuy.tsx";

export default function SelectorRow({name, values, selected, onSelect, isQuickView}: 
    {
        name: "Cor" | "Tamanho";
        selected: number;
        values: Array<{content: string;disabled?: boolean;value: string;url: string;}>;
        onSelect?: (index: number) => void;
        isQuickView?: boolean;
    }) {
    const maybeVal = values[selected]?.value;
    values.sort((a, b) => {
        const sizeOrder = ["PP", "P", "M", "G", "GG"];
        const indexA = sizeOrder.findIndex((size) => size.toUpperCase() === a.value.toUpperCase());
        const indexB = sizeOrder.findIndex((size) => size.toUpperCase() === b.value.toUpperCase());

        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
    });

    return (
        <li class="flex flex-col gap-2">
            <Text variant="caption" class="font-bold text-[16px] tracking-[0.8px]">
                {name}:{" "}
                <span class="font-normal capitalize text-[#7B7C80] text-[12px] lg:text-[14px]">
                    {maybeVal}
                </span>
            </Text>
            <ul class="flex flex-row flex-wrap gap-3">
                {values.map(({ content, url, disabled }, index) => {
                    return (
                        <li>
                            <a href={url}>
                                <AvatarFastBuy
                                    onClick={(e) => {
                                        if (name !== "Cor" || isQuickView) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onSelect?.(index);
                                        }
                                    }}
                                    content={content}
                                    selected={(name === "Tamanho" && maybeVal === content) ||
                                        (name !== "Tamanho" && selected === index)}
                                    disabled={disabled}
                                    variant={name}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
}
