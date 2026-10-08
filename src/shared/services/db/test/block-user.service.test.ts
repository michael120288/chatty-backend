import { blockUserService } from '@service/db/block-user.service';
import { UserModel } from '@user/models/user.schema';

jest.mock('@user/models/user.schema');
jest.mock('@service/queues/base.queue');

const userId1 = '507f1f77bcf86cd799439011';
const userId2 = '507f1f77bcf86cd799439012';

describe('BlockUserService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('blockUser', () => {
    it('calls UserModel.bulkWrite with $push operations for blocked and blockedBy', async () => {
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      await blockUserService.blockUser(userId1, userId2);
      expect(UserModel.bulkWrite).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            updateOne: expect.objectContaining({
              update: expect.objectContaining({ $push: expect.anything() })
            })
          })
        ])
      );
    });

    it('passes $push to blocked and blockedBy fields', async () => {
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      await blockUserService.blockUser(userId1, userId2);
      const ops = (UserModel.bulkWrite as jest.Mock).mock.calls[0][0];
      expect(ops[0].updateOne.update.$push.blocked).toBeDefined();
      expect(ops[1].updateOne.update.$push.blockedBy).toBeDefined();
    });
  });

  describe('unblockUser', () => {
    it('calls UserModel.bulkWrite with $pull operations for blocked and blockedBy', async () => {
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      await blockUserService.unblockUser(userId1, userId2);
      expect(UserModel.bulkWrite).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            updateOne: expect.objectContaining({
              update: expect.objectContaining({ $pull: expect.anything() })
            })
          })
        ])
      );
    });

    it('passes $pull to blocked and blockedBy fields', async () => {
      (UserModel.bulkWrite as jest.Mock).mockResolvedValue({});
      await blockUserService.unblockUser(userId1, userId2);
      const ops = (UserModel.bulkWrite as jest.Mock).mock.calls[0][0];
      expect(ops[0].updateOne.update.$pull.blocked).toBeDefined();
      expect(ops[1].updateOne.update.$pull.blockedBy).toBeDefined();
    });
  });
});
