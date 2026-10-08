import { BlockCheck } from '@global/helpers/block-check';
import { IUserDocument } from '@user/interfaces/user.interface';

describe('BlockCheck', () => {
  describe('isBlockedRelationship', () => {
    it('returns false when user is null or undefined', () => {
      expect(BlockCheck.isBlockedRelationship(null, 'otherId')).toBe(false);
      expect(BlockCheck.isBlockedRelationship(undefined, 'otherId')).toBe(false);
    });

    it('returns false when neither blocked nor blockedBy contains the other user', () => {
      const user = { blocked: [], blockedBy: [] } as unknown as IUserDocument;
      expect(BlockCheck.isBlockedRelationship(user, 'otherId')).toBe(false);
    });

    it('returns true when the user has blocked the other user', () => {
      const user = { blocked: ['otherId'], blockedBy: [] } as unknown as IUserDocument;
      expect(BlockCheck.isBlockedRelationship(user, 'otherId')).toBe(true);
    });

    it('returns true when the other user has blocked the current user', () => {
      const user = { blocked: [], blockedBy: ['otherId'] } as unknown as IUserDocument;
      expect(BlockCheck.isBlockedRelationship(user, 'otherId')).toBe(true);
    });

    it('returns false for an unrelated id present in neither list', () => {
      const user = { blocked: ['someoneElse'], blockedBy: ['anotherPerson'] } as unknown as IUserDocument;
      expect(BlockCheck.isBlockedRelationship(user, 'otherId')).toBe(false);
    });
  });
});
