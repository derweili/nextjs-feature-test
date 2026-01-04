'use server';

export async function submitForm(
  prevState: { text: string; timestamp: string; error: string | null } | null,
  formData: FormData
) {
  const text = formData.get('text') as string;
  
  if (!text || text.trim() === '') {
    return { text: '', timestamp: '', error: 'Please enter some text' };
  }
  
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const timestamp = new Date().toISOString();
  
  return {
    text: text.trim(),
    timestamp,
    error: null,
  };
}

