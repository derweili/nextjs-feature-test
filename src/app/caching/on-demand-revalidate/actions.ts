'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function revalidateByTag(tag: string) {
  try {
    revalidateTag(tag, 'max');
    return { success: true, message: `Successfully revalidated tag: ${tag}` };
  } catch (error) {
    return { 
      success: false, 
      message: `Failed to revalidate tag: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

export async function revalidateByPath(path: string) {
  try {
    revalidatePath(path);
    return { success: true, message: `Successfully revalidated path: ${path}` };
  } catch (error) {
    return { 
      success: false, 
      message: `Failed to revalidate path: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

