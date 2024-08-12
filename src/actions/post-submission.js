import supabase from '../supabase/supabase';

export const postSubmission = async (name) => {
  try {
    const { data } = await supabase.from('chainmail').insert({
      name: name
    }).select();

    // await setDoc(doc(db, "chainmail", `${now}`), data);

    console.log('done submitting', data)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
