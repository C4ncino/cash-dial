import { View, TextInput, TextInputProps, Text } from "react-native";

import Label from "./Label";

interface Props
  extends Omit<
    TextInputProps,
    | "multiline"
    | "inputMode"
    | "autoCorrect"
    | "autoCapitalize"
    | "spellCheck"
    | "secureTextEntry"
    | "autoComplete"
  > {
  label?: string;
  placeholder?: string;
  enterKeyHint?: "enter" | "done" | "next" | "search" | "send";
  className?: string;
}

const TextArea = ({
  label,
  placeholder = "Escriba aquí...",
  enterKeyHint,
  className,
  ...props
}: Props) => {
  return (
    <View className={`${props.maxLength && "relative"} ${className}`}>
      <Label label={label} />
      <TextInput
        multiline
        autoCorrect
        spellCheck
        scrollEnabled
        inputMode="text"
        autoCapitalize="sentences"
        className="h-full px-2 py-1 ios:py-2 border rounded-md dark:text-white placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
        style={{ textAlignVertical: "top" }}
        numberOfLines={props.numberOfLines || 4}
        {...props}
        placeholder={placeholder}
      />
      {props.maxLength && (
        <View className="absolute right-2 bottom-1">
          <Text className="text-zinc-600 dark:text-zinc-400 mb-[2px]">
            {props.value?.length}/{props.maxLength}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TextArea;
