import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import type { Post } from '../types';
import { usePosts, useDeletePost } from '../hooks/usePost';

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { data: posts, isLoading, isError, refetch, isRefetching } = usePosts();
  const deletePostMutation = useDeletePost();
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log('User na home:', user);
    console.log('Role do usuário:', user?.role);
  }, [user]);

  const handleLogout = () => {
    signOut();
    router.replace('/welcome');
  };

  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
    }
  }, [posts]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (!posts) return;

    const filtered = posts.filter(post =>
      post.titulo.toLowerCase().includes(text.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(text.toLowerCase()) ||
      post.nome_professor.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleDeletePost = (postId: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este post?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePostMutation.mutateAsync(postId);
              Alert.alert('Sucesso', 'Post excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o post');
            }
          }
        }
      ]
    );
  };

  const handleEditPost = (postId: string) => {
    router.push(`/edit-post/${postId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar posts</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log('role na home',user?.role);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Bem-vindo, {user?.role === undefined ? 'aluno' : user?.email}
        </Text>
        <View style={styles.headerButtons}>
          {user?.role === 'professor' && (
            <TouchableOpacity 
              onPress={() => router.push({
                pathname: '/edit-profile'
              })} 
              style={styles.profileButton}
            >
              <Text style={styles.profileButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar posts..."
          value={searchText}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
        {user?.role === 'professor' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/create-post')}
            >
              <Text style={styles.actionButtonText}>+ Novo Post</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.registerTeacherButton]}
              onPress={() => router.push('/register-teacher')}
            >
              <Text style={styles.actionButtonText}>+ Cadastrar Professor</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.studentsButton]}
              onPress={() => router.push('/students')}
            >
              <Text style={styles.actionButtonText}>Alunos</Text>
            </TouchableOpacity>
          </View>
        )}
        {user?.role === 'administrativo' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.adminButton]}
              onPress={() => router.push('/teachers')}
            >
              <Text style={styles.actionButtonText}>Docentes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id_postagem.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => router.push(`/post/${item.id_postagem}`)}
          >
            <Text style={styles.postTitle}>{item.titulo}</Text>
            <Text style={styles.postSubtitle}>{item.subtitulo}</Text>
            <Text style={styles.postContent} numberOfLines={2}>
              {item.conteudo}
            </Text>
            <View style={styles.postMetadata}>
              <Text style={styles.postAuthor}>
                por {item.nome_professor}
              </Text>
              <Text style={styles.postDiscipline}>
                {item.nome_disciplina} • {item.nome_subdisciplina}
              </Text>
            </View>
            {user?.role === 'administrativo' && (
              <View style={styles.postActions}>
                <TouchableOpacity
                  onPress={() => handleEditPost(item.id_postagem.toString())}
                  style={[styles.actionButton, styles.editButton]}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeletePost(item.id_postagem.toString())}
                  style={[styles.actionButton, styles.deleteButton]}
                >
                  <Text style={styles.actionButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeText: {
    fontSize: 16,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#007AFF',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 15,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
    marginTop: 10,
    width: '100%'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  adminButton: {
    backgroundColor: '#28a745',
  },
  registerTeacherButton: {
    backgroundColor: '#6c757d',
  },
  studentsButton: {
    backgroundColor: '#17a2b8',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  profileButton: {
    // Removido o background e padding para parecer um text button
  },
  profileButtonText: {
    color: '#007AFF', // Cor azul padrão do iOS
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postActions: {
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  postMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  postDiscipline: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
