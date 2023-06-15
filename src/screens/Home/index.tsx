import React, { useState } from "react"
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import { styles } from "./styles"
import { Participant } from "../../components/Participant"

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState("")
    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.")
        }
        setParticipants(prevState => [...prevState, participantName])
        setParticipantName("")
    }
    function handleParticipantRemove(name: string) {
        Alert.alert("Remover Participante", `Você deseja remover o participante ${name}?`, [{ text: "Não", style: "cancel" }, { text: "Sim", onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)) }])
    }
    return (
        <View style={styles.container}>
            <Text style={styles.eventName} key="1">Nome do Evento</Text>
            <Text style={styles.eventDate} key="2">Quinta, 15 de Junho de 2023.</Text>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="Nome do Participante" placeholderTextColor="#6B6B6B" onChangeText={setParticipantName} value={participantName} />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={participants} keyExtractor={item => item} renderItem={({ item }) => (<Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />)} showsVerticalScrollIndicator={false} ListEmptyComponent={() => <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença</Text>} />
        </View>
    )
}