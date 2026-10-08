import { IUserDocument } from '@user/interfaces/user.interface';

export class BlockCheck {
  /**
   * Bidirectional block check: true if either party has blocked the other.
   * blocked/blockedBy are mirrored writes (block-user.service.ts updates both
   * sides), so reading only `user`'s own document is sufficient — no need to
   * fetch `otherUserId`'s document as well.
   */
  static isBlockedRelationship(user: IUserDocument | null | undefined, otherUserId: string): boolean {
    if (!user) {
      return false;
    }
    const blocked = (user.blocked as unknown as string[]) || [];
    const blockedBy = (user.blockedBy as unknown as string[]) || [];
    return blocked.includes(otherUserId) || blockedBy.includes(otherUserId);
  }
}
