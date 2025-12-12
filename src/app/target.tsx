// import { router } from "expo-router";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { StatusBar, Text, View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta funanceira."
      />
      <Text>Target</Text>

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" placeholder="Ex: Viagem para praia" />

        <CurrencyInput label="Valor alvo" value={2400.22} />

        <Button title="Salvar" isProcessing={false} />
      </View>
    </View>
  );
}
