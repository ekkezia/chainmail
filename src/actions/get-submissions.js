import supabase from '../supabase/supabase';

export const getSubmission = async () => {
  try {
    // const docs = await getDocs(collection(db, "chainmail"));
    const { data } = await supabase.from('chainmail').select();
    return data;
  } catch (err) {
    console.log('error', err);
  }
}