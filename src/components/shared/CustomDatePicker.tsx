import React, { useState } from 'react';
import { Modal, View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CustomDatePickerProps {
    date: Date;
    onChange: () => void;
    handleConfirm?: () => void;
    handleCancel?: () => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ date, onChange, handleConfirm, handleCancel }) => {




    return (
        <Modal transparent={true} animationType="slide">
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                        maximumDate={new Date()}
                    />
                    <Button title="Tamam" onPress={handleConfirm} />
                    <Button title="İptal" onPress={handleCancel} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default CustomDatePicker;
