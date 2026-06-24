import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

// rota transaction tem o parâmetro id
// /transaction/7

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>().id;
  const transactionsDatabase = useTransactionsDatabase();
  const [type, setType] = useState(TransactionTypes.Input);
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert(
          "Atenção",
          "Preencha o valor. A transação deve ser maior que zero.",
        );
      }

      setIsCreating(true);
      await transactionsDatabase.create({
        target_id: Number(params),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });

      Alert.alert("Sucesso", "Transação salva com sucesso!", [
        {
          text: "Ok",
          onPress: router.back,
          // onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evite retirar."
      />

      <View
        style={{
          marginTop: 32,
          gap: 24,
        }}
      >
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Valor (R$)"
          placeholder="Digite o valor"
          prefix="R$ "
          value={amount}
          onChangeValue={setAmount}
        />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          isProcessing={isCreating}
          onPress={handleCreate}
        />
      </View>
    </View>
  );
}
