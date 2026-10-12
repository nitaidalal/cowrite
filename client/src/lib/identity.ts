export type Identity = {
  name: string;
  color: string;
};

const STORAGE_KEY = 'collab-identity';
const NAMES = ['Aarav', 'Ishita', 'Kabir', 'Meera', 'Rohan', 'Sana', 'Vihaan', 'Zoya'];
const COLOR_COUNT = 8;

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function getIdentity(): Identity {
  const saved = sessionStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      return JSON.parse(saved) as Identity;
    } catch {
      // corrupted value, fall through and create a new identity
    }
  }

  const identity: Identity = {
    name: `${NAMES[randomInt(NAMES.length)]} ${10 + randomInt(90)}`,
    color: `var(--cursor-${1 + randomInt(COLOR_COUNT)})`,
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
  return identity;
}
