import { dWidth } from '@/constants';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform, PermissionsAndroid, ScrollView, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker';


interface Project {
    id: string;
    title: string;
    description: string;
}

const CVAndProjects = () => {

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
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Kullanıcı picker'ı iptal etti
                console.log('Kullanıcı seçim işlemini iptal etti.');
            } else {
                throw err;
            }
        }
    };

    // Projelerin durumunu yönetmek için bir useState hook'u kullanıyoruz.
    // Her proje için bir id (veya benzersiz bir anahtar), başlık ve açıklama içeren bir nesne listesi tutuyoruz.
    const [projects, setProjects] = useState<Project[]>([]);

    const addProject = () => {
        // Yeni bir proje eklerken, mevcut projeler listesine yeni bir nesne ekliyoruz.
        setProjects([
            ...projects,
            { id: Math.random().toString(), title: '', description: '' },
        ]);
    };
    const deleteProject = (projectId: string) => {
        // Belirli bir projeyi sildiğimizde, o projenin id'sine sahip olmayan projeleri filtreliyoruz.
        setProjects(projects.filter(project => project.id !== projectId));
    };

    const updateProject = (projectId: string, field: keyof Project, value: string) => {
        // Projelerin başlık ve açıklamalarını güncellemek için
        setProjects(projects.map(project => {
            if (project.id === projectId) {
                return { ...project, [field]: value };
            }
            return project;
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>CV ve Projeler Alanı</Text>
            <Button title="CV Yükle" onPress={pickDocument} />
            <Button title="Proje Ekle" onPress={addProject} />
            {projects.map((project, index) => (
                <View key={project.id} style={styles.projectContainer}>
                    <TextInput
                        placeholder="Proje Başlığı"
                        value={project.title}
                        onChangeText={(text) => updateProject(project.id, 'title', text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Proje Açıklaması"
                        value={project.description}
                        onChangeText={(text) => updateProject(project.id, 'description', text)}
                        style={styles.input}
                    />
                    <Button title="Sil" onPress={() => deleteProject(project.id)} color="red" />
                </View>
            ))}
        </ScrollView>
    );
}

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
