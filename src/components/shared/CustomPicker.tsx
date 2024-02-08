import React from 'react';
import { GenericView } from '@/assets/css';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

interface PickerItem {
    label: string;
    value: string | number;
}

interface CustomPickerProps extends Omit<PickerSelectProps, 'items'> {
    items: PickerItem[];
}

const CustomPicker: React.FC<CustomPickerProps> = ({ items, ...props }) => {
    return (
        <GenericView borderWidth={1} borderRadius={5} padding={15}>
            <RNPickerSelect
                {...props}
                items={items.map(item => ({ label: item.label, value: item.value }))}
            />
        </GenericView>
    );
};

export default CustomPicker;
