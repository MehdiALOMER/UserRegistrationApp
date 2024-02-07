import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { dWidth } from '@/constants';
import { LineChart } from 'react-native-chart-kit';


const HomeScreen: React.FC = ({ navigation }: any) => {


  const goDashboard = () => {
    navigation.navigate('DashboardScreen');
  }
  const openDrawer = () => {
    navigation.openDrawer();
  }

  return (
    <SafeAreaWrapper>
      <AppHeader title="Chart" menu right="space-dashboard" onPressMenu={openDrawer} onRightPress={goDashboard} />
      <GenericView padding={dWidth * .0125} flex={1} marginBottom={dWidth * .15}>

        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={dWidth * .95}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </GenericView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen; 