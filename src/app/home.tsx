import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Post } from '../types';

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const handleLogout = () => {
    signOut();
    router.replace('/welcome');
  };

  useEffect(() => {
    // Dados mockados
    const mockPosts = [
      {
        id: '1',
        title: 'Primeiro Post',
        content: 'Conteúdo do primeiro post',
        author: 'João Silva',
        date: '2024-03-10',
      },
      {
        id: '2',
        title: 'Segundo Post',
        content: 'Conteúdo do segundo post',
        author: 'Maria Santos',
        date: '2024-03-09',
      },
      {
        id: '3',
        title: 'Tecnologia na Educação',
        content: 'Como a tecnologia está transformando a sala de aula',
        author: 'Pedro Alves',
        date: '2024-03-08',
      },
    ];
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
  }, []);

  // Função para filtrar os posts
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.content.toLowerCase().includes(text.toLowerCase()) ||
      post.author.toLowerCase().includes(text.toLowerCase())
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
              // Aqui você implementaria a chamada real à API
              setPosts(posts.filter(post => post.id !== postId));
              setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
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
    router.push({
      pathname: '/edit-post/[id]',
      params: { id: postId }
    });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postText}>{item.content}</Text>
        <Text style={styles.postAuthor}>Por: {item.author}</Text>
        <Text style={styles.postDate}>{item.date}</Text>
      </View>
      
      {user?.role === 'administrativo' && (
        <View style={styles.postActions}>
          <TouchableOpacity 
            onPress={() => handleEditPost(item.id)}
            style={[styles.actionButton, styles.editButton]}
          >
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleDeletePost(item.id)}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Text style={styles.actionButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Bem-vindo, {user?.role === 'aluno' ? 'aluno' : user?.email} ({user?.role})
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
        <View style={styles.buttonContainer}>
          {user?.role === 'professor' && (
            <>
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
            </>
          )}
          {user?.role === 'administrativo' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.adminButton]}
              onPress={() => router.push('/teachers')}
            >
              <Text style={styles.actionButtonText}>Docentes</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum post encontrado</Text>
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
  listContainer: {
    padding: 15,
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 14,
    color: '#666',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  buttonContainer: {
    gap: 10,
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
});
