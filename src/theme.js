// Couleurs et configuration partagées par toute l'application
export const colors = {
  primary: '#1E6FE8',
  danger: '#E5383B',
  success: '#2DA44E',
  warning: '#F4A100',
  bg: '#F5F7FB',
  card: '#FFFFFF',
  text: '#1A1D23',
  muted: '#6B7280',
  border: '#E5E7EB',
};

export const PRIORITIES = {
  faible: { label: 'Faible', color: '#2DA44E', bg: '#E6F6EA' },
  moyenne: { label: 'Moyenne', color: '#D98E00', bg: '#FFF4D6' },
  elevee: { label: 'Élevée', color: '#E5383B', bg: '#FDE4E4' },
};

export const STATUSES = {
  a_faire: { label: 'À faire', color: '#1E6FE8', bg: '#E3EEFD' },
  terminee: { label: 'Terminée', color: '#2DA44E', bg: '#E6F6EA' },
};

export const formatDate = (iso) => {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};
