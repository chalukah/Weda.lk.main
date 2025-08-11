> git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
> husky - DEPRECATED

Please remove the following two lines from .husky/pre-commit:

#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

They WILL FAIL in v10.0.0

[33m[STARTED][39m Backing up original state...
[32m[COMPLETED][39m Backed up original state in git stash (245be7d)
[33m[STARTED][39m Running tasks for staged files...
[33m[STARTED][39m package.json — 6 files
[33m[STARTED][39m _.{js,jsx,ts,tsx} — 5 files
[33m[STARTED][39m _.{json,md,css} — 0 files
[33m[SKIPPED][39m \*.{json,md,css} — no files
[33m[STARTED][39m eslint --fix
[31m[FAILED][39m eslint --fix [FAILED]
[31m[FAILED][39m eslint --fix [FAILED]
[32m[COMPLETED][39m Running tasks for staged files...
[33m[STARTED][39m Applying modifications from tasks...
[33m[SKIPPED][39m Skipped because of errors from tasks.
[33m[STARTED][39m Reverting to original state because of errors...
[32m[COMPLETED][39m Reverting to original state because of errors...
[33m[STARTED][39m Cleaning up temporary files...
[32m[COMPLETED][39m Cleaning up temporary files...

✖ eslint --fix:

C:\Users\Chaluka Abeysinghe\Desktop\Weda.lk\src\app\page.tsx
7:5 error Parsing error: Unexpected token <

C:\Users\Chaluka Abeysinghe\Desktop\Weda.lk\src\components\Footer.tsx
40:5 error Parsing error: Unexpected token <

C:\Users\Chaluka Abeysinghe\Desktop\Weda.lk\src\components\Hero.tsx
80:5 error Parsing error: Unexpected token <

C:\Users\Chaluka Abeysinghe\Desktop\Weda.lk\src\components\Navbar.tsx
62:5 error Parsing error: Unexpected token <

C:\Users\Chaluka Abeysinghe\Desktop\Weda.lk\src\components\ServiceSearch.tsx
22:1 error Parsing error: The keyword 'interface' is reserved

✖ 5 problems (5 errors, 0 warnings)

husky - pre-commit script failed (code 1)
