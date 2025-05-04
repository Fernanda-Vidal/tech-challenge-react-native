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

interface Student {
  id: string;
  name: string;
  email: string;
  registration: string;
}

export default function Students() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Ana Silva', email: 'ana.silva@email.com', registration: '2024001' },
    { id: '2', name: 'Bruno Santos', email: 'bruno.santos@email.com', registration: '2024002' },
    // Dados de exemplo
  ]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const handleEdit = (student: Student) => {
    router.push({
      pathname: '/edit-student/[id]',
      params: { id: student.id }
    });
  };

  const handleDelete = (student: Student) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o aluno ${student.name}?`,
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
            Alert.alert('Sucesso', 'Aluno excluído com sucesso!');
          }
        }
      ]
    );
  };

  const loadMoreStudents = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const hasMoreItems = endIndex < students.length;

      setHasMore(hasMoreItems);
      setPage(page + 1);
    } catch (error) {
      console.error('Erro ao carregar mais alunos:', error);
      Alert.alert('Erro', 'Não foi possível carregar mais alunos');
    } finally {
      setLoading(false);
    }
  };

  const renderStudent = ({ item }: { item: Student }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentDetails}>
          Matrícula: {item.registration}
        </Text>
        <Text style={styles.studentEmail}>{item.email}</Text>
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
        <Text style={styles.loadingText}>Carregando mais alunos...</Text>
      </View>
    );
  };

  const paginatedStudents = students.slice(0, page * ITEMS_PER_PAGE);

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
          <Text style={styles.headerTitle}>Alunos</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push({
          pathname: '/register-student'
        })}
      >
        <Text style={styles.addButtonText}>+ Cadastrar Aluno</Text>
      </TouchableOpacity>

      <FlatList
        data={paginatedStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum aluno cadastrado</Text>
        )}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreStudents}
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
    backgroundColor: '#17a2b8',
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
  studentCard: {
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
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  studentEmail: {
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