import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

export const configureAmplify = () => {
  Amplify.configure(awsExports);
};
export {};