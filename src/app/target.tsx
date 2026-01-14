// import { router } from "expo-router";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Alert, StatusBar, Text, View } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha o nome da meta e o valor precisa ser maior que zero."
      );
    }

    setIsProcessing(true);

    // estamos criando ou queremos atualizar uma transação existente?
    if (params.id) {
      // atualizar transação existente
    } else {
      // criar nova transação
      create();
    }
  }

  async function create() {
    try {
      Alert.alert("Nova Meta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta.");
      console.log(error);
      setIsProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta funanceira."
      />
      <Text>Target</Text>

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia"
          value={name}
          onChangeText={setName}
        />

        <CurrencyInput
          label="Valor alvo (R$)"
          prefix="R$ "
          value={amount}
          onChangeValue={setAmount}
        />

        <Button
          title="Salvar"
          isProcessing={isProcessing}
          onPress={handleSave}
        />
      </View>
    </View>
  );
}
