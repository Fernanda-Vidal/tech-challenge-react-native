import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';

interface Teacher {
  id: string;
  name: string;
  email: string;
}

export default function Teachers() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: '1', name: 'João Silva', email: 'joao.silva@escola.com' },
    { id: '2', name: 'Maria Santos', email: 'maria.santos@escola.com' },
    { id: '3', name: 'Pedro Alves', email: 'pedro.alves@escola.com' },
    // ... mais professores para teste
    { id: '4', name: 'Ana Costa', email: 'ana.costa@escola.com' },
    { id: '5', name: 'Carlos Lima', email: 'carlos.lima@escola.com' },
    { id: '6', name: 'Paula Souza', email: 'paula.souza@escola.com' },
    { id: '7', name: 'Roberto Dias', email: 'roberto.dias@escola.com' },
    { id: '8', name: 'Lucia Ferreira', email: 'lucia.ferreira@escola.com' },
  ]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 5;

  const handleEdit = (teacher: Teacher) => {
    router.push(`/edit-teacher/${teacher.id}`);
  };

  const handleDelete = (teacher: Teacher) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o professor ${teacher.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Aqui você implementaria a lógica real de exclusão
            Alert.alert('Sucesso', 'Professor excluído com sucesso!');
          }
        }
      ]
    );
  };

  const loadMoreTeachers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aqui você faria a chamada real à API com paginação
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const hasMoreItems = endIndex < teachers.length;

      setHasMore(hasMoreItems);
      setPage(page + 1);
    } catch (error) {
      console.error('Erro ao carregar mais professores:', error);
      Alert.alert('Erro', 'Não foi possível carregar mais professores');
    } finally {
      setLoading(false);
    }
  };

  const renderTeacher = ({ item }: { item: Teacher }) => (
    <View style={styles.teacherCard}>
      <View style={styles.teacherInfo}>
        <Text style={styles.teacherName}>{item.name}</Text>
        <Text style={styles.teacherEmail}>{item.email}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando mais professores...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <Text style={styles.emptyText}>Nenhum professor cadastrado</Text>
  );

  const paginatedTeachers = teachers.slice(0, page * ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Docentes</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/register-teacher')}
      >
        <Text style={styles.addButtonText}>+ Cadastrar Professor</Text>
      </TouchableOpacity>

      <FlatList
        data={paginatedTeachers}
        renderItem={renderTeacher}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreTeachers}
        onEndReachedThreshold={0.2}
      />
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
    backgroundColor: '#fff',
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
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  teacherCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  teacherEmail: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
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
  loadingFooter: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
}); 