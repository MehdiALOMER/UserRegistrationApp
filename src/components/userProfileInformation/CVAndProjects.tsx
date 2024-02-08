import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../shared/CustomInput';
import { RootState } from "@/store"
import { setUserCVAndProjects, addProject, removeProject } from '@/store/reducers';
import { dWidth } from '@/constants';
import { Project } from '@/types/userTypes';

const CVAndProjects: React.FC = () => {
    const dispatch = useDispatch();
    const userCVAndProjects = useSelector((state: RootState) => state.userInfoReducer.userCVAndProjects);

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            console.log(
                res[0].uri,
                res[0].type, // mime type
                res[0].name,
                res[0].size
            );

            // CV'nin URI'sini Redux store'a kaydet
            handleChange('cv', res[0].uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Kullanıcı seçim işlemini iptal etti.');
            } else {
                throw err;
            }
        }
    };



    const handleChange = <T extends keyof typeof userCVAndProjects>(key: T, value: typeof userCVAndProjects[T]) => {
        dispatch(setUserCVAndProjects({ ...userCVAndProjects, [key]: value }));
    };

    const handleProjectChange = (index: number, key: keyof Project, value: string) => {
        const updatedProjects = [...userCVAndProjects.projects];
        updatedProjects[index] = { ...updatedProjects[index], [key]: value };
        handleChange('projects', updatedProjects);
    };

    const handleAddProject = () => {
        dispatch(addProject({ id: Date.now(), title: "", description: "" })); // `id` için `Date.now()` kullanarak basit bir benzersiz değer ürettik
    };

    const handleRemoveProject = (index: number) => {
        dispatch(removeProject(userCVAndProjects.projects[index].id));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>CV and Projects</Text>
            <Button title="Upload CV" onPress={pickDocument} />
            <Button title="Add Project" onPress={handleAddProject} />
            {userCVAndProjects.projects.map((project, index) => (
                <View key={project.id} style={styles.projectContainer}>
                    <CustomInput
                        label="Proje Başlığı"
                        value={project.title}
                        onChangeText={(text) => handleProjectChange(index, 'title', text)}
                    />
                    <CustomInput
                        label="Porje Açıklaması"
                        value={project.description}
                        onChangeText={(text) => handleProjectChange(index, 'description', text)}
                    />
                    <Button title="Delete" onPress={() => handleRemoveProject(index)} color="red" />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        width: dWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        width: dWidth,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    projectContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        paddingLeft: 10,
    },
});

export default CVAndProjects;
