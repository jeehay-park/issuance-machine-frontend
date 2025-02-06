import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist(); // Creates a shared persistence effect

export default persistAtom;
