import { GenericText, GenericView } from '@/assets/css';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { colors, dWidth } from '@/constants';
interface CustomInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    iconSize?: number;
    right?: boolean;
    keyboardType?: any;
    name?: string;
    errors?: any;
    touched?: any;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    iconSize = 25,
    right,
    keyboardType = 'default',
    name,
    errors,
    touched,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <GenericView /* padding={dWidth * 0.025} */>
                <TextInput
                    mode='outlined'
                    label={label}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry && !showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType={keyboardType}
                    right={
                        right && (
                            <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} size={iconSize} onPress={togglePasswordVisibility} />
                        )
                    }
                />
                {touched && errors && <GenericText color={colors.error}>{errors[name!]}</GenericText>}
            </GenericView>
        </TouchableWithoutFeedback >
    );
};

export default CustomInput;