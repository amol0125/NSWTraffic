import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import { capitaliseWords } from "../utils/capitaliseWords";


export default function FilterBar({
  region,
  setRegion,
  type,
  setType,
  street,
  setStreet,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);


  return (
    <View style={{ gap: 10, marginBottom: 20 }}>
      {/* REGION */}
      <Picker selectedValue={region} onValueChange={setRegion}>
        <Picker.Item label="All Regions" value="" />
        <Picker.Item label="North" value="North" />
        <Picker.Item label="West" value="West" />
        <Picker.Item label="South" value="South" />
        <Picker.Item label="Western Sydney" value="Western Sydney" />
        <Picker.Item label="North Sydney" value="North Sydney" />
        <Picker.Item label="Metro Sydney" value="Metro Sydney" />
        <Picker.Item label="South Sydney" value="South Sydney" />
      </Picker>

      {/* TYPE */}
      <Picker selectedValue={type} onValueChange={setType}>
        <Picker.Item label="All Types" value="" />
        <Picker.Item label="Accident" value="Accident" />
        <Picker.Item label="Hazard" value="Hazard" />
        <Picker.Item label="Building Fire" value="Building Fire" />
        <Picker.Item label="Scheduled Roadwork" value="Scheduled Roadwork" />
      </Picker>

      {/* STREET */}
      <TextInput
        placeholder="Street name"
        value={street}
        onChangeText={(text) => {
          const formatted = capitaliseWords(text);
          setStreet(formatted);
        }}
        style={{
          padding: 10,
          borderWidth: 2,
          borderRadius: 50,
        }}
      />

      {/* START DATE */}
      <TouchableOpacity
        onPress={() => setShowStart(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5
        }}
      >
        <Text>
          {startDate ? startDate.toDateString() : "Select Start Date"}
        </Text>
      </TouchableOpacity>

      {showStart && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={(e, selected) => {
            setShowStart(false);
            if (selected) setStartDate(selected);
          }}
        />
      )}

      {/* END DATE */}
      <TouchableOpacity
        onPress={() => setShowEnd(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5
        }}
      >
        <Text>
          {endDate ? endDate.toDateString() : "Select End Date"}
        </Text>
      </TouchableOpacity>

      {showEnd && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={(e, selected) => {
            setShowEnd(false);
            if (selected) setEndDate(selected);
          }}
        />
      )}
    </View>
  );
}
