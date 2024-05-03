import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TextInput, Button, TouchableOpacity} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native';


const Tab = createBottomTabNavigator();



function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Eventos" component={EventosScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Histórico" component={HinstoricoScreen} />
    </Tab.Navigator>
  );
}

const events = [
  {
    id: 1,
    name: "Oktoberfest (Munique, Alemanha)",
    description: "Um dos maiores festivais de cerveja do mundo, a Oktoberfest atrai milhões de visitantes para Munique a cada ano, com cerveja, comida tradicional bávara, música e diversão.",
    second_description: "Descubra o coração da cultura bávara na Oktoberfest, onde a tradição da cerveja se une à hospitalidade alemã para criar uma experiência inesquecível de celebração e camaradagem.",
    url: 'https://img.freepik.com/vetores-gratis/mao-desenhada-conceito-de-oktoberfest_52683-42392.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1714608000&semt=sph',
    stalls: [
      { name: "Barraca de Pretzels", description: "Deliciosos pretzels bávaros cozidos frescos diariamente.", url: "https://www.example.com/pretzels" },
      { name: "Barraca de Salsichas", description: "Autênticas salsichas alemãs grelhadas com temperos tradicionais.", url: "https://www.example.com/salsichas" },
      { name: "Barraca de Cerveja", description: "Variedade de cervejas artesanais e tradicionais da Baviera.", url: "https://www.example.com/cerveja" }
    ]
  },
  {
    id: 2,
    name: "Carnaval do Rio de Janeiro (Rio de Janeiro, Brasil)",
    description: "Um dos carnavais mais famosos do mundo, o Carnaval do Rio de Janeiro é uma festa extravagante com desfiles de escolas de samba, música, dança, fantasias coloridas e festividades que duram vários dias.",
    second_description: "Entre na magia e na energia contagiante do Carnaval do Rio de Janeiro, onde a paixão pela música, dança e cultura brasileira se funde em um espetáculo vibrante e inesquecível.",
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEja_2x2GEdmsV32po_4CDex5b68CdtKsi9niC8wslGLxI2QQjlX59oFlb9Z0mliWwLvV_GeR-63iZZ3LLhh0CBORRK_hPDNPtULSf9PNUxHaLa4ipKywjAFLIgH6xf4W4MT9iF65wsSFCg/s1600/FotorCreated.png',
    stalls: [
      { name: "Barraca de Fantasias", description: "Fantasias coloridas e autênticas para todos os gostos e idades.", url: "https://www.example.com/fantasias" },
      { name: "Barraca de Bebidas Tropicais", description: "Coquetéis tropicais refrescantes para acompanhar o calor do Carnaval.", url: "https://www.example.com/coqueteis" },
      { name: "Barraca de Comida de Rua", description: "Delícias da culinária brasileira para saborear durante o Carnaval.", url: "https://www.example.com/comida-brasileira" }
    ]
  },
  {
    id: 3,
    name: "Festival das Lanternas de Pingxi (Taiwan)",
    description: "Uma tradição antiga em Taiwan, o Festival das Lanternas de Pingxi é celebrado com o lançamento de milhares de lanternas de papel iluminadas, criando um espetáculo de luzes fascinante que ilumina o céu noturno.",
    second_description: "Testemunhe a magia e a beleza das lanternas iluminadas que dançam no céu de Taiwan durante o Festival das Lanternas de Pingxi, uma celebração milenar que une comunidades em uma atmosfera de paz e serenidade.",
    url: 'https://static.vecteezy.com/ti/vetor-gratis/p1/273574-festival-das-lanternas-do-ceu-de-taiwan-gratis-vetor.jpg',
    stalls: [
      { name: "Barraca de Lanternas de Papel", description: "Lanternas de papel artesanais em uma variedade de cores e designs.", url: "https://www.example.com/lanternas" },
      { name: "Barraca de Comida Tradicional", description: "Comidas e petiscos taiwaneses autênticos para saborear durante o festival.", url: "https://www.example.com/comida-taiwanesa" },
      { name: "Barraca de Artesanato", description: "Artesanato local e souvenirs para lembrar o festival.", url: "https://www.example.com/artesanato-taiwanes" }
    ]
  },
  {
    id: 4,
    name: "Festival das Luzes de Diwali (Índia)",
    description: "O Diwali, também conhecido como Festival das Luzes, é uma celebração hindu que marca a vitória do bem sobre o mal. É comemorado com lanternas, velas, fogos de artifício, doces e festividades em todo o país.",
    second_description: "Experimente a magia e a espiritualidade do Diwali, quando as luzes brilhantes e os sons de fogos de artifício enchem o ar, simbolizando a vitória da luz sobre as trevas e a renovação espiritual.",
    url: 'https://static.vecteezy.com/ti/vetor-gratis/p1/7108822-cartaz-do-festival-de-luzes-de-diwali-feliz-gratis-vetor.jpg',
    stalls: [
      { name: "Barraca de Velas e Lanternas", description: "Lindas velas e lanternas artesanais para decorar e iluminar sua casa durante o Diwali.", url: "https://www.example.com/velas-lanternas" },
      { name: "Barraca de Doces Indianos", description: "Delícias doces indianas tradicionais para saborear durante o festival.", url: "https://www.example.com/doces-indianos" },
      { name: "Barraca de Fogos de Artifício", description: "Fogos de artifício coloridos e espetaculares para celebrar o Diwali com estilo.", url: "https://www.example.com/fogos-artificio" }
    ]
  },
  {
    id: 5,
    name: "Carnaval de Veneza (Veneza, Itália)",
    description: "O Carnaval de Veneza é famoso por suas máscaras elaboradas e trajes de época. Durante o festival, a cidade é transformada em um cenário de conto de fadas, com desfiles, bailes, música e eventos culturais.",
    second_description: "Deixe-se envolver pela atmosfera mágica do Carnaval de Veneza, onde o passado e o presente se fundem em um deslumbrante espetáculo de máscaras, música e mistério, criando memórias para toda a vida.",
    url: 'https://www.queroviajarmais.com/wp-content/uploads/2019/05/carnaval-em-veneza.jpg',
    stalls: [
      { name: "Barraca de Máscaras", description: "Máscaras artesanais elegantes e elaboradas para completar o seu visual de carnaval.", url: "https://www.example.com/mascaras" },
      { name: "Barraca de Trajes de Época", description: "Trajes históricos e elegantes para alugar ou comprar durante o Carnaval.", url: "https://www.example.com/trajes-epoca" },
      { name: "Barraca de Souvenirs", description: "Lembranças exclusivas do Carnaval de Veneza para levar para casa.", url: "https://www.example.com/souvenirs-veneza" }
    ]
  },
  {
    id: 6,
    name: "Mardi Gras (Nova Orleans, EUA)",
    description: "O Mardi Gras, também conhecido como Carnaval de Nova Orleans, é uma festa colorida e animada que inclui desfiles de carros alegóricos, máscaras, colares de contas, música ao vivo, comida crioula e muita diversão.",
    second_description: "Descubra a energia e a diversão do Mardi Gras, uma festa que encapsula a alma de Nova Orleans, com música vibrante, tradições únicas e uma atmosfera de celebração que dura dias a fio.",
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpAkvtgVs2X9OHONe1j7i50MBEvQFaUuBHg&s',
    stalls: [
      { name: "Barraca de Beads e Colares", description: "Colares de contas coloridas e brilhantes para usar durante os desfiles e festas do Mardi Gras.", url: "https://www.example.com/beads-colares" },
      { name: "Barraca de Comida Crioula", description: "Delícias da culinária crioula de Nova Orleans para saborear durante o Mardi Gras.", url: "https://www.example.com/comida-crioula" },
      { name: "Barraca de Música Ao Vivo", description: "Bandas ao vivo e artistas de rua para entreter os foliões durante o Mardi Gras.", url: "https://www.example.com/musica-ao-vivo" }
    ]
  },
  {
    id: 7,
    name: "Festival das Cerejeiras em Flor (Japão)",
    description: "Um dos eventos mais bonitos do Japão, o Festival das Cerejeiras em Flor celebra a chegada da primavera com a floração das cerejeiras. As pessoas se reúnem para fazer piqueniques sob as árvores em flor, conhecido como hanami.",
    second_description: "Maravilhe-se com a beleza efêmera do Festival das Cerejeiras em Flor, onde a delicadeza das flores de cerejeira em plena floração cria um cenário mágico de contemplação e alegria, conectando pessoas com a natureza.",
    url: 'https://www.bunkyo.org.br/wp-content/uploads/2022/06/25-Sakura-Matsuri-1024x1024.jpg',
    stalls: [
      { name: "Barraca de Comida de Hanami", description: "Petiscos e comidas típicas para desfrutar durante os piqueniques sob as cerejeiras.", url: "https://www.example.com/comida-hanami" },
      { name: "Barraca de Artesanato Tradicional", description: "Artesanato japonês autêntico e souvenirs do festival para levar para casa.", url: "https://www.example.com/artesanato-japones" },
      { name: "Barraca de Chá de Cerejeira", description: "Chás especiais de cerejeira para saborear e apreciar durante o hanami.", url: "https://www.example.com/cha-cerejeira" }
    ]
  },
  {
    id: 8,
    name: "Carnaval de Nice (Nice, França)",
    description: "O Carnaval de Nice é um dos maiores e mais antigos carnavais da França, conhecido por seus desfiles extravagantes, carros alegóricos decorados, batalhas de flores, shows de música e eventos culturais.",
    second_description: "Explore a sofisticação e o charme do Carnaval de Nice, onde a elegância francesa se mistura com a alegria e a exuberância do carnaval, criando uma atmosfera única de celebração e diversão para todas as idades.",
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4USjLawLOMXlS6Q44ZumzMpptiQacSdYtYCXGm3c8XQ&s',
    stalls: [
      { name: "Barraca de Flores e Corsages", description: "Flores frescas e corsages elegantes para adornar durante os desfiles e eventos do Carnaval.", url: "https://www.example.com/flores-corsages" },
      { name: "Barraca de Comida Francesa", description: "Delícias da culinária francesa clássica para saborear durante o Carnaval de Nice.", url: "https://www.example.com/comida-francesa" },
      { name: "Barraca de Música e Dança", description: "Apresentações musicais e de dança ao vivo para animar os visitantes do Carnaval.", url: "https://www.example.com/musica-danca" }
    ]
  },
  {
    id: 9,
    name: "Festival de Glastonbury (Glastonbury, Reino Unido)",
    description: "Um dos maiores festivais de música do mundo, o Festival de Glastonbury atrai milhares de pessoas para uma experiência única de música ao vivo, arte, teatro, circo, comida e acampamento em uma fazenda no sudoeste da Inglaterra.",
    second_description: "Entre na vibração única do Festival de Glastonbury, onde a música ecoa pelos campos ingleses e a criatividade floresce, criando uma comunidade efervescente de amantes da música e da arte de todo o mundo.",
    url: 'https://www.tenhomaisdiscosqueamigos.com/wp-content/uploads/2021/03/glastonbury-festival-video.jpg',
    stalls: [
      { name: "Barraca de CDs e Vinis", description: "CDs e vinis de artistas do festival e outros favoritos da música.", url: "https://www.example.com/cds-vinis" },
      { name: "Barraca de Comida de Festival", description: "Opções gastronômicas diversas para todos os gostos e dietas no festival.", url: "https://www.example.com/comida-festival" },
      { name: "Barraca de Arte e Artesanato", description: "Obras de arte originais e artesanato único de artistas locais e do festival.", url: "https://www.example.com/arte-artesanato" }
    ]
  },
  {
    id: 10,
    name: "Festival das Lanternas Flutuantes de Loy Krathong",
    description: "Um dos festivais mais pitorescos da Tailândia, Loy Krathong é celebrado com a liberação de lanternas flutuantes nos rios e lagos, simbolizando a renovação e o descarte de má sorte. É acompanhado por danças, música e comida tailandesa.",
    second_description: "Embarque em uma jornada de espiritualidade e renovação no Festival das Lanternas Flutuantes de Loy Krathong, onde a beleza das lanternas flutuantes iluminando os cursos d'água da Tailândia simboliza a esperança, a gratidão e a renovação espiritual.",
    url: 'https://tailandiando.com/wp-content/uploads/2023/05/Pinterest-Festival-das-Lanternas.jpg',
    stalls: [
      { name: "Barraca de Lanternas Flutuantes", description: "Lindas lanternas flutuantes feitas à mão para lançar nos rios e lagos.", url: "https://www.example.com/lanternas-flutuantes" },
      { name: "Barraca de Comida Tailandesa", description: "Pratos autênticos da culinária tailandesa para saborear durante o festival.", url: "https://www.example.com/comida-tailandesa" },
      { name: "Barraca de Artesanato Local", description: "Artesanato tailandês tradicional e souvenirs do festival para levar para casa.", url: "https://www.example.com/artesanato-tailandes" }
    ]
  }
];




