import { View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";
import { Option } from "./option";
import { TransactionTypes } from "@/utils/TransactionTypes";

type Props = {
  selected: TransactionTypes;
  onChange: (type: TransactionTypes) => void;
};

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        isSelected={selected === TransactionTypes.Input}
        title="Guardar"
        icon="arrow-upward"
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        isSelected={selected === TransactionTypes.Output}
        title="Resgatar"
        icon="arrow-downward"
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  );
}
