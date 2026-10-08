// One-off maintenance script — repairs "ghost" entries in the Redis 'post' ZSET.
//
// Background: post.cache.ts used to set a 24h TTL on each post's Redis hash
// (`posts:<id>`), independent of its permanent membership in the 'post' ZSET
// (removed only via ZREM in deletePostFromCache). Any post older than 24h that
// was never explicitly deleted became a ghost: still counted by pagination,
// but its hash had expired, so every field — including _id — came back
// undefined. That bug is now fixed (the TTL was removed), but posts created
// before the fix may already be ghosted. This script finds and repairs them:
//
//   - If the post still exists in MongoDB, rebuild its Redis hash so it
//     reappears correctly in the feed (self-heal — no data is lost).
//   - If the post does NOT exist in MongoDB either (truly deleted, orphaned
//     ZSET reference), remove it from the ZSET.
//
// Usage:
//   npm run cleanup:ghost-posts             # apply fixes
//   npm run cleanup:ghost-posts -- --dry-run  # report only, no writes
//
// Run: npx ts-node -r tsconfig-paths/register scripts/cleanup-ghost-posts.ts

import mongoose from 'mongoose';
import { config } from '@root/config';
import { PostModel } from '@post/models/post.schema';
import { createClient } from 'redis';
import { IPostDocument } from '@post/interfaces/post.interface';

const DRY_RUN = process.argv.includes('--dry-run');

async function main(): Promise<void> {
  const client = createClient({
    url: config.REDIS_HOST,
    ...(config.REDIS_PASSWORD ? { password: config.REDIS_PASSWORD } : {}),
  });
  client.on('error', (error) => console.error('Redis client error:', error));
  await client.connect();
  await mongoose.connect(`${config.DATABASE_URL}`);

  console.log(DRY_RUN ? 'Running in --dry-run mode — no changes will be made.\n' : 'Running with writes enabled.\n');

  const ids: string[] = await client.ZRANGE('post', 0, -1);
  console.log(`Scanning ${ids.length} entries in the 'post' ZSET...\n`);

  let healthy = 0;
  let repaired = 0;
  let removed = 0;

  for (const id of ids) {
    const hashKey = `posts:${id}`;
    const fieldCount = await client.HLEN(hashKey);
    if (fieldCount > 0) {
      healthy++;
      continue;
    }

    // Ghost detected — the ZSET references this id but its hash is gone.
    const post = await PostModel.findById(id).lean<IPostDocument>();

    if (post) {
      repaired++;
      console.log(`REPAIR  ${id} — still exists in MongoDB, rebuilding cache hash`);
      if (!DRY_RUN) {
        const dataToSave: Record<string, string> = {
          _id: `${post._id}`,
          userId: `${post.userId}`,
          username: `${post.username}`,
          avatarColor: `${post.avatarColor}`,
          profilePicture: `${post.profilePicture}`,
          post: `${post.post}`,
          bgColor: `${post.bgColor}`,
          feelings: `${post.feelings}`,
          privacy: `${post.privacy}`,
          gifUrl: `${post.gifUrl}`,
          commentsCount: `${post.commentsCount}`,
          reactions: JSON.stringify(post.reactions),
          imgVersion: `${post.imgVersion}`,
          imgId: `${post.imgId}`,
          videoId: `${post.videoId}`,
          videoVersion: `${post.videoVersion}`,
          createdAt: `${post.createdAt}`,
        };
        const multi = client.multi();
        for (const [field, value] of Object.entries(dataToSave)) {
          multi.HSET(hashKey, field, value);
        }
        await multi.exec();
      }
    } else {
      removed++;
      console.log(`REMOVE  ${id} — not found in MongoDB either, dropping orphaned ZSET entry`);
      if (!DRY_RUN) {
        await client.ZREM('post', id);
      }
    }
  }

  console.log('\nDone.');
  console.log(`  Healthy:  ${healthy}`);
  console.log(`  Repaired: ${repaired}`);
  console.log(`  Removed:  ${removed}`);
  if (DRY_RUN) {
    console.log('\nNo changes were made (--dry-run). Re-run without --dry-run to apply.');
  }

  await client.quit();
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
