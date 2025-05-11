import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'welcome',
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack>
          <Stack.Screen 
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="welcome"
            options={{ 
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen 
            name="login" 
            options={{ 
              headerShown: false,
              gestureEnabled: false 
            }} 
          />
          <Stack.Screen 
            name="home" 
            options={{ 
              headerShown: false,
              gestureEnabled: false 
            }} 
          />
          <Stack.Screen 
            name="post/[id]"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="create-post"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="edit-post/[id]"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="register-teacher"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="teachers"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="edit-teacher/[id]"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="students"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="edit-student/[id]"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="register-student"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
          <Stack.Screen 
            name="edit-profile"
            options={{ 
              headerShown: false,
              gestureEnabled: true
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