function EventosScreen() {
  const [selecao, setSelecao] = useState(null);
  const [selecaoEvent, setSelecaoEvent] = useState(null);

  const handleSearch = () => {
    console.log('Pesquisa realizada!');
    // Adicione a lógica de pesquisa aqui
  };

  const handleButtonPress = (item) => {
    if (selecao !== null) {
      setSelecao(null);
      setSelecaoEvent(null);
      return;
    }
    setSelecao(item.id);
    setSelecaoEvent(item);
    console.log('Evento selecionado:', item.id); 
  };

  if (selecao !== null) {
    return (
      
      <View style={{ flex: 1, justifyContent: 'top', alignItems: 'left', backgroundColor: 'lightgray' }}>
      <TouchableOpacity onPress={() => handleButtonPress(null)}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/256/93/93634.png' }} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

        <Image source={{ uri: selecaoEvent.url }} style={{ width: "100%", height: 300 }} />
        <Text style={{ fontWeight: 'bold', textAlign: 'left', paddingLeft: 10, fontSize: 20  }}>{selecaoEvent.name}</Text>
        <Text style={{ textAlign: 'left', fontSize: 20, paddingLeft: 10 }}>{selecaoEvent.description}</Text>

        
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10 }}
            placeholder="Pesquisar"
          />
          <Button title="Pesquisar" onPress={handleSearch} />
        </View>
        <FlatList
          data={events} // Certifique-se de que 'events' esteja definido
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => handleButtonPress(item)}>
                <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderWidth: 1, height: 102 }}>
                  <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'left', paddingLeft: 10, fontSize: 10, height: 20 }}>{item.name}</Text>
                    <Text style={{ textAlign: 'left', fontSize: 10, height: 80, paddingLeft: 10 }}>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
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
  const [selecao, setSelecao] = useState(null);
  const [selecaoEvent, setSelecaoEvent] = useState(null);

  const handleSearch = () => {
    console.log('Pesquisa realizada!');
    // Adicione a lógica de pesquisa aqui
  };

  const handleButtonPress = (item) => {
    if (selecao !== null) {
      setSelecao(null);
      setSelecaoEvent(null);
      return;
    }
    setSelecao(item.id);
    setSelecaoEvent(item);
    console.log('Evento selecionado:', item.id); 
  };

  if (selecao !== null) {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'lightgray', padding: 10 }}>
        <TouchableOpacity onPress={() => handleButtonPress(null)}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/256/93/93634.png' }} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
    
        <Image source={{ uri: selecaoEvent.url }} style={{ width: "100%", height: 300, marginBottom: 10 }} />
        <Text style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>{selecaoEvent.name}</Text>
    
        <FlatList
          data={selecaoEvent.stalls}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderWidth: 1, height: 102 }}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/256/6899/6899938.png' }} style={{ width: 30, height: 30 }} />
            <View style={{ marginBottom: 5 ,width: '70%'}}>
              <Text style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 16 }}>{item.name}</Text>
              <Text style={{ textAlign: 'left', fontSize: 10  }}>{item.description}</Text>
              <TouchableOpacity onPress={() => handleStallPress(item.url)}>
                <Text style={{ color: 'blue', textAlign: 'left', textDecorationLine: 'underline', fontSize: 10  }}>Mais informações</Text>
              </TouchableOpacity>
            </View>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/256/109/109746.png' }} style={{ width: 30, height: 30 ,right: 10}} />
            </View>
            
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
        <FlatList
          data={events} // Certifique-se de que 'events' esteja definido
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => handleButtonPress(item)}>
                <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'space-between', width: '90%', borderWidth: 1, height: 102 }}>
                  <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'left', paddingLeft: 10, fontSize: 10, height: 20 }}>{item.name}</Text>
                    <Text style={{ textAlign: 'left', fontSize: 10, height: 80, paddingLeft: 10 }}>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
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
