import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCreatePost } from '../hooks/usePost';
import { useAuth } from '../contexts/AuthContext';

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();
  const createPostMutation = useCreatePost();

  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [idDisciplina, setIdDisciplina] = useState('1'); // Temporariamente fixo
  const [idSubdisciplina, setIdSubdisciplina] = useState('1'); // Temporariamente fixo

  const handleTituloChange = (text: string) => {
    setTitulo(text);
  };

  const handleSubtituloChange = (text: string) => {
    setSubtitulo(text);
  };

  const handleConteudoChange = (text: string) => {
    setConteudo(text);
  };

  const isTituloValid = titulo.length > 5;
  const isSubtituloValid = subtitulo.length > 5;
  const isConteudoValid = conteudo.length > 20;

  const handleCreatePost = async () => {
    if (!titulo || !subtitulo || !conteudo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (titulo.length <= 5) {
      Alert.alert('Erro', 'O título deve ter mais de 5 caracteres');
      return;
    }

    if (subtitulo.length <= 5) {
      Alert.alert('Erro', 'O subtítulo deve ter mais de 5 caracteres');
      return;
    }

    if (conteudo.length <= 20) {
      Alert.alert('Erro', 'O conteúdo deve ter mais de 20 caracteres');
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        titulo,
        subtitulo,
        conteudo,
        idProfessor: '1', // Temporariamente fixo
        idDisciplina,
        idSubdisciplina,
      });

      Alert.alert('Sucesso', 'Post criado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Novo Post</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={[styles.input, !isTituloValid && titulo.length > 0 && styles.inputError]}
          placeholder="Título"
          value={titulo}
          onChangeText={handleTituloChange}
          editable={!createPostMutation.isPending}
        />
        {!isTituloValid && titulo.length > 0 && (
          <Text style={styles.errorText}>O título deve ter mais de 5 caracteres</Text>
        )}
        
        <TextInput
          style={[styles.input, !isSubtituloValid && subtitulo.length > 0 && styles.inputError]}
          placeholder="Subtítulo"
          value={subtitulo}
          onChangeText={handleSubtituloChange}
          editable={!createPostMutation.isPending}
        />
        {!isSubtituloValid && subtitulo.length > 0 && (
          <Text style={styles.errorText}>O subtítulo deve ter mais de 5 caracteres</Text>
        )}

        <TextInput
          style={[styles.input, styles.contentInput, !isConteudoValid && conteudo.length > 0 && styles.inputError]}
          placeholder="Conteúdo"
          value={conteudo}
          onChangeText={handleConteudoChange}
          multiline
          textAlignVertical="top"
          editable={!createPostMutation.isPending}
        />
        {!isConteudoValid && conteudo.length > 0 && (
          <Text style={styles.errorText}>O conteúdo deve ter mais de 20 caracteres</Text>
        )}

        <TouchableOpacity
          style={[styles.button, createPostMutation.isPending && styles.buttonDisabled]}
          onPress={handleCreatePost}
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar Post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    zIndex: 1,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerTitleContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginBottom: 16,
    marginLeft: 4,
  },
  contentInput: {
    height: 200,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 