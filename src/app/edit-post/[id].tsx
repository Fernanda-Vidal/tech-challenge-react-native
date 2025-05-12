import React, { useState, useEffect } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePost, useUpdatePost } from '../../hooks/usePost';
import { useAuth } from '../../contexts/AuthContext';

export default function EditPost() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const postId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  
  const { data: post, isLoading: isLoadingPost } = usePost(postId);
  const updatePostMutation = useUpdatePost(postId);

  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    if (post) {
      setTitulo(post.titulo);
      setSubtitulo(post.subtitulo);
      setConteudo(post.conteudo);
    }
  }, [post]);

  const handleUpdatePost = async () => {
    if (!titulo || !subtitulo || !conteudo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      await updatePostMutation.mutateAsync({
        titulo,
        subtitulo,
        conteudo,
        idProfessor: post?.id_professor || 1,
        idDisciplina: post?.id_disciplina || 1,
        idSubdisciplina: post?.id_subdisciplina || 1,
      });

      Alert.alert('Sucesso', 'Post atualizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o post. Tente novamente.');
    }
  };

  if (isLoadingPost) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Editar Post</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          editable={!updatePostMutation.isPending}
        />
        <TextInput
          style={styles.input}
          placeholder="Subtítulo"
          value={subtitulo}
          onChangeText={setSubtitulo}
          editable={!updatePostMutation.isPending}
        />
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Conteúdo"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          textAlignVertical="top"
          editable={!updatePostMutation.isPending}
        />

        <TouchableOpacity
          style={[styles.button, updatePostMutation.isPending && styles.buttonDisabled]}
          onPress={handleUpdatePost}
          disabled={updatePostMutation.isPending}
        >
          {updatePostMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar Alterações</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 16,
    fontSize: 16,
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