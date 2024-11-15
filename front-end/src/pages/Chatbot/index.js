import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TextInput, Button, Text, RefreshControl } from 'react-native';
import Markdown from 'react-native-markdown-display';
import lammakey from "../../../../env.json";

const LLAMA_KEY = lammakey.LLAMA_KEY;

export default function Chatbot({ navigation }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Olá! Eu sou Iara, a Inteligência Artificial da ESALQ, uma das maiores faculdades de agronomia do Brasil da Universidade de São Paulo. Estou aqui para te instruir sobre o funcionamento do aplicativo, tirar dúvidas e também te informar sobre as principais informações da área rural para ajudar sua propriedade. Antes de começarmos, certifique-se de que está conectado à Internet. Em que posso ajudar?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userQuestions, setUserQuestions] = useState([]); 
  const [botResponses, setBotResponses] = useState([]); 

  const sendMessage = async () => {
    if (!input) return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setUserQuestions([...userQuestions, input]); 
    setInput('');
    setLoading(true);

    const previousQuestions = userQuestions.join(" | ");
    const previousResponses = botResponses.join(" | ");

    const prompt = `Você é uma inteligência artificial brasileira de agronomia sustentável de nome Iara da ESALQ...`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${LLAMA_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 500,
          top_p: 1,
        })
      });

      if (!response.ok) {
        throw new Error(`Eita! Parece que houve um problema. Certifique-se de que você está conectado à internet! Aqui vai uma mensagem para os desenvolvedores: HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const botMessage = { role: 'assistant', content: data.choices[0].message.content };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setBotResponses([...botResponses, data.choices[0].message.content]); 
      } else {
        const botMessage = { role: 'assistant', content: "Desculpe, não consegui gerar uma resposta. Certifique-se que está contectado à internet. Reinicie o aplicativo se necessário" };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      const botMessage = { role: 'assistant', content: "Houve um erro ao enviar a mensagem. Certifique-se que está conectado à internet. Reinicie o aplicativo se necessário." };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
            {item.role === 'assistant' ? (
              <Markdown>{item.content}</Markdown>
            ) : (
              <Text>{item.content}</Text>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={loading} />}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Digite sua mensagem..."
      />
      <Button title="Enviar" onPress={sendMessage} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#c7d3ff',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
});
