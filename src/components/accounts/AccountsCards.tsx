import { PlusCircleSolid } from "iconoir-react-native";
import { Pressable, View, Text } from "react-native";

import AccountCard from "./AccountCard";
import CreateAccount from "./CreateAccount";

import useModal from "@/hooks/useModal";
import useDatabase from "@/hooks/useDatabase";

const AccountsCards = () => {
  const { useAll } = useDatabase();
  const { visible, openModal, closeModal } = useModal();

  return (
    <>
      <View className="flex-row flex-wrap gap-3 justify-center">
        {useAll("accounts").map((id) => (
          <AccountCard key={id} id={id} />
        ))}
        <Pressable
          className="h-28 w-48 bg-zinc-100 dark:bg-zinc-950 rounded-md p-3 items-center justify-center"
          onPress={openModal}
        >
          <PlusCircleSolid width={40} height={40} color="#2563eb" />
          <Text className="font-medium text-lg dark:text-white mt-1">
            Añadir cuenta
          </Text>
        </Pressable>
      </View>

      <CreateAccount visible={visible} closeModal={closeModal} />
    </>
  );
};

export default AccountsCards;
