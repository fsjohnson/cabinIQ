import * as Haptics from "expo-haptics";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { CLASS_DESCRIPTIONS, CLASS_LABELS, SeatClass } from "@/data/aircraft";

interface Props {
  available: SeatClass[];
  selected: SeatClass;
  onSelect: (cls: SeatClass) => void;
}

export function ClassSelector({ available, selected, onSelect }: Props) {
  const colors = useColors();

  const classColorMap: Record<SeatClass, string> = {
    first: colors.first,
    business: colors.business,
    economy_plus: colors.economy_plus,
    economy: colors.economy,
  };

  const handlePress = (cls: SeatClass) => {
    if (cls === selected) return;
    Haptics.selectionAsync();
    onSelect(cls);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {available.map((cls) => {
        const isSelected = cls === selected;
        const accent = classColorMap[cls];
        return (
          <TouchableOpacity
            key={cls}
            style={[
              styles.tab,
              {
                backgroundColor: isSelected ? accent + "22" : colors.secondary,
                borderColor: isSelected ? accent : colors.border,
              },
            ]}
            onPress={() => handlePress(cls)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isSelected ? accent : colors.mutedForeground,
                  fontFamily: isSelected ? "Inter_700Bold" : "Inter_500Medium",
                },
              ]}
            >
              {CLASS_LABELS[cls]}
            </Text>
            <Text
              style={[
                styles.desc,
                {
                  color: isSelected ? accent + "CC" : colors.mutedForeground + "88",
                  fontFamily: "Inter_400Regular",
                },
              ]}
              numberOfLines={1}
            >
              {CLASS_DESCRIPTIONS[cls]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    minWidth: 120,
    maxWidth: 160,
    gap: 3,
  },
  label: {
    fontSize: 14,
  },
  desc: {
    fontSize: 11,
  },
});
