import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import CustomPicker from '@/components/shared/CustomPicker';
import CustomInput from '@/components/shared/CustomInput';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import CustomDatePicker from '@/components/shared/CustomDatePicker';
import { colors, dWidth } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserGeneralInfo } from '@/store/reducers';
import { RootState } from "@/store"



const RegisterScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const userGeneralInfo = useSelector((state: RootState) => state.userInfoReducer.userGeneralInfo);

    const [modalVisible, setModalVisible] = useState(false);
    const [isPickerShow, setIsPickerShow] = useState(false);

    const handleConfirm = () => {
        setIsPickerShow(false);
    }
    const handleCancel = () => {
        setIsPickerShow(false);
    }


    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const source = response.assets[0].uri;
                dispatch(setUserGeneralInfo({ ...userGeneralInfo, selectedImage: source }));
            }
        });
    };

    const genderOptions = [
        { label: 'Erkek', value: 'Erkek' },
        { label: 'Kadın', value: 'Kadın' },
        { label: 'Belirtmek İstemiyorum', value: 'Belirtmek İstemiyorum' }
    ];

    const countryOptions = [
        { label: 'Türkiye', value: 'Türkiye' },
        { label: 'Amerika Birleşik Devletleri', value: 'Amerika Birleşik Devletleri' }
    ];
    const cityOptions = [
        { label: 'İstanbul', value: 'Istanbul' },
        { label: 'Ankara', value: 'Ankara' }
    ];

    const initialValues = {
        fullName: '',
        country: '',
        city: '',
        identityNumber: '',
        phoneNumber: '',
        birthDate: new Date(),
        gender: '',
        kvkkApproval: false,
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Ad Soyad zorunludur'),
        country: Yup.string().required('Ülke seçimi zorunludur'),
        city: Yup.string().required('Şehir seçimi zorunludur'),
        identityNumber: Yup.string().required('Kimlik numarası zorunludur').length(11, 'Kimlik numarası 11 haneli olmalıdır'),
        phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz').required('Telefon numarası zorunludur'),
        birthDate: Yup.date().required('Doğum tarihi zorunludur'),
        gender: Yup.string().required('Cinsiyet seçimi zorunludur'),
        kvkkApproval: Yup.boolean().oneOf([true], 'KVKK metnini onaylamanız gerekmektedir'),
    });

    return (
        <SafeAreaWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // userGeneralInfo Redux state'inden selectedImage değerini al
                    const selectedImage = userGeneralInfo.selectedImage;

                    const payload = {
                        ...values,
                        birthDate: values.birthDate.toISOString(), // Tarihi string'e dönüştür
                        selectedImage, // selectedImage değerini payload'a ekle
                    };

                    dispatch(setUserGeneralInfo(payload)); // Düzeltilmiş payload ile dispatch

                    navigation.navigate('UserProfileInformationScreen')  // Navigate to next screen
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView>
                        <GenericView flex={1} padding={dWidth * .025}>
                            <GenericView center>
                                <GenericTouchableOpacity onPress={pickImage}>
                                    <GenericView>
                                        {userGeneralInfo.selectedImage ? (
                                            <GenericImage source={{ uri: userGeneralInfo.selectedImage }} width={100} height={100} borderRadius={50} resizeMode="cover" />
                                        ) : (
                                            <GenericView borderWidth={1} borderRadius={50} width={100} height={100} justifyContent='center' alignItems='center'>
                                                <GenericText>Resim Seç</GenericText>
                                            </GenericView>
                                        )}
                                    </GenericView>
                                </GenericTouchableOpacity>
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <CustomInput
                                    label="Ad Soyad"
                                    value={values.fullName}
                                    onChangeText={handleChange('fullName')}
                                    name='fullName'
                                    errors={errors}
                                    touched={touched} />
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <CustomPicker
                                    items={countryOptions}
                                    onValueChange={(value) => handleChange('country')(value)}
                                    placeholder={{ label: 'Ülke seçin...', value: null }}
                                />
                                {touched.country && errors.country && <GenericText color={colors.error}>{errors.country}</GenericText>}
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <CustomPicker
                                    items={cityOptions}
                                    onValueChange={(value) => handleChange('city')(value)}
                                    placeholder={{ label: 'Şehir seçin...', value: null }}
                                />
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <CustomInput
                                    label="Kimlik Numarası"
                                    value={values.identityNumber}
                                    onChangeText={handleChange('identityNumber')}
                                    keyboardType="numeric"
                                    name='identityNumber'
                                    errors={errors}
                                    touched={touched}
                                />
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <CustomInput
                                    label="Telefon Numarası"
                                    value={values.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
                                    keyboardType="numeric"
                                    name='phoneNumber'
                                    errors={errors}
                                    touched={touched}
                                />
                            </GenericView>
                            <GenericView borderWidth={1} borderRadius={5} padding={15} marginTop={dWidth * .025}>
                                <GenericText onPress={() => setIsPickerShow(true)}>Doğum Tarihi: {values.birthDate.toDateString()}</GenericText>
                                {isPickerShow && (
                                    <CustomDatePicker
                                        date={values.birthDate}
                                        onChange={() => {
                                            const currentDate = values.birthDate || new Date();
                                            setFieldValue('birthDate', currentDate);
                                        }}
                                        handleConfirm={handleConfirm}
                                        handleCancel={handleCancel}
                                    />
                                )}
                            </GenericView>
                            <GenericView marginTop={dWidth * .025}>
                                <CustomPicker
                                    items={genderOptions}
                                    onValueChange={(value) => handleChange('gender')
                                        (value)}
                                    placeholder={{ label: 'Cinsiyet seçin...', value: null }}
                                />
                            </GenericView>
                            <GenericView marginTop={dWidth * .025} flexDirection='row' alignItems='center'>
                                <TouchableOpacity
                                    style={styles.checkbox}
                                    onPress={() => setFieldValue('kvkkApproval', !values.kvkkApproval)}
                                >
                                    <View style={{ ...styles.checkbox, backgroundColor: values.kvkkApproval ? 'blue' : 'transparent' }} />
                                </TouchableOpacity>
                                <Text style={styles.label} onPress={() => setModalVisible(true)}>KVKK metnini kabul ediyorum</Text>
                            </GenericView>
                            <GenericView marginTop={dWidth * .025} center>
                                <GenericTouchableOpacity
                                    onPress={() => handleSubmit()}
                                >
                                    <GenericView backgroundColor={colors.primary} padding={15} borderRadius={5} >
                                        <GenericText color={colors.white} bold>Devam</GenericText>
                                    </GenericView>
                                </GenericTouchableOpacity>
                            </GenericView>
                        </GenericView>
                    </ScrollView>
                )}
            </Formik>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <Text style={styles.modalText}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
                        </ScrollView>
                        <Button
                            title="Kapat"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>

        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        /* ß */
        /* alignItems: 'center',
        justifyContent: 'center', */
        padding: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 10,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default RegisterScreen;
