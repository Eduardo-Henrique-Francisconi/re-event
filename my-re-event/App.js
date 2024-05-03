import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TextInput, div} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Eventos" component={EventosScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Hinstorico" component={HinstoricoScreen} />
    </Tab.Navigator>
  );
}

const events = [
  {
    name: "Oktoberfest (Munique, Alemanha)",
    description: "Um dos maiores festivais de cerveja do mundo, a Oktoberfest atrai milhões de visitantes para Munique a cada ano, com cerveja, comida tradicional bávara, música e diversão.",
    url: 'https://img.freepik.com/vetores-gratis/mao-desenhada-conceito-de-oktoberfest_52683-42392.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1714608000&semt=sph'
  },
  {
    name: "Carnaval do Rio de Janeiro (Rio de Janeiro, Brasil)",
    description: "Um dos carnavais mais famosos do mundo, o Carnaval do Rio de Janeiro é uma festa extravagante com desfiles de escolas de samba, música, dança, fantasias coloridas e festividades que duram vários dias.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Festival das Lanternas de Pingxi (Taiwan)",
    description: "Uma tradição antiga em Taiwan, o Festival das Lanternas de Pingxi é celebrado com o lançamento de milhares de lanternas de papel iluminadas, criando um espetáculo de luzes fascinante que ilumina o céu noturno.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Festival das Luzes de Diwali (Índia)",
    description: "O Diwali, também conhecido como Festival das Luzes, é uma celebração hindu que marca a vitória do bem sobre o mal. É comemorado com lanternas, velas, fogos de artifício, doces e festividades em todo o país.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Carnaval de Veneza (Veneza, Itália)",
    description: "O Carnaval de Veneza é famoso por suas máscaras elaboradas e trajes de época. Durante o festival, a cidade é transformada em um cenário de conto de fadas, com desfiles, bailes, música e eventos culturais.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Mardi Gras (Nova Orleans, EUA)",
    description: "O Mardi Gras, também conhecido como Carnaval de Nova Orleans, é uma festa colorida e animada que inclui desfiles de carros alegóricos, máscaras, colares de contas, música ao vivo, comida crioula e muita diversão.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Festival das Cerejeiras em Flor (Japão)",
    description: "Um dos eventos mais bonitos do Japão, o Festival das Cerejeiras em Flor celebra a chegada da primavera com a floração das cerejeiras. As pessoas se reúnem para fazer piqueniques sob as árvores em flor, conhecido como hanami.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Carnaval de Nice (Nice, França)",
    description: "O Carnaval de Nice é um dos maiores e mais antigos carnavais da França, conhecido por seus desfiles extravagantes, carros alegóricos decorados, batalhas de flores, shows de música e eventos culturais.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Festival de Glastonbury (Glastonbury, Reino Unido)",
    description: "Um dos maiores festivais de música do mundo, o Festival de Glastonbury atrai milhares de pessoas para uma experiência única de música ao vivo, arte, teatro, circo, comida e acampamento em uma fazenda no sudoeste da Inglaterra.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  },
  {
    name: "Festival das Lanternas Flutuantes de Loy Krathong (Tailândia)",
    description: "Um dos festivais mais pitorescos da Tailândia, Loy Krathong é celebrado com a liberação de lanternas flutuantes nos rios e lagos, simbolizando a renovação e o descarte de má sorte. É acompanhado por danças, música e comida tailandesa.",
    url: 'https://www.revistaevidencia.com/wp-content/uploads/2023/03/FotoBNT2022159-e1678378049662.jpg'
  }
];



function EventosScreen() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
  <View style={{ }}> 
    <FlatList
      data={events}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderWidth: 1, height: 102  }}>
          <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'left', paddingLeft: 10, borderWidth: 1, fontSize: 10, height: 20 }}>{item.name}</Text>
            <Text style={{ textAlign: 'left', fontSize: 10, height: 80 , borderWidth: 1, paddingLeft: 10 }}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  </View>
</View>

  );
}

function CameraScreen() {
  
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }
  , []);

  if (hasPermission === null) {

    return <View />;

  }

  if (hasPermission === false) {

    return <Text>No access to camera</Text>;

  }

  return (

    <View style={styles.container}>

      <Camera

      style={{flex: 1, width: '100%'}}
      type={Camera.Constants.Type.back} />

      <StatusBar style="auto" />

    </View>

  );

}

function HinstoricoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
