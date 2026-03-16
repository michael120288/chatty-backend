async function main() {
  const submission = require('/sandbox/submission.js');
  if (typeof submission === 'function') {
    await submission();
  }
}

main().catch((err) => {
  console.error(err.message || String(err));
  process.exit(1);
});
