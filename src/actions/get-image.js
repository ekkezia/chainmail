const STORAGE_URL = 'https://lmgbcuolwhkqoowxnaik.supabase.co/storage/v1/object/public/chainmail/ChainMail-ekezia';

export const getImage = async (imageNo) => {
  try {
    const data = fetch(`${STORAGE_URL}-${imageNo}.jpg`);
    const res = await data.json();
    console.log('image', res);
    return data;
  } catch (err) {
    console.log('error', err);
  }
}