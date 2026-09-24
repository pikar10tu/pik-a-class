import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getFavoriteIds,
  isFavorite,
  getFavoriteVocabItems,
  getVocabIdByWord,
  sortVocabWithFavoritesFirst,
  filterFavorites,
  toggleFavorite,
} from './vocab-favorites.js';
import { VOCAB_ITEMS } from './vocab-data.js';

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
    data,
  };
}

describe('vocab-favorites', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getFavoriteIds', () => {
    it('returns array from userDoc if present', () => {
      const userDoc = { favoriteVocab: ['v_a1_food_01', 'v_a1_food_02'] };
      const ids = getFavoriteIds(userDoc, 'user-123');
      expect(ids).toEqual(['v_a1_food_01', 'v_a1_food_02']);
    });

    it('falls back to localStorage if userDoc has no favoriteVocab', () => {
      const storage = fakeStorage({
        'pik_fav_vocab_user-456': JSON.stringify(['v_a1_food_03']),
      });
      const ids = getFavoriteIds({}, 'user-456', storage);
      expect(ids).toEqual(['v_a1_food_03']);
    });

    it('returns empty array when neither userDoc nor localStorage has data', () => {
      const storage = fakeStorage();
      const ids = getFavoriteIds(null, 'user-789', storage);
      expect(ids).toEqual([]);
    });

    it('deduplicates duplicate IDs', () => {
      const userDoc = { favoriteVocab: ['v_a1_food_01', 'v_a1_food_01', 'v_a1_food_02'] };
      const ids = getFavoriteIds(userDoc, 'u1');
      expect(ids).toEqual(['v_a1_food_01', 'v_a1_food_02']);
    });
  });

  describe('isFavorite', () => {
    it('returns true if ID is in list', () => {
      expect(isFavorite(['v1', 'v2'], 'v1')).toBe(true);
    });

    it('returns false if ID is not in list', () => {
      expect(isFavorite(['v1', 'v2'], 'v3')).toBe(false);
      expect(isFavorite([], 'v1')).toBe(false);
      expect(isFavorite(null, 'v1')).toBe(false);
    });
  });

  describe('getFavoriteVocabItems', () => {
    it('maps valid IDs to full VOCAB_ITEMS objects', () => {
      const sampleItem = VOCAB_ITEMS[0];
      const items = getFavoriteVocabItems([sampleItem.id]);
      expect(items.length).toBe(1);
      expect(items[0].word).toBe(sampleItem.word);
      expect(items[0].thai).toBe(sampleItem.thai);
    });

    it('ignores unknown IDs gracefully', () => {
      const items = getFavoriteVocabItems(['non_existent_id']);
      expect(items).toEqual([]);
    });
  });

  describe('getVocabIdByWord', () => {
    it('finds vocab id by case-insensitive word string', () => {
      const sample = VOCAB_ITEMS[0];
      const id = getVocabIdByWord(sample.word.toUpperCase());
      expect(id).toBe(sample.id);
    });

    it('returns null if word is not found', () => {
      expect(getVocabIdByWord('not_a_real_word_xyz')).toBeNull();
    });
  });

  describe('sortVocabWithFavoritesFirst', () => {
    it('places favorited items at the top while preserving relative ordering', () => {
      const item1 = { id: 'w1', word: 'apple' };
      const item2 = { id: 'w2', word: 'banana' };
      const item3 = { id: 'w3', word: 'cherry' };
      const list = [item1, item2, item3];

      const sorted = sortVocabWithFavoritesFirst(list, ['w2']);
      expect(sorted).toEqual([item2, item1, item3]);
    });

    it('returns original list if no favorites match', () => {
      const list = [{ id: 'w1' }, { id: 'w2' }];
      expect(sortVocabWithFavoritesFirst(list, [])).toEqual(list);
      expect(sortVocabWithFavoritesFirst(list, ['w99'])).toEqual(list);
    });
  });

  describe('filterFavorites', () => {
    it('filters list to only favorited items', () => {
      const list = [
        { id: 'w1', word: 'apple', thai: 'แอปเปิ้ล', level: 'A1', example: 'Eat apple' },
        { id: 'w2', word: 'banana', thai: 'กล้วย', level: 'A1', example: 'Yellow banana' },
        { id: 'w3', word: 'durian', thai: 'ทุเรียน', level: 'B1', example: 'King fruit' },
      ];

      const filtered = filterFavorites(list, ['w1', 'w3']);
      expect(filtered.map((w) => w.id)).toEqual(['w1', 'w3']);
    });

    it('applies level and search filters on favorites', () => {
      const list = [
        { id: 'w1', word: 'apple', thai: 'แอปเปิ้ล', level: 'A1', example: 'Eat apple' },
        { id: 'w2', word: 'avocado', thai: 'อะโวคาโด', level: 'A2', example: 'Healthy fat' },
        { id: 'w3', word: 'banana', thai: 'กล้วย', level: 'A1', example: 'Yellow banana' },
      ];

      const resLevel = filterFavorites(list, ['w1', 'w2', 'w3'], { level: 'A1' });
      expect(resLevel.map((w) => w.id)).toEqual(['w1', 'w3']);

      const resSearch = filterFavorites(list, ['w1', 'w2', 'w3'], { search: 'โวค' }); // search thai partial
      expect(resSearch.map((w) => w.id)).toEqual(['w2']);
    });
  });

  describe('toggleFavorite', () => {
    it('adds item if not present and updates localStorage', async () => {
      const mockDb = null;
      const uid = 'test-user-1';
      const initialFavs = ['w1'];
      const storage = fakeStorage();

      const result = await toggleFavorite(mockDb, uid, 'w2', initialFavs, { storage });
      expect(result).toEqual(['w1', 'w2']);

      const cached = JSON.parse(storage.getItem(`pik_fav_vocab_${uid}`));
      expect(cached).toEqual(['w1', 'w2']);
    });

    it('removes item if already present', async () => {
      const mockDb = null;
      const uid = 'test-user-2';
      const initialFavs = ['w1', 'w2'];
      const storage = fakeStorage();

      const result = await toggleFavorite(mockDb, uid, 'w1', initialFavs, { storage });
      expect(result).toEqual(['w2']);

      const cached = JSON.parse(storage.getItem(`pik_fav_vocab_${uid}`));
      expect(cached).toEqual(['w2']);
    });
  });
});
