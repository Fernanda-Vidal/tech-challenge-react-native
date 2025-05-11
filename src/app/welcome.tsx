import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function WelcomePage() {
  const handleUserTypeSelection = (userType: string) => {
    switch (userType) {
      case 'aluno':
        router.replace('/home?role=aluno');
        break;
      case 'professor':
        router.push('/login?type=professor');
        break;
      case 'administrativo':
        router.push('/login?type=admin');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao APP da Escola do Futuro</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleUserTypeSelection('aluno')}
        >
          <Text style={styles.buttonText}>Sou aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleUserTypeSelection('professor')}
        >
          <Text style={styles.buttonText}>Sou professor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => handleUserTypeSelection('administrativo')}
        >
          <Text style={styles.buttonText}>Administrativo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 