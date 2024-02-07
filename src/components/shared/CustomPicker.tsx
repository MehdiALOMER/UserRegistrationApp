/* import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

interface CustomPickerProps {
    selectedValue: string;
    onValueChange: (itemValue: string, itemIndex: number) => void;
    items: { label: string; value: string }[];
}

const CustomPicker: React.FC<CustomPickerProps> = ({ selectedValue, onValueChange, items }) => {
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}>
            {items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
        </Picker>
    );
};

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        height: 50,
    },
});

export default CustomPicker; */
import { GenericView } from '@/assets/css';
import React from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

// Picker öğeleri için tür tanımı
interface PickerItem {
    label: string;
    value: string | number;
}

// CustomPicker'a özel prop'lar ve RNPickerSelect'ten gelen prop'lar
interface CustomPickerProps extends PickerSelectProps {
    items: PickerItem[]; // Genişletilmiş items prop'u
}

// CustomPicker bileşeni
const CustomPicker: React.FC<CustomPickerProps> = ({ items, ...props }) => {
    return (
        <GenericView borderWidth={1} borderRadius={5} padding={15}>
            <RNPickerSelect
                {...props}
                items={items}
            />
        </GenericView>
    );
};

export default CustomPicker;

