# Git Commit Guide for VS Code

## Quick Fix for IDE Commits

The project uses commit message conventions and pre-commit hooks. Here's how to commit from VS Code:

### ✅ **Commit Message Format**

Use one of these prefixes in your commit messages:

- `feat: ` - New features
- `fix: ` - Bug fixes
- `update: ` - Updates to existing features
- `add: ` - Adding files/components
- `chore: ` - Maintenance tasks
- `docs: ` - Documentation
- `style: ` - Code formatting
- `refactor: ` - Code restructuring

### ✅ **Examples of Good Commit Messages:**

```
feat: add user profile dropdown with logout
fix: resolve navbar authentication state
update: improve login flow styling
add: dropdown menu component
chore: update dependencies
```

### ✅ **VS Code Commit Steps:**

1. Stage your changes in the Source Control panel
2. Write commit message using the format above
3. Click "Commit" button
4. If pre-commit hooks fail, they'll auto-fix formatting
5. Just commit again after the auto-fixes

### 🚨 **If Commit Still Fails:**

The hooks have been configured to be more permissive. Most warnings won't block commits now.

### 💡 **Alternative: Command Line**

If IDE commits still have issues, use terminal:

```bash
git add .
git commit -m "feat: your commit message here"
git push
```

---

_This configuration allows up to 50 ESLint warnings and treats commit format issues as warnings rather than errors._
