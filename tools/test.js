const { exec } = require('node:child_process');
const { log } = require('node:console');

const NOCHANGE_PREFIX = 'no-change-for-';

exec('git branch --show-current', (err, branch) => {
    if (err) {
        console.error(`exec error while retrieving branch name: ${err}`);
        process.exit(-1);
    }
    branch = branch.trim();

    exec('git diff origin/HEAD --name-status --diff-filter=d', (err, status) => {
        if (err) {
            console.error(`exec error while retrieving commit files list: ${err}`);
            process.exit(-1);
        }

        console.log(status);

        const files = status.trim().split('\n').map(s => s.substring(s.lastIndexOf('\t') + 1));
        if (files.filter(name => name === NOCHANGE_PREFIX + branch || /^\.changeset\/[-\w]+\.md$/.test(name)).length === 0) {
            process.exit(-1);
        }
    });
}); 