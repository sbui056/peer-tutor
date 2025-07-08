import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { createUser } from '../graphql/mutations';
import { CreateUserInput } from '../API';

const client = generateClient();

export default function RoleSelection() {
  const handleRoleSelect = async (role: 'student' | 'tutor') => {
    try {
      const { userId, signInDetails } = await getCurrentUser();
      const email = signInDetails?.loginId;

      const input: CreateUserInput = {
        id: userId,
        email: email || '',
        role,
        createdAt: new Date().toISOString(),
      };

      await client.graphql({
        query: createUser,
        variables: { input },
      });

      window.location.reload();
    } catch (error) {
      console.error("Error saving user role:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Choose your role</h2>
      <button onClick={() => handleRoleSelect('student')}>I'm a Student</button>
      <button onClick={() => handleRoleSelect('tutor')}>I'm a Tutor</button>
    </div>
  );
}
