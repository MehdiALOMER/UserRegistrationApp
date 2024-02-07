import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

interface Project {
    name: string;
    description: string;
}

interface State {
    tableHead: string[];
    widthArr: number[];
    projects: Project[];
}

export default class ProjectList extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tableHead: ['Proje Adı', 'Açıklama'],
            widthArr: [200, 400],
            projects: [
                { name: 'Proje 1', description: 'Bu birinci projenin açıklamasıdır.' },
                { name: 'Proje 2', description: 'Bu ikinci projenin açıklamasıdır.' },
                // Daha fazla proje ekleyebilirsiniz
            ],
        };
    }

    render(): JSX.Element {
        const { tableHead, widthArr, projects } = this.state;
        const tableData: string[][] = projects.map((project: Project) => [project.name, project.description]);

        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                        {
                            tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    widthArr={widthArr}
                                    style={[styles.row, index % 2 ? { backgroundColor: '#f7f7f7' } : {}]}
                                    textStyle={styles.text}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    row: { height: 40, backgroundColor: '#E7E6E1' }
});
