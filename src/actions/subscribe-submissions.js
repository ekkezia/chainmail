import supabase from '../supabase/supabase';

//Subscribe to INSERT
export const subscribeSubmission = () => {
  supabase
  .channel('any')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chainmail' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe();
}