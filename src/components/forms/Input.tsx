import { useMemo } from "react";
import { View, TextInput, TextInputProps } from "react-native";

import Label from "./Label";

interface Props extends TextInputProps {
  label?: string;
  placeholder?: string;
  type: "password" | "text" | "email" | "number" | "tel";
  enterKeyHint?: "enter" | "done" | "next" | "search" | "send";
  className?: string;
}

const Input = ({
  label,
  placeholder = "Escriba aquí...",
  type,
  enterKeyHint,
  className,
  ...props
}: Props) => {
  const configProps: Record<string, string | boolean> = useMemo(() => {
    let props: Record<string, string | boolean> = {};

    switch (type) {
      case "email":
        props = {
          inputMode: "email",
          autoComplete: "email",
          keyboardType: "email-address",
          textContentType: "emailAddress",
        };
        break;

      case "password":
        props = {
          autoComplete: "current-password",
          textContentType: "password",
          secureTextEntry: true,
          autoCorrect: false,
          spellCheck: false,
        };
        break;

      case "tel":
        props = {
          inputMode: "tel",
          autoComplete: "tel",
          keyboardType: "phone-pad",
          textContentType: "telephoneNumber",
        };
        break;

      case "number":
        props = {
          inputMode: "decimal",
          keyboardType: "decimal-pad",
        };
        break;

      default:
        props = {
          inputMode: "text",
          autoCorrect: true,
          spellCheck: true,
          autoCapitalize: "words",
        };
        break;
    }

    if (enterKeyHint) {
      props.enterKeyHint = enterKeyHint;
      props.returnKeyType = enterKeyHint;
    }

    return props;
  }, [type]);

  return (
    <View className={className}>
      <Label label={label} />
      <TextInput
        className="h-12 px-2 border rounded-md dark:text-white placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
        {...configProps}
        {...props}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;
