import { toast } from 'react-hot-toast';

export const customToast = (type: string, message: string) => {
  const color = type === 'success' ? 'green' : 'red';

  return toast(message, {
    duration: 5000,
    style: {
      padding: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: color,
    },
  });
};
