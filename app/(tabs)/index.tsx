import useModal from "@/hooks/useModal";
import CreateAccount from "@/modals/CreateAccount";
import { Button, ScrollView, Text } from "react-native";

const Home = () => {
  const { visible: modalVisible, openModal, closeModal } = useModal();

  return (
    <ScrollView>
      <Text>Home</Text>
      <Button onPress={openModal} title="Create Account" />
      <CreateAccount visible={modalVisible} closeModal={closeModal} />
    </ScrollView>
  );
};

export default Home;
